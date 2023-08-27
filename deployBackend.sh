#!/bin/bash

# **************************************************************************
# deploy backend
# **************************************************************************
# backend側のコードをzipファイルに圧縮
cd backend
zip -r ../backend.zip * --exclude "node_modules/*"
cd ..

# S3にアップロード
node scripts/uploadZip.js