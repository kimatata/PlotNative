const express = require("express");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

const router = express.Router();
router.get("/views/:uuid", async (req, res) => {
  let ret = {
    success: false,
    formula: "x",
  };
  ret.success = true;
  ret.formula = await getItem(req.params.uuid);
  res.json(ret);
});

const dbClient = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});
const documentClient = DynamoDBDocumentClient.from(dbClient);

async function getItem(uuid) {
  try {
    const command = new GetCommand({
      TableName: "viewDev",
      Key: {
        viewId: uuid,
      },
    });
    const output = await documentClient.send(command);
    return output.Item.formula;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

module.exports = router;
