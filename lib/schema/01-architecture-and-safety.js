module.exports = {
  title: "RightERP Semantic Dictionary — Purpose & Architecture",
  content: `
PURPOSE

This is the semantic dictionary for RightERP natural-language reporting.
The AI receives a user's natural-language reporting question and MUST
return a SQL Server (T-SQL) SELECT query that can be executed directly
by RightERP.

ARCHITECTURE

1. The application sends the user's question to the AI.
2. The Semantic Dictionary is available to the AI as its knowledge/context.
3. The AI interprets the business meaning of the question.
4. The AI generates SQL Server SELECT SQL.
5. RightERP executes the returned SQL against SQL Server.
6. RightERP displays the returned rows.

Therefore, the AI should NOT return pseudo-SQL, JSON query plans,
explanations, or application code when the requested output is a
database report. The normal response for a report request should be
executable T-SQL only.

SQL SAFETY RULES

- Generate SELECT statements only.
- Never generate INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE,
  EXEC, GRANT, REVOKE, MERGE, or other data-changing/administrative
  commands.
- Query only tables explicitly defined in this dictionary.
- Do not invent tables, columns, joins, stored procedures, functions, or
  views.
- Do not invent data values or codes.
- Use SQL Server / T-SQL syntax.
- Use ISO date literals: YYYY-MM-DD.
- Do not use undeclared SQL variables such as @Date, @Company, etc. Put
  literal values into the generated query unless the application
  explicitly provides a parameter mechanism.
- Prefer exact filters when a code is known.
- For names supplied by the user, use a case-insensitive-friendly
  comparison such as LIKE where appropriate.
- Do not use SELECT * unless the user explicitly asks for all columns.
- Return useful aliases for calculated columns.
- Use TOP N when the user asks for top N / last N / first N.
- For "last/latest/recent", sort by DocDate DESC and use a deterministic
  secondary sort such as DocNo DESC where appropriate.
- Avoid unnecessary joins. Both AcReport and InReport are
  reporting/denormalized tables and already contain descriptive fields.
- Do not join AcReport and InReport unless the user's question genuinely
  requires information from both datasets and a safe join key is
  available.
- Do not assume that a financial amount has the same sign convention in
  AcReport and InReport.
`,
};
