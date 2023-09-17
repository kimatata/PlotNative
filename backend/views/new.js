const express = require("express");
const crypto = require("crypto");
const {
  DynamoDBClient,
  WriteRequest,
  BatchWriteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/client-dynamodb");
require("dotenv").config();

const dbClient = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});
const documentClient = DynamoDBDocumentClient.from(dbClient);

const writeRequests = [
  {
    PutRequest: {
      Item: {
        viewId: { S: crypto.randomUUID() },
        dbVersion: { N: `${1}` },
        name: { S: "sample1" },
        formula: { S: "x-2" },
      },
    },
  },
  {
    PutRequest: {
      Item: {
        viewId: { S: crypto.randomUUID() },
        dbVersion: { N: `${1}` },
        name: { S: "sample2" },
        formula: { S: "x^2+3x-2" },
      },
    },
  },
];

const tableName = "viewDev";

async function putItems() {
  const result = await dynamoDBClient.send(
    new BatchWriteItemCommand({
      RequestItems: {
        [tableName]: writeRequests, // キーにテーブル名を指定
      },
    })
  );
}

const router = express.Router();
router.post("/views/new", async (req, res) => {
  await putItems();
  res.json({ success: true });
});

module.exports = router;
