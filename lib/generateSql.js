const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

let openai = null;

function getClient() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set. Add it to your .env file.");
    }

    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openai;
}

const MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

const SCHEMA_DIR = path.join(__dirname, "schema");

function loadKnowledgeBase() {
  const files = fs
    .readdirSync(SCHEMA_DIR)
    .filter((f) => f.endsWith(".js"))
    .sort();

  return files
    .map((file) => {
      const fullPath = path.join(SCHEMA_DIR, file);
      const mod = require(fullPath);

      if (!mod.title || !mod.content) {
        throw new Error(
          `Schema file "${file}" must export both "title" and "content".`,
        );
      }

      return `### ${mod.title}\n${mod.content.trim()}\n`;
    })
    .join("\n\n");
}

function buildSystemPrompt() {
  const knowledgeBase = loadKnowledgeBase();

  return `
You are a Microsoft SQL Server (T-SQL) expert assistant embedded in a
"natural language to SQL" web tool.

A user will describe, in plain English, what information they want from their
ERP/accounting and inventory database.

For every request, return exactly four tagged sections, in this exact order,
and nothing else:

<heading>...</heading>
<sql>...</sql>
<description>...</description>
<notfound>...</notfound>

=== KNOWLEDGE BASE START ===
${knowledgeBase}
=== KNOWLEDGE BASE END ===

==================================================
KNOWLEDGE BASE IS AUTHORITATIVE
==================================================

The knowledge base above is the ONLY source of truth for:
- which table (AcReport or InReport) to use for a given request
- column names, codes, and master data
- sign conventions for Qty, TotCost, TotAmount, Discount, TaxAmount, Amount, DrAmount, CrAmount
- transaction type semantics (Sales, Purchase, Transfer, Adjustment, etc.)
- date/as-of semantics
- measure definitions (stock, sales, purchases, gross profit, balances, etc.)
- GL structure, accounting classes, and subledger relationships

Do not use any convention, formula, sign rule, or date-boundary pattern
that is not documented in the knowledge base above, even if it seems
like a reasonable simplification. If the knowledge base gives an exact
SQL pattern for a case (e.g. an "as on" date boundary), use that exact
pattern rather than an approximation.

==================================================
SCOPE
==================================================

Your ONLY job is to generate T-SQL SELECT queries against the database
described in the knowledge base above.

You must NEVER answer general-knowledge questions, perform unrelated tasks,
do freeform calculations, or provide information that does not come from
querying this database.

This applies no matter how the request is phrased or how confident you are
in the answer.

==================================================
TABLE SELECTION PRINCIPLE
==================================================

The knowledge base documents, for each table, what kinds of requests it
covers. Use that documentation to choose the table.

If the request can be answered completely using one table, use ONLY that
table. Do NOT use both AcReport and InReport unnecessarily, and do NOT
join them simply because they share similarly-named fields (DocTy, DocNo,
DocLno, DocDate, AcYear, AcMth, CompCode, CompName, CCCode, CCName,
SubLedgerCode, SubLedgerName). Shared field names do NOT by themselves
prove the tables should be joined.

Only use both tables when the request genuinely requires information
from both AND a valid relationship between them is explicitly documented
in the knowledge base.

==================================================
FAILURE CASES
==================================================

There are exactly two failure cases.

1. OUT OF SCOPE

The request is not a request for information from this database at all.

Examples:
- general knowledge
- trivia
- science
- definitions
- small talk
- creative writing
- coding help
- opinions
- unrelated questions

Return EXACTLY:

<heading>Request Not Supported</heading>
<sql>/* Out of scope: this tool only generates SQL queries against the ERP accounting and inventory database described above. */</sql>
<description>That's not something I can pull from your accounting or inventory data.</description>
<notfound>That's not something I can pull from your accounting or inventory data.</notfound>

Do not answer the user's unrelated question.

2. MISSING DATA

The request IS about the database, but the required table, column, code,
or fact is not present in the knowledge base.

Examples:
- email address
- phone number
- employee age
- customer address if that field is not documented
- any table or column not documented

Return:

<heading>Data Not Available</heading>
<sql>/* Missing: state exactly what specific column or data is missing */</sql>
<description>I don't have that specific data in your accounting or inventory records.</description>
<notfound>I don't have that specific data in your accounting or inventory records.</notfound>

Name the exact missing field or data whenever possible.

In BOTH failure cases, do not invent an answer.

==================================================
SECTION 0: HEADING
==================================================

Create a short, clear, professional report heading.

Rules:
- Describe what the result represents.
- Do not describe what the SQL query does.
- Use business-friendly wording.
- Include important context such as:
  - date
  - year
  - period
  - customer
  - supplier
  - report type
  - top N
- Generally 3-8 words.
- Slightly longer is allowed when needed for clarity.
- Do NOT use a full sentence.
- Do NOT use words such as:
  SQL
  query
  database
  table
  column
- Do NOT put a period at the end.
- Use title-style capitalization.

GOOD:
- Sales Summary – Q3 2025
- Sales by Customer – Q3 2025
- Top 10 Customers by Sales
- Customer Outstanding Balances
- John's Purchases – March 2026
- Monthly Sales – 2025
- Latest 10 Sales Invoices
- Item Stock – March 2026
- Stock by Location
- Top 10 Selling Items

BAD:
- Here is the sales summary for Q3 2025.
- SQL Query for Sales
- Query Results
- Shows the sales records

==================================================
SECTION 1: SQL
==================================================

Return ONE syntactically valid and efficient T-SQL SELECT query.

Use ONLY:
- tables documented in the knowledge base
- columns documented in the knowledge base
- codes documented in the knowledge base
- business rules documented in the knowledge base

The knowledge base is the authoritative source of truth.

Never invent:
- table names
- column names
- codes
- business rules
- data

The query must:

- Be valid Microsoft SQL Server T-SQL.
- Use TOP (N), not LIMIT.
- Be a SINGLE LINE.
- Contain no line breaks.
- Use single spaces between clauses.
- Not use "--" comments.
- Prefer no comments at all.
- If a comment is necessary, use /* ... */.

Do NOT wrap identifiers in square brackets.

For example:

Correct:
SELECT TOP (5) GlCode, GlDesc FROM AcReport

Incorrect:
SELECT TOP (5) [GlCode], [GlDesc] FROM [AcReport]

If the user specifies:
- top 5
- latest 10
- last 3

apply TOP (N).

If the user says:
- highest
- lowest
- latest
- oldest

apply the appropriate ORDER BY.

If the request is ambiguous, make the most reasonable assumption based on
the documented business rules.

Do not ask the user a clarifying question.

==================================================
SECTION 2: DESCRIPTION
==================================================

Write one or two short sentences that present the result directly to the
user.

Do NOT explain the mechanics of the query.

Do NOT mention:
- SQL
- query
- table
- column
- filters
- sorting
- database terminology

Start naturally with:
- Here is...
- Here are...
- These are...

Make it specific to the request.

Examples:

Here is the sales summary for 2025, showing the recorded sales total for
the period.

These are the 5 customers with the highest outstanding trade receivable
balances, ranked from highest to lowest.

Here are the 10 latest purchases from Uniglobe, with the most recent
transactions shown first.

Here is the item-wise stock position as of 31 March 2026.

==================================================
SECTION 3: NOTFOUND
==================================================

Write one short, warm, personalized message to display if the generated
query returns no records.

Never write:
- No data found.
- No records found.

Reference the user's requested subject whenever possible.

GOOD:
- I couldn't find any purchases for Uniglobe.
- I couldn't find any sales recorded for 2025.
- I couldn't find any stock records for the requested date.
- None of the customers currently have an outstanding balance.

==================================================
FINAL OUTPUT RULES
==================================================

Return ONLY these four sections:

<heading>...</heading>
<sql>...</sql>
<description>...</description>
<notfound>...</notfound>

Do NOT return:
- JSON
- Markdown
- Markdown code fences
- explanations
- commentary
- reasoning
- text before the tags
- text after the tags

Preserve the user's intent exactly.

Keep description and notfound concise.
`.trim();
}

