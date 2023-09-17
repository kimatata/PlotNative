const express = require("express");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
require('dotenv').config()

const dbClient = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});

async function scan() {
  try {
    const command = new ScanCommand({
      TableName: "viewDev",
      Limit: 100,
    });
    const output = await dbClient.send(command);
    return output.Items
  } catch (err) {
    console.log("ERROR:", err);
  }
}

const router = express.Router();
router.get("/views", async (req, res) => {
  const items = await scan();
  res.json({ success: true, items: items });
});

module.exports = router;
