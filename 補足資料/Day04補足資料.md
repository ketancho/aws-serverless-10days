Day4 のハンズオンに関する情報を掲載します。
動画にあわせて手を動かしていただくことを推奨していますが、もし「同じ手順を実施したはずなのに動かない..」となったときように、コピー＆ペーストしていただく用途で使っていただければと考えています。

# Day4-2 終了断面の get_all_weather_function 
```py
import json

def lambda_handler(event, context):
    # 固定の天気予報データ
    weather_data = [
        {
            "cityId": 1,
            "cityName": "札幌",
            "weatherId": 12,
            "weatherName": "雨",
            "rainfallProbability": 90
        },
        {
            "cityId": 13,
            "cityName": "東京", 
            "weatherId": 4,
            "weatherName": "くもり",
            "rainfallProbability": 70
        },
        {
            "cityId": 23,
            "cityName": "名古屋",
            "weatherId": 4,
            "weatherName": "くもり",
            "rainfallProbability": 50
        },
        {
            "cityId": 27,
            "cityName": "大阪",
            "weatherId": 4,
            "weatherName": "くもり",
            "rainfallProbability": 30
        },
        {
            "cityId": 40,
            "cityName": "博多",
            "weatherId": 2,
            "weatherName": "晴れ",
            "rainfallProbability": 10
        }
    ]
    
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "body": json.dumps(weather_data, ensure_ascii=False),  
        "headers": {
            "Content-Type": "application/json"
        }
    }
```

# Day4-3 終了断面の get_all_weather_function 
```py
import json
import boto3

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):
    response = dynamodb_client.scan(
        TableName='simple-weather-news-table',
    )
    items = response['Items']

    weather_data = []

    for item in items:
        weather_item = {
            "cityId": int(item['CityId']['N']),
            "cityName": item['CityName']['S'],
            "weatherId": int(item['WeatherId']['N']),
            "weatherName": item['WeatherName']['S'],
            "rainfallProbability": int(item['RainfallProbability']['N'])
        }
        weather_data.append(weather_item)

    weather_data.sort(key=lambda x: x['cityId'])

    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "body": json.dumps(weather_data, ensure_ascii=False),
        "headers": {
            "content-type": "application/json"
        }
    }
```

# Day4-4 終了断面の get_city_weather_function
```py
import json
import boto3

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):

    city_id = "1"

    response = dynamodb_client.get_item(
        TableName='simple-weather-news-table',
        Key={
            'CityId': {
                'N': city_id
            }
        }
    )

    if 'Item' not in response:
        return {
            "isBase64Encoded": False,
            "statusCode": 404,
            "body": json.dumps({"error": "指定された都市が見つかりません"}, ensure_ascii=False),
            "headers": {
                "content-type": "application/json"
            }
        }

    item = response['Item']
    weather_detail = {
        "cityId": int(item['CityId']['N']),
        "cityName": item['CityName']['S'],
        "weatherId": int(item['WeatherId']['N']),
        "weatherName": item['WeatherName']['S'],
        "rainfallProbability": int(item['RainfallProbability']['N'])
    }

    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "body": json.dumps(weather_detail, ensure_ascii=False),
        "headers": {
            "content-type": "application/json"
        }
    }
```

# Day4-5 
## Day4-5 終了断面の get_city_weather_function
```py
    city_id = event['pathParameters']['cityId']
```
## テスト用JSON（正常系）
```json
{
  "pathParameters": {
    "cityId": "13"
  }
}
```

## テスト用JSON（異常系）
```json
{
  "pathParameters": {
    "cityId": "99"
  }
}
```