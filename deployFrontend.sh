#!/bin/bash

# **************************************************************************
# deploy frontend
# **************************************************************************
# ./.envファイルを読み込んで変数として参照できるようにする
source ./.env

# awsプロファイル設定
aws configure set aws_access_key_id $IAM_USEER_KEY
aws configure set aws_secret_access_key $IAM_USER_SECRET
aws configure set region ap-northeast-1

# アップロード実行
aws s3 cp --recursive frontend/.output/public s3://nuxt3-ssg-deploy-test