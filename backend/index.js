// express
const express = require("express");
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  // frontendからのリクエストはoriginが異なるので許可設定が必要
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  const parsedDom = await fetchFromUrl("https://github.com/jsdom/jsdom");
  console.log(parsedDom);
  res.status(201).json(parsedDom.window.document);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});