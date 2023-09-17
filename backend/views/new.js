const express = require("express");
const crypto = require("crypto");
const { DynamoDBClient, WriteRequest } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

const dbClient = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});
const documentClient = DynamoDBDocumentClient.from(dbClient);

async function putItem() {
  try {
    const command = new PutCommand({
      TableName: "viewDev",
      Item: {
        viewId: crypto.randomUUID(),
        dbVersion: 1,
        name: "sample1",
        formula: "3x-4",
      },
    });
    const output = await documentClient.send(command);
    return output.Items;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

const router = express.Router();
router.post("/views/new", async (req, res) => {
  await putItem();
  res.json({ success: true });
});

module.exports = router;