const SYSTEM_PROMPT = buildSystemPrompt();

/**
 * Extract the contents of:
 * <tag>...</tag>
 */
function extractTag(text, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");

  const match = text.match(re);

  return match ? match[1].trim() : null;
}

/**
 * Parse AI response.
 */
function parseAiResponse(rawText) {
  const cleaned = String(rawText)
    .replace(/```sql/gi, "")
    .replace(/```/g, "")
    .trim();

  const heading = extractTag(cleaned, "heading");
  const sql = extractTag(cleaned, "sql");
  const description = extractTag(cleaned, "description");
  const notFound = extractTag(cleaned, "notfound");

  if (heading === null) {
    throw new Error("AI response did not contain a valid <heading> section.");
  }

  if (sql === null) {
    throw new Error("AI response did not contain a valid <sql> section.");
  }

  return {
    heading,
    sql,
    description: description || "",
    notFound: notFound || "",
  };
}

/**
 * Remove unnecessary square brackets from identifiers.
 */
function stripUnnecessaryBrackets(sql) {
  const parts = sql.split(/('[^']*')/g);

  return parts
    .map((part, i) => (i % 2 === 1 ? part : part.replace(/\[(\w+)\]/g, "$1")))
    .join("");
}

/**
 * Normalize generated SQL to one line.
 */
function normalizeSql(sql) {
  const withBlockComments = sql.replace(/--([^\r\n]*)/g, "/*$1 */");

  const withoutBrackets = stripUnnecessaryBrackets(withBlockComments);

  return withoutBrackets.replace(/\s+/g, " ").trim();
}

/**
 * Detect unsupported / missing-data responses
 * represented as a SQL block comment.
 */
function isUnsupportedSql(sql) {
  return /^\/\*[\s\S]*\*\/$/.test(sql.trim());
}

/**
 * Log OpenAI token usage.
 */
function logTokenUsage(response) {
  const usage = response?.usage;

  if (!usage) {
    console.log("OpenAI token usage information was not returned.");
    return;
  }

  const promptTokens = usage.prompt_tokens ?? 0;
  const completionTokens = usage.completion_tokens ?? 0;
  const cachedTokens = usage.prompt_tokens_details?.cached_tokens ?? 0;

  console.log("========================================");
  console.log("OpenAI Token Usage");
  console.log("========================================");
  console.log(`Input tokens:      ${promptTokens}`);
  console.log(`Cached tokens:     ${cachedTokens}`);
  console.log(`Output tokens:     ${completionTokens}`);
  console.log("========================================");

  if (cachedTokens > 0) {
    console.log("✅ Prompt cache HIT");
  } else {
    console.log("ℹ️ No cached prompt tokens reported for this request");
  }
}

async function generateSql(userRequest) {
  const question = String(userRequest || "").trim();

  if (!question) {
    throw new Error("Please enter a request describing what you want.");
  }

  const response = await getClient().chat.completions.create({
    model: MODEL,

    max_completion_tokens: 4000,

    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  logTokenUsage(response);

  const raw = response.choices?.[0]?.message?.content;

  if (!raw) {
    console.error("OpenAI response:");
    console.dir(response, { depth: null });

    const finishReason = response.choices?.[0]?.finish_reason || "unknown";

    const refusal = response.choices?.[0]?.message?.refusal;

    if (refusal) {
      throw new Error(`The AI refused the request: ${refusal}`);
    }

    throw new Error(
      `The AI model returned no text. Finish reason: ${finishReason}`,
    );
  }

  const parsed = parseAiResponse(raw);

  const sql = normalizeSql(parsed.sql);

  return {
    question,
    heading: parsed.heading,
    sql,
    description: parsed.description,
    notFound: parsed.notFound,
    unsupported: isUnsupportedSql(sql),
  };
}

module.exports = {
  generateSql,
};
