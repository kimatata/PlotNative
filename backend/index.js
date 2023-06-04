// express
const express = require("express");
const app = express();
const port = 3001;

const math = require("mathjs");

app.get("/plot", async (req, res) => {
  // frontendからのリクエストはoriginが異なるので許可設定が必要
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const fx = req.query.fx;
  const xMin = Number(req.query.xmin);
  const xMax = Number(req.query.xmax);
  const plotNum = Number(req.query.plotnum);

  // ユーザーが入力した数式を簡略化
  let simpleFx = "";
  try {
    simpleFx = await math.simplify(fx).toString();
  } catch (error) {
    res.json({ status: "error", data: null });
    return;
  }

  // 数式をコンパイル
  const node = math.parse(simpleFx);
  const code = node.compile();

  // 配列作成
  let array = [];
  let scope = {};
  let p = 0;
  let x = 0;
  for (let i = 0; i < plotNum; i++) {
    p = (plotNum - 1 - i) / (plotNum - 1);
    x = p * xMin + (1 - p) * xMax;
    scope.x = x;
    array.push({ x: x, y: code.evaluate(scope) });
  }
  res.json({ status: "success", data: array });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
