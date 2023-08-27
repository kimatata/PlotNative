#!/bin/bash

# **************************************************************************
# deploy frontend
# **************************************************************************
# SSGで静的ファイル生成
cd frontend
yarn generate --dotenv .env.production
cd ..

# バケット中のファイルをすべて削除
node scripts/emptyBucket.js

# .output/public/ 配下のファイルをすべてS3のバケットにアップロード
node scripts/uploadToBucket.js