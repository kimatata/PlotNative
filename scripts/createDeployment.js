const {
  CodeDeployClient,
  CreateDeploymentCommand,
} = require("@aws-sdk/client-codedeploy");
require("dotenv").config();

const ID = process.env.IAM_USEER_KEY;
const SECRET = process.env.IAM_USER_SECRET;

const client = new CodeDeployClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
  },
});

const input = {
  // CreateDeploymentInput
  applicationName: "PlotNativeBackend",
  deploymentGroupName: "DevelopmentGroup",
  revision: {
    revisionType: "S3",
    s3Location: {
      bucket: "plot-native-code-deploy",
      key: "backend.zip",
      bundleType: "zip",
    },
  },
  // targetInstances: {
    // TargetInstances
    // tagFilters: [
    //   {
    //     Key: "Environment",
    //     Value: "Development",
    //     Type: "KEY_AND_VALUE",
    //   },
    // ],
    // ec2TagSet: {
    //   // EC2TagSet
    //   ec2TagSetList: [
    //     // EC2TagSetList
    //     [
    //       {
    //         Key: "STRING_VALUE",
    //         Value: "STRING_VALUE",
    //         Type: "KEY_ONLY" || "VALUE_ONLY" || "KEY_AND_VALUE",
    //       },
    //     ],
    //   ],
    // },
  // },
};

const command = new CreateDeploymentCommand(input);

client.send(command, (err) => {
  if (err) {
    console.log(err);
    reject(err);
  } else {
    console.log(`create deployment complete`);
  }
});
