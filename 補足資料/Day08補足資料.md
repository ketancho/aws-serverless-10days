Day8 のハンズオンに関する情報を掲載します。

# Day8-2
## AWS CDK のインストール on AWS CloudShell
```bash
cd ~

# リージョン確認
aws configure set region ap-northeast-1
aws configure get region
# => ap-northeast-1 と表示されることを確認する

# Node.js/npm がインストールされていることを確認する
node --version
npm --version

# CDK CLIのインストール確認・インストール
sudo npm install -g aws-cdk@latest
cdk --version
```

## CDK の初期セットアップ
```bash
mkdir simple-weather-news-cdk-project
cd simple-weather-news-cdk-project
cdk init app --language typescript
cdk bootstrap
```

# Day8-3
## （必要に応じて）講座で用意しているリソースを最新化
```bash
cd ~/aws-serverless-10days/
git pull
cd ~/simple-weather-news-cdk-project/
```

## 講座で用意した雛形 .ts と .py をコピーする
```bash
# stack.ts の雛形をコピー
cp ~/aws-serverless-10days/Day08/lib/Day08-03/simple-weather-news-cdk-project-stack.ts ~/simple-weather-news-cdk-project/lib/
# Lambda 関数のコード格納する用ディレクトリを作成 & 雛形をコピー
## Day8-3: get_all_weather_public_function
mkdir -p ~/simple-weather-news-cdk-project/lambda/get_all_weather_public
cp ~/aws-serverless-10days/Day08/lambda/get_all_weather_public/index.py ~/simple-weather-news-cdk-project/lambda/get_all_weather_public/
## Day8-4: get_city_weather_public_function
mkdir -p ~/simple-weather-news-cdk-project/lambda/get_city_weather_public
cp ~/aws-serverless-10days/Day08/lambda/get_city_weather_public/index.py ~/simple-weather-news-cdk-project/lambda/get_city_weather_public/
cp ~/aws-serverless-10days/Day08/lib/Day08-03/simple-weather-news-cdk-project-stack.ts ~/simple-weather-news-cdk-project/lib/
```

## Lambda 関数　get_all_weather_public_function　を作成するよう stack.ts を更新する
```bash
cd ~/simple-weather-news-cdk-project
vim lib/simple-weather-news-cdk-project-stack.ts
```
※ もし、修正が上手くいかない場合は、Day8-3 終了時点の stack.ts を、Day08/lib/Day08-03-end/simple-weather-news-cdk-project-stack.ts に用意してありますので、コピーしてお使いください。

## CDK をデプロイする
```bash
cdk deploy
# => Do you wish to deploy these changes (y/n)? と表示されたら y + Enter
```

## Lambda 関数 get_all_weather_public_function のテスト
```bash
aws lambda invoke --function-name get_all_weather_public_function --payload '{}' /dev/stdout
```

# Day8-4

## Lambda 関数　get_city_weather_public_function　を作成するよう stack.ts を更新する
```bash
vim lib/simple-weather-news-cdk-project-stack.ts
```
※ もし、修正が上手くいかない場合は、Day8-4 終了時点の stack.ts を、Day08/lib/Day08-04-end/simple-weather-news-cdk-project-stack.ts に用意してありますので、コピーしてお使いください。

## CDK をデプロイする
```bash
cdk deploy
# => Do you wish to deploy these changes (y/n)? と表示されたら y + Enter
```

## Lambda 関数 get_city_weather_public_function のテスト
```
aws lambda invoke --function-name get_city_weather_public_function --payload $(echo '{"pathParameters":{"cityId":"13"}}' | base64) /dev/stdout
```