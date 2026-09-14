require("dotenv").config({ quiet: true });

const path = require("path");
const express = require("express");

const { generateSql } = require("./lib/generateSql");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/*
 * Homepage / input page
 */
app.get("/", (req, res) => {
  res.render("index", {
    error: null,
    question: "",
  });
});

/*
 * WEBPAGE FLOW (first question of a new conversation):
 *
 * User types a request
 * ↓
 * generateSql({ question }) -- no conversationId, so a new OpenAI
 * conversation is created
 * ↓
 * OpenAI (schema + business rules as instructions, on every call)
 * ↓
 * SQL
 * ↓
 * result.ejs, including the new conversationId so the page's
 * "Continue this query" follow-up box can reuse it
 */
app.post("/generate", async (req, res) => {
  const question = (req.body.question || "").trim();

  if (!question) {
    return res.render("index", {
      error: "Please describe what you want to know first.",
      question: "",
    });
  }

  try {
    const result = await generateSql({ question });

    res.render("result", {
      conversationId: result.conversationId,
      question: result.question,
      heading: result.heading,
      sql: result.sql,
      description: result.description,
      notFound: result.notFound,
      isEmptyResult: result.isEmptyResult,
    });
  } catch (error) {
    console.error(error);

    return res.render("index", {
      error: `Couldn't generate a query: ${error.message}`,
      question,
    });
  }
});

/*
 * POST API -- shared by the result page's "Continue this query"
 * follow-up box AND any external caller. This is the SAME generateSql
 * logic the browser's /generate route uses above -- no duplicated
 * SQL-generation code between the two.
 *
 * POST /api/generate-sql   { "question": "...", "conversationId"?: "..." }
 *
 * No conversationId       -> starts a new OpenAI conversation.
 * conversationId provided -> continues that existing conversation.
 *
 * Returns JSON: { conversationId, question, heading, sql, description, notFound, isEmptyResult }
 */
app.post("/api/generate-sql", express.json(), async (req, res) => {
  const question = (req.body?.question || "").trim();
  const conversationId = req.body?.conversationId || undefined;

  if (!question) {
    return res.status(400).json({
      error: "Please provide a question.",
    });
  }

  try {
    const result = await generateSql({ question, conversationId });

    return res.status(200).json({
      conversationId: result.conversationId,
      question: result.question,
      heading: result.heading,
      sql: result.sql,
      description: result.description,
      notFound: result.notFound,
      isEmptyResult: result.isEmptyResult,
    });
  } catch (error) {
    console.error(error);

    const message = String(error?.message || "");
    const looksLikeBadConversation =
      /conversation/i.test(message) &&
      /(not found|invalid|does not exist)/i.test(message);

    if (looksLikeBadConversation) {
      return res.status(400).json({
        error: "That conversation could not be found. Please start a new one.",
      });
    }

    return res.status(500).json({
      error: `Couldn't generate a query: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
