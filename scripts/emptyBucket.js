const { S3Client, ListObjectsV2Command, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const BUCKET_NAME = "nuxt3-ssg-deploy-test";
const ID = process.env.IAM_USEER_KEY;
const SECRET = process.env.IAM_USER_SECRET;

const s3Client = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
  },
});

main();

async function main() {
  try {
    await emptyBucket(BUCKET_NAME);
  } catch (e) {
    console.log(e);
  }
}

async function emptyBucket(bucket) {
  const input = {
    Bucket: bucket,
  };

  const command = new ListObjectsV2Command(input);
  const listedObjects = await s3Client.send(command);
  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    return;
  }

  const deleteInput = {
    Bucket: bucket,
    Delete: {
      Objects: getDeleteObjects(listedObjects),
    },
  };

  const deleteCommand = new DeleteObjectsCommand(deleteInput);
  const response = await s3Client.send(deleteCommand);
}

function getDeleteObjects(listedObjects) {
  return listedObjects.Contents.reduce(
    (array, { Key }) => [
      ...array,
      {
        Key,
      },
    ],
    [],
  );
}