# PlotNative

数式をプロットするアプリケーション

## 構成

|分類|技術|
|-|-|
|フロントエンド|Nuxt3|
|バックエンド|node.js|

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

### フロントエンド側デプロイ

フロントエンドはサーバー機能を使わない構成のため, SSGによるビルド結果をS3で静的サイトホスティングする。

```bash
cd frontend
bash generate.sh
```

`output/public`フォルダ配下のファイルをすべてS3バケットにコピー。

ビルド時の環境変数は`frontend/.env.production`を用いる

```
NUXT_SERVER_ORIGIN = "http://18.183.220.92:80"
```
