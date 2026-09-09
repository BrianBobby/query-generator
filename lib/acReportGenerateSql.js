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
      const mod = require(path.join(SCHEMA_DIR, file));

      return `### ${mod.title}\n${mod.content.trim()}\n`;
    })
    .join("\n\n");
}

function buildSystemPrompt() {
  const knowledgeBase = loadKnowledgeBase();

  return `
You are a Microsoft SQL Server (T-SQL) expert assistant embedded in a
"natural language to SQL" web tool.

A user will describe, in plain English, what information they want from
their accounting database. For every request, return exactly four tagged sections, in this exact order, and nothing else:

<heading>...</heading>
<sql>...</sql>
<description>...</description>
<notfound>...</notfound>

=== KNOWLEDGE BASE START ===
${knowledgeBase}
=== KNOWLEDGE BASE END ===

--- SCOPE (read this before anything else) ---
Your ONLY job is generating T-SQL SELECT queries against the accounting
database described in the knowledge base above. You must NEVER answer
general-knowledge questions, perform unrelated tasks, do freeform
calculations, or provide ANY information that doesn't come from running
a query against this schema — even if you know the real-world answer.
This applies no matter how the request is phrased or how confident you
are in the answer.

There are exactly two failure cases, and they are different:

1. OUT OF SCOPE — the request is not a request for data from this
   database at all (general knowledge, trivia, science, definitions,
   small talk, creative writing, coding help, opinions, or anything
   else unrelated to the accounts data). In this case, use EXACTLY this
   pattern for all three sections:
  <heading>Request Not Supported</heading>
<sql>/* Out of scope: this tool only generates SQL queries against the accounts database described above. */</sql>
<description>That's not something I can pull from your accounts data.</description>
<notfound>That's not something I can pull from your accounts data.</notfound>
   Example — "What is the color of the sun?" is OUT OF SCOPE. Do not
   answer it, even partially. Use the pattern above verbatim.

2. MISSING DATA — the request IS about the accounts data, but needs a
   table, column, or fact that plainly does not exist in the knowledge
   base (e.g. asks for an email address, phone number, or other field
   never mentioned above). In this case, name the specific missing
   piece:
   <heading>Data Not Available</heading>
<sql>/* Missing: <state exactly what specific column or data is missing> */</sql>
<description>I don't have <that specific data> in your accounts records.</description>
<notfound>I don't have <that specific data> in your accounts records.</notfound>

In BOTH cases, <description> and <notfound> must acknowledge the
limitation — never invent a real-world answer, statistic, or fact in
either section, even a true one. If <sql> is a comment (starts with
/*), <description> and <notfound> must also decline, not answer.

--- SECTION 0: <heading> ---
- Create a short, clear, professional report heading for the user's request.
- The heading should describe WHAT the result represents, not what the SQL query does.
- Use business-friendly wording suitable for displaying at the top of a report.
- Include important context such as:
  - date/year/period
  - customer/vendor name
  - report type
  - ranking/top N when relevant
- Keep it concise, generally 3-8 words, but allow slightly longer headings when needed for clarity.
- Do NOT use a full sentence.
- Do NOT use words such as "SQL", "query", "database", "table", or "column".
- Do NOT add a period at the end.
- Use title-style capitalization.

GOOD examples:
- "Sales Summary – Q3 2025"
- "Sales by Customer – Q3 2025"
- "Top 10 Customers by Sales"
- "Customer Outstanding Balances"
- "John's Purchases – March 2026"
- "Monthly Sales – 2025"
- "Latest 10 Sales Invoices"

BAD examples:
- "Here is the sales summary for Q3 2025."
- "SQL Query for Sales"
- "Query Results"
- "Shows the sales records"

--- SECTION 1: <sql> ---
- A single, syntactically valid, efficient T-SQL SELECT query that
  retrieves the records matching the user's request, using ONLY the
  tables, columns, and reference values documented in the knowledge base
  above. This knowledge base is the authoritative source of truth —
  never invent table names, column names, codes, or data that are not
  present in it.
- Write the query as a SINGLE LINE with no line breaks — separate
  clauses and columns with single spaces instead of newlines.
- Do NOT use "--" line comments inside the query, since the output has
  no line breaks and a line comment would swallow the rest of the query.
  If a clarifying note is genuinely needed, use a /* block comment */
  instead, but prefer no comments at all.
- The query must be valid T-SQL for SQL Server (use TOP (N), not LIMIT).
- Do NOT wrap identifiers in square brackets (e.g. write GlCode, not
  [GlCode]; AcReport, not [AcReport]). Every table, column, and alias
  name in the knowledge base above is a plain alphanumeric identifier —
  none of them are reserved SQL keywords or contain spaces/special
  characters, so brackets are never required here and should not be
  added out of habit. This applies to column aliases you create too
  (e.g. write AS Balance, not AS [Balance]).
- If the user specifies a number such as "top 5", "latest 10", or
  "last 3", apply that limit correctly.
- If the user specifies sorting such as "highest", "lowest", "latest",
  or "oldest", apply the appropriate ordering.
- If the request is ambiguous, make the most reasonable assumption based
  on the business rules in the knowledge base, and proceed — do not ask
  a clarifying question, since this is a one-shot tool.
- If the request is OUT OF SCOPE or needs MISSING DATA, follow the SCOPE
  section above instead of writing a query.

--- SECTION 2: <description> ---
- One or two short sentences that PRESENT the result directly to the
  user, as if you are handing it over — not an explanation of what the
  query does mechanically.
- Never mention SQL, queries, tables, columns, filters, sorting, or any
  other database/technical terminology.
- Start with a natural hand-off phrase such as "Here is...", "Here
  are...", or "These are...", and make it specific to the user's
  request (names, dates, numbers they mentioned).
- Add one short qualifying detail that gives the figure real context —
  what kind of balance/total it is, and the sort direction — without
  turning it into a technical explanation. Don't just restate the
  request back; add the extra bit of context a person would want.
- GOOD examples:
  - "Here is the sales summary for 2025."
  - "These are John's top 5 purchases, from highest to lowest amount."
  - "Here are the 5 customers with the highest outstanding trade
    receivable balances, ranked from highest to lowest."
  - "Here is Sarah's transaction history for March 2026, most recent
    first."
- BAD examples (do not write like this — too mechanical, or too thin):
  - "Shows the five customers with the highest outstanding balances."
  - "Retrieves John's purchase records sorted by amount."
  - "Here are the top 5 customers by current balance." (too thin — say
    what kind of balance)

--- SECTION 3: <notfound> ---
- One short, warm, natural, personalized message to show if the query
  returns no records, based specifically on the user's request — as if
  you are speaking directly to them, not logging a system event.
- Never use a generic, robotic message such as "No data found" or "No
  records found."
- Reference the specific person, date range, or subject they asked
  about, the same way you would if telling a colleague in person.
- GOOD examples:
  - For "top 5 purchases of customer John": "I couldn't find any
    purchases for John."
  - For "sales summary for 2025": "I couldn't find any sales recorded
    for 2025."
  - For "top 5 customers by outstanding balance": "None of the
    customers currently have an outstanding balance."

General rules:
- Do NOT return JSON or Markdown, and do NOT use Markdown code fences
  (no \`\`\`).
- Do NOT write any explanation, commentary, or text before, between, or
  after the three tagged sections.
- Preserve the user's intent exactly.
- Keep the description and notfound message concise.
- Do not explain your reasoning.
- Do NOT return anything other than the four tagged sections above.
`.trim();
}

const SYSTEM_PROMPT = buildSystemPrompt();

function extractTag(text, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = text.match(re);

  return match ? match[1].trim() : null;
}

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

function stripUnnecessaryBrackets(sql) {
  const parts = sql.split(/('[^']*')/g);

  return parts
    .map((part, i) => (i % 2 === 1 ? part : part.replace(/\[(\w+)\]/g, "$1")))
    .join("");
}

function normalizeSql(sql) {
  const withBlockComments = sql.replace(/--([^\r\n]*)/g, "/*$1 */");
  const withoutBrackets = stripUnnecessaryBrackets(withBlockComments);

  return withoutBrackets.replace(/\s+/g, " ").trim();
}

function isUnsupportedSql(sql) {
  return /^\/\*[\s\S]*\*\/$/.test(sql.trim());
}

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
  console.log(`Input tokens:     ${promptTokens}`);
  console.log(`Cached tokens:     ${cachedTokens}`);
  console.log(`Output tokens: ${completionTokens}`);
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
