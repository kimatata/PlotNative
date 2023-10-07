// express
const express = require("express");
const app = express();
const cors = require('cors')

// environment
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000"
const port = process.env.SERVER_PORT ?? "3001";
console.log('frontendOrigin:', frontendOrigin);
console.log('PORT:', port);
const corsOptions = {
  origin: frontendOrigin,
}
app.use(cors(corsOptions)) // frontendサーバーからのajaxリクエストのみ許可する

// import
const math = require("mathjs");

app.get('/', (req, res) => {
  res.send('hello world')
})

const viewIndexRoute = require('./views/index.js')
const viewNewRoute = require('./views/new.js')
const viewShowRoute = require('./views/show.js')
app.use(viewIndexRoute)
app.use(viewNewRoute)
app.use(viewShowRoute)

app.get("/plot", async (req, res) => {
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
