# PlotNative

数式をプロットするアプリケーション

## 構成

|分類|技術|
|-|-|
|フロントエンド|Nuxt3|
|バックエンド|node.js|

### ローカル環境

```bash
yarn dev -o
```

```bash
FRONTEND_ORIGIN="http://localhost:3000" SERVER_PORT=8080 node app
```

```c:ローカルでのfrontend/.envの内容
NUXT_SERVER_ORIGIN = "http://localhost:8080"
```

## デプロイ

### フロントエンド側デプロイ

フロントエンドはサーバー機能を使わない構成のため, SSGによるビルド結果をS3で静的サイトホスティングする。

```bash
cd frontend
yarn generate
```

```c:ビルド時のfrontend/.env.envの内容
NUXT_SERVER_ORIGIN = "http://18.183.220.92:80"
```

`output/public`フォルダ配下のファイルをすべてS3バケットにコピー。

### バックエンド側デプロイ

nodeからネイティブコードを呼び出す練習レポジトリ

#### EC2インスタンス作成

インバウンドルールを編集し, HTTPの80番ポートを許可する

#### ソースコード転送

FTPでSFTPを利用してサーバーにソースコードを転送する

[https://devopsmania.com/how-to-connect-an-aws-ec2-instance-with-filezilla-and-do-sftp/](https://devopsmania.com/how-to-connect-an-aws-ec2-instance-with-filezilla-and-do-sftp/)

#### nodeインストール&パッケージインストール

```bash
sudo yum install nodejs
npm install
```

#### サーバー起動

nodeでウェルノウンポートを使うときは管理者権限が必要

```bash
sudo FRONTEND_ORIGIN="http://nuxt3-ssg-deploy-test.s3-website-ap-northeast-1.amazonaws.com" SERVER_PORT=80 node app
```