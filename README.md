# SQL Query Generator (Natural Language → SQL)

Turns a plain-English request into a T-SQL query for your `AcReport`
accounts schema, using the same visual design as the previous cheque
reader project.

## How it works

1. **Input page** (`/`) — user types a request in a textarea, e.g.
   *"Trial balance as on 31/03/2026"*.
2. **Processing** — the request is sent to OpenAI together with a
   "knowledge base" describing your table structure, GL chart of
   accounts, document-type reference data, and business rules.
3. **Result page** — the generated SQL is shown in a copy/download-able
   code block, with a link back to ask another question.

## Setup

```bash
npm install
cp .env.example .env
# edit .env and add your OPENAI_API_KEY (and optionally OPENAI_MODEL)
npm start
```

Then open http://localhost:3000

## API

`POST /api/generate-sql` with JSON body `{ "question": "..." }` returns
`{ "question": "...", "sql": "..." }`.

## Adding more tables / schema later

All of the database knowledge lives in `lib/schema/`. Each file exports
`{ title, content }` and is automatically loaded and concatenated into
the prompt sent to the AI — in filename order (hence the `01-`, `02-`,
`03-` prefixes).

To teach the assistant about a new table, view, business rule, or
reference dataset:

1. Add a new file, e.g. `lib/schema/04-my-new-table.js`.
2. Export `{ title: "...", content: "CREATE TABLE ... plus any notes" }`.
3. Restart the server. No other code changes are needed.

Keep each module focused (one table or one reference dataset per file)
so the knowledge base stays easy to maintain as your schema grows.

## Files

- `server.js` — Express routes (input page, generate, result page, API)
- `lib/generateSql.js` — builds the prompt from `lib/schema/*` and calls OpenAI
- `lib/schema/` — the schema/business-rule knowledge base (extensible)
- `views/index.ejs` — input page
- `views/result.ejs` — result page with the generated SQL
- `public/style.css` — shared visual style (same palette/typography as the cheque reader)
