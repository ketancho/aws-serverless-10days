Day9 のハンズオンに関する情報を掲載します。

# Day9-2
## CloudShell の Git セットアップ
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

## 現状の CDK 関連リソースを Commit/Push
```bash
cd ~/simple-weather-news-cdk-project
git init

# [GitHub Repository URL] を皆さまの GitHub リポジトリ URL に置き換えてください
git remote add origin [GitHub Repository URL]
git status

git add -A
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

# Day9-3
## 用意してある buildspec.yml をコピーする
```bash
cp ~/aws-serverless-10days/Day09/buildspec.yml ~/simple-weather-news-cdk-project/
```

## buildspec.yml を GitHub に Push
```bash
git add -A
git commit -m "update."
git push origin main
# -> username + token の入力
```

## CodeBuild プロジェクトのサービスロールに付与する IAM ポリシー一覧
- AWSCloudFormationFullAccess
- AmazonSSMReadOnlyAccess
- AmazonS3FullAccess
- IAMFullAccess

## ビルドテストのために get_all_weather_public_function を修正する
```bash
cd ~/simple-weather-news-cdk-project
vim lambda/get_all_weather_public/index.py
# -> print 文を追加する（あくまでビルドがうまくいくかを確認したいだけなので、Lambda 関数の処理に影響がない修正であれば何でも OK です）

git add -A
git commit -m "update."
git push origin main
# -> username + token の入力
```

# Day9-4　
## CodePipeline のテストのために get_all_weather_public_function を修正する
```bash
cd ~/simple-weather-news-cdk-project
vim lambda/get_all_weather_public/index.py
# -> Day9-3 で追加した print 文を削除する（CodePipeline の実行がうまくいくかを確認したいだけなので、Lambda 関数の処理に影響がない修正であれば何でも OK です）

git add -A
git commit -m "update."
git push origin main
# -> username + token の入力
# -> この git push が成功したら自動的に CodePipeline が実行されはじめるかを確認します
```
