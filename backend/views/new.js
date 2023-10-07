const express = require("express");
const crypto = require("crypto");
const { DynamoDBClient, WriteRequest } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

const router = express.Router();
router.post("/views/new", async (req, res) => {
  const formula = req.query.formula;
  const name = req.query.name;

  if (formula.length < 1 || name.length < 1) {
    res.json({ success: false });
  } else {
    await putItem(formula, name);
    res.json({ success: true });
  }
});

const dbClient = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});
const documentClient = DynamoDBDocumentClient.from(dbClient);

async function putItem(formula, name) {
  try {
    const command = new PutCommand({
      TableName: "viewDev",
      Item: {
        viewId: crypto.randomUUID(),
        dbVersion: 1,
        name: name,
        formula: formula,
      },
    });
    const output = await documentClient.send(command);
    return output.Items;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

module.exports = router;
