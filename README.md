# PlotNative

数式をプロットするアプリケーション

## 構成

| 分類           | 技術    |
| -------------- | ------- |
| フロントエンド | Nuxt3   |
| バックエンド   | node.js |

### ローカルでの実行

```bash
cd frontend
bash start.sh
```

```bash
cd backend
FRONTEND_ORIGIN="http://localhost:3000" SERVER_PORT=8080 node app.js
```

ローカル開発環境では`frontend/.env.local`を用いる

```
NUXT_SERVER_ORIGIN = "http://localhost:8080"
```

## 環境構築(TODO CloudFormationによる自動化)

- フロントエンド
  - 静的ホスト用のS3バケット作成
  - バケットルール編集
- バックエンド
  - EC2インスタンス作成
  - インバウンドルールを編集し, HTTPの80番ポートを許可する
  - CodeDeployエージェントインストール(以下参照)
	- 対象のEC2インスタンスへのタグづけ 例：{environment: devlopment}
	  これはデプロイグループを探す際に使われる。
	- EC2インスタンスへのIAMロール付与
	  (CodeDeploy用ロール, EC2がS3からソースコートをpullするためのロール)

```bash
sudo yum update
sudo yum install ruby
sudo yum install wget
cd /home/ec2-user
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
```

## デプロイ

### 事前準備

#### デプロイ作業に必要な権限を持つIAMユーザーを作成

- s3へのアクセス権限（静的ファイルホスト用のバケットおよびバックエンドコードを配置する用のバケット）
- codeDeployでデプロイイベントをトリガーするための権限

カスタムポリシー：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": ["s3:*", "s3-object-lambda:*", "codedeploy:*"],
      "Resource": [
        "arn:aws:s3:::nuxt3-ssg-deploy-test",
        "arn:aws:s3:::nuxt3-ssg-deploy-test/*",
        "arn:aws:s3:::plot-native-code-deploy",
        "arn:aws:s3:::plot-native-code-deploy/*",
        "*"
      ]
    }
  ]
}
```

#### ルートディレクトリに.env ファイルを配置

先ほど作成したIAMユーザーのcredentialを.envファイルに記述

```
IAM_USEER_KEY=xxxxxxxxx
IAM_USER_SECRET=xxxxxxxxx
```

#### npm インストール

```bash
npm install
```

#### デプロイ実行(フロントエンド)

```bash
bash deploy.sh
```

#### デプロイ実行(バックエンド)

スクリプト実行で以下の処理が自動で行われる

- backend/配下のすべてのファイル(node_modulesを除く)をzipファイルに圧縮
- zipファイルをS3にアップロード
- codeDeployのデプロイイベントをトリガー
