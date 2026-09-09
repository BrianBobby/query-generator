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
 * WEBPAGE FLOW:
 *
 * User types a request
 * ↓
 * OpenAI (schema + business rules as context)
 * ↓
 * SQL
 * ↓
 * Result page
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
    const result = await generateSql(question);

    res.render("result", {
      question: result.question,
      heading: result.heading,
      sql: result.sql,
      description: result.description,
      notFound: result.notFound,
    });
  } catch (error) {
    console.error(error);

    return res.render("index", {
      error: `Couldn't generate a query: ${error.message}`,
      question,
    });
  }
});

app.post("/api/generate-sql", express.json(), async (req, res) => {
  const question = (req.body?.question || "").trim();

  if (!question) {
    return res.status(400).json({
      error: "Provide a 'question' field describing what you want.",
    });
  }

  try {
    const result = await generateSql(question);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(422).json({
      error: `Couldn't generate a query: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
