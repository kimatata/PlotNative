const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const BUCKET_NAME = "nuxt3-ssg-deploy-test";
const ID = process.env.IAM_USEER_KEY;
const SECRET = process.env.IAM_USER_SECRET;

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
  },
});

const directoryToUpload = "frontend/.output/public";

// get file paths
const filePaths = [];
const getFilePaths = (dir) => {
  fs.readdirSync(dir).forEach(function (name) {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      filePaths.push(filePath);
    } else if (stat.isDirectory()) {
      getFilePaths(filePath);
    }
  });
};
getFilePaths(directoryToUpload);

const uploadPromises = filePaths.map((path) =>
  uploadToS3(directoryToUpload, path)
);

Promise.all(uploadPromises)
  .then((result) => {
    console.log("uploads complete");
    console.log(result);
  })
  .catch((err) => console.error(err));

async function uploadToS3(dir, path) {
  return new Promise((resolve, reject) => {
    const key = path.split(`${dir}/`)[1];
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fs.readFileSync(path),
    });
    s3Client.send(command, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`uploaded ${params.Key} to ${params.Bucket}`);
        resolve(path);
      }
    });
  });
}
