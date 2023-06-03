// express
const express = require("express");
const app = express();
const port = 3001;

app.get("/plot", async (req, res) => {
  // frontendからのリクエストはoriginが異なるので許可設定が必要
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const xMin = Number(req.query.xmin);
  const xMax = Number(req.query.xmax);
  const plotNum = Number(req.query.plotnum);
  let p = 0;
  let x = 0;

  let array = [];
  for (let i = 0; i < plotNum; i++) {
    p = (plotNum - 1 - i) / (plotNum - 1);
    x = p * xMin + (1 - p) * xMax;
    array.push({ x: x, y: Math.sin(x) });
  }
  res.json({ status: "success", data: array });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
