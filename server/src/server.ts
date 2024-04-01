import express from "express";
import cors from "cors";
import { query } from "express-validator";

import { wordDefinition, wordSearch } from "./service/service";

const app = express();

app.use(express.static("public"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get(
  "/word-search",
  query("search").trim().notEmpty().escape(),
  query("length").optional().isNumeric(),
  query("regexp").optional().trim().notEmpty(),
  wordSearch
);

app.get(
  "/word-definition",
  query("word").trim().notEmpty().escape(),
  wordDefinition
);

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
