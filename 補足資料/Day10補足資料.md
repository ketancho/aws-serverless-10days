Day10 のハンズオンに関する情報を掲載します。

# Day10-1
## HTTP API simple-weather-news-api-public の作成
```bash
cd ~/simple-weather-news-cdk-project
vim lib/simple-weather-news-cdk-project-stack.ts
```

```bash
git add -A
git commit -m "Add HTTP API"
git push origin main
# -> username + token の入力
```

## simple-weather-news-api-public に GET /all Route の追加 & Lambda 関数との紐づけ
```bash
cd ~/simple-weather-news-cdk-project
vim lib/simple-weather-news-cdk-project-stack.ts
```

```bash
git add -A
git commit -m "Add GET /all"
git push origin main
# -> username + token の入力
```

# Day10-2
## simple-weather-news-api-public に GET /all Route の追加 & Lambda 関数との紐づけ
```bash
cd ~/simple-weather-news-cdk-project
vim lib/simple-weather-news-cdk-project-stack.ts
```

```bash
git add -A
git commit -m "Add GET /{cityId}"
git push origin main
# -> username + token の入力
```

# Day10-3
## Simple Weather News サイトのホスティング
※ `your-bucket-name-day7` は *Day7 で作った* S3バケット名に置き換えてください（Day5 のものではありません）
```bash
cd ~
mkdir work-simple-weather-news
cp -r aws-serverless-10days/Day10/simple_weather_news/* work-simple-weather-news/
cd work-simple-weather-news
vim js/config.js
# -> Day10 で作った API Gateway エンドポイントを入力（最後の / は不要です）
aws s3 sync . s3://your-bucket-name-day7/
```