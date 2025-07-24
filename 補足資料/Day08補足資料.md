Day8 のハンズオンに関する情報を掲載します。

# Day8-2
## AWS CDK のインストール on AWS CloudShell
```bash
cd ~

# リージョン確認
aws configure set region ap-northeast-1
aws configure get region
# => ap-northeast-1 と表示されることを確認する

# Node.js/npmのバージョン確認
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


# Day8-4
