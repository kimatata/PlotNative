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
