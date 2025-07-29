Day5 のハンズオンに関する情報を掲載します。
動画にあわせて手を動かしていただくことを推奨していますが、もし「同じ手順を実施したはずなのに動かない..」となったときように、コピー＆ペーストしていただく用途で使っていただければと考えています。

また、Day5-4の put_city_weather_function の実装については、動画中でも紹介していますが、これを見ずに皆さまで実装に挑戦していただいてもいいと思っています。
あくまで実装例として参考にしてみてください。

# Day5-1 

## バケットポリシー
`Bucket-Name` の部分を皆さまが作成した S3 バケット名に変更してください。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::Bucket-Name/*"
            ]
        }
    ]
}
```

## CloudShell 上での作業コマンド

### vim の初期設定
```bash
vim ~/.vimrc
```
i を押し、挿入モードにした上で、下記のように記入し、 ESC + :wq + Enter で保存
```
set tabstop=2
```

### GitHub からフロントエンドコードの雛形を取得し、作業用ディレクトリに配置、皆さまの S3 バケットにホスティング
```bash
git clone https://github.com/ketancho/aws-serverless-10days.git
mkdir work-simple-weather-news-admin
cp -r aws-serverless-10days/Day05/simple_weather_admin/Day05-01/* work-simple-weather-news-admin/
cd work-simple-weather-news-admin
aws s3 sync . s3://your-bucket-name/

# もし上手く動かなくなった場合、DayNN-NN終了断面に戻したい場合に使用するコマンド
# （最後のコマンドの DayNN-NN-end の NN 部分を具体的な数字に置き換えてください。例：Day5-2終了断面に戻したい場合は、Day05-02-end）
#cd ~
#rm -r work-simple-weather-news-admin/*
#cp -r aws-serverless-10days/Day05/simple_weather_admin/DayNN-NN-end/* work-simple-weather-news-admin/
# → js/config.js の設定が消えてしまうので、API Gateway エンドポイントなどを改めて皆さまのものに置き換えてください。
```

# Day5-2 
参考：Day5-2 の最終断面については、Day06/simple_weather_admin/Day05-02-end 以下に格納してあります
## CloudShell 上での作業コマンド
```bash
cd ~/work-simple-weather-news-admin
vim js/config.js 
vim list.html
aws s3 sync . s3://your-bucket-name/
```

# Day5-3 
参考：Day5-3 の最終断面については、Day06/simple_weather_admin/Day05-03-end 以下に格納してあります
## CloudShell 上での作業コマンド
```bash
cd ~/work-simple-weather-news-admin
vim detail.html
aws s3 sync . s3://your-bucket-name/
```

# Day5-4 
## put_city_weather_function の実装例
```py
import json
import boto3

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):

    if 'cityId' in event['pathParameters']:
        city_id = int(event['pathParameters']['cityId'])
    else:
        return {
            'isBase64Encoded': False,
            'statusCode': 404,
            'body': json.dumps({'error': 'city_id is required'}, ensure_ascii=False),
            'headers': {
                'content-type': 'application/json'
            }
        }

    city_name = findCityName(city_id)
    if city_name == 'ERROR':
        return {
            'isBase64Encoded': False,
            'statusCode': 404,
            'body': json.dumps({'error': 'Invalid cityId'}, ensure_ascii=False),
            'headers': {
                'content-type': 'application/json'
            }
        }

    body = json.loads(event['body'])
    weather_id = int(body['weatherId'])
    weather_name = findWeatherName(weather_id)

    rainfall_probability = int(body['rainfallProbability'])

    dynamodb_client.put_item(
        TableName='simple-weather-news-table',
        Item={
            'CityId': {
                'N': str(city_id),
            },
            'CityName': {
                'S': city_name,
            },
            'WeatherId': {
                'N': str(weather_id),
            },
            'WeatherName': {
                'S': weather_name,
            },
            'RainfallProbability': {
                'N': str(rainfall_probability),
            },
        },
    )
    
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "body": json.dumps('Update: ' + str(city_id), ensure_ascii=False),
        "headers": {
            "content-type": "application/json"
        }
    }

def findCityName(city_id):
    city_map = {1: '札幌', 13: '東京', 23: '名古屋', 27: '大阪', 40: '博多'}
    return city_map.get(city_id, 'ERROR')

def findWeatherName(weather_id):
    weather_map = {2: '晴れ', 4: 'くもり', 12: '雨'}
    return weather_map.get(weather_id, 'ERROR')
```

## put_city_weather_function の Test Event 例
```json
{
  "pathParameters": {
    "cityId": "1"
  },
  "body": "{\"weatherId\": 12, \"rainfallProbability\": 100}",
  "headers": {
    "Content-Type": "application/json"
  },
  "httpMethod": "PUT",
  "resource": "/{cityId}"
}
```

## PUT API のテストコマンド
```bash
curl -X PUT \
  https://your-api-gateway-url/1 \
  -H "Content-Type: application/json" \
  -d '{"weatherId": 2, "rainfallProbability": 0}'
```

# Day5-5 
参考：Day5-5 の最終断面については、Day06/simple_weather_admin/Day05-05-end 以下に格納してあります
## CloudShell 上での作業コマンド
```bash
cd ~/work-simple-weather-news-admin
vim detail.html
aws s3 sync . s3://your-bucket-name/
```
