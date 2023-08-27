const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const BUCKET_NAME = "plot-native-code-deploy";
const ID = process.env.IAM_USEER_KEY;
const SECRET = process.env.IAM_USER_SECRET;

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
  },
});

const fileName = "backend.zip";
const fileData = fs.readFileSync(fileName);

const command = new PutObjectCommand({
  Bucket: BUCKET_NAME,
  Key: fileName,
  Body: fileData,
});
s3Client.send(command, (err) => {
  if (err) {
    reject(err);
  } else {
    console.log(`uploaded zip complete`);
  }
});
