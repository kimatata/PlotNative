# PlotNative

数式をプロットするアプリケーション

## 構成

|分類|技術|
|-|-|
|フロントエンド|Nuxt3|
|バックエンド|node.js|

## デプロイ

### フロントエンド側デプロイ

フロントエンドはサーバー機能を使わない構成のため, SSGによるビルド結果をS3で静的サイトホスティングする。

```bash
cd frontend
yarn generate
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

```bash
FRONTEND_ORIGIN="http://localhost:3000" SERVER_PORT=80 node app
```