# バックエンド

PlotNativeのバックエンド側コード

## バックエンド環境構築

### EC2インスタンス作成

インバウンドルールを編集し, HTTPの80番ポートを許可する

## デプロイ＆サーバー起動（手動）

### ソースコード転送

FTPでSFTPを利用してサーバーにソースコードを転送する

[https://devopsmania.com/how-to-connect-an-aws-ec2-instance-with-filezilla-and-do-sftp/](https://devopsmania.com/how-to-connect-an-aws-ec2-instance-with-filezilla-and-do-sftp/)

### pm2グローバルインストール

```bash
npm install pm2 -g
```

### nodeインストール&パッケージインストール

```bash
sudo yum install nodejs
npm install
```

### サーバー起動

nodeでウェルノウンポートを使うときは管理者権限が必要

```bash
sudo FRONTEND_ORIGIN="http://nuxt3-ssg-deploy-test.s3-website-ap-northeast-1.amazonaws.com" SERVER_PORT=80 pm2 start app.js
```

### サーバー停止

```bash
sudo pm2 stop
```

## デプロイ＆サーバー起動(CodeDeploy)

### 必要なIAMロール作成

- CodeDeploy用ロール
- EC2がS3からソースコートをpullするためのロール

### CodeDeployエージェントインストール

```bash
sudo yum update
sudo yum install ruby
sudo yum install wget
cd /home/ec2-user
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
```

### 対称のEC2インスタンスにタグをつける

例：{environment: devlopment}

これはデプロイグループを探す際に使われる。


### スクリプト作成

appspec.ymlおよび必要なスクリプトを作成する

### EC2にソースコード配置

zipファイルを置く。
`s3://plot-native-code-deploy/tmp1.zip`

### CodeDeployでアプリケーションおよびデプロイメントを作成

デプロイを実行し、完了を待つ。