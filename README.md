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

## デプロイ

### 事前準備

#### s3 へのアクセス権限を付与した IAM ユーザーを作成

カスタムポリシー：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": ["s3:*", "s3-object-lambda:*"],
      "Resource": [
        "arn:aws:s3:::nuxt3-ssg-deploy-test",
        "arn:aws:s3:::nuxt3-ssg-deploy-test/*",
        "arn:aws:s3:::plot-native-code-deploy",
        "arn:aws:s3:::plot-native-code-deploy/*"
      ]
    }
  ]
}
```

#### ルートディレクトリに.env ファイルを配置

```
IAM_USEER_KEY=xxxxxxxxx
IAM_USER_SECRET=xxxxxxxxx
```

#### npm インストール

```bash
npm install
```

#### デプロイ実行

```bash
npm install
bash deploy.sh
```

スクリプト実行で以下の処理が行われる

- SSG で静的ファイル生成
- バケット中のファイルをすべて削除
- .output/public/ 配下のファイルをすべて S3 のバケットにアップロード
