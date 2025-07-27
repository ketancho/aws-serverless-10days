Day2 のハンズオンで利用する情報やソースコードを掲載します。
動画にあわせてハンズオンを進めていただいたときに、もし「同じ実装をしたはずなのにうまく動かない..」となってしまったときに、参考にしていただければと思います。

# Day2-3 Item の作成

* CityId / 1 / 数値
* CityName / 札幌 / 文字列
* WeatherId / 4 / 数値
* WeatherName / くもり / 文字列
* RainfallProbability / 40 / 数値

# Day2-4 断面の put_random_weather_function
```py
import json
import boto3

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):

    response = dynamodb_client.put_item(
        TableName='simple-weather-news-table',
        Item={
            'CityId': {
                'N': '23',
            },
            'CityName': {
                'S': '名古屋',
            },
            'WeatherId': {
                'N': '2',
            },
            'WeatherName': {
                'S': '晴れ',
            },
            'RainfallProbability': {
                'N': '10',
            },
        },
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```

# Day2-5 断面の put_random_weather_function
```py
import json
import boto3
import random

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):

    random_number = random.randrange(11)

    if random_number <= 2:
        weather_id = 2
        weather_name = '晴れ'
    elif random_number <= 7:
        weather_id = 4
        weather_name = 'くもり'
    else:
        weather_id = 12
        weather_name = '雨'

    rainfall_probability = random_number * 10

    response = dynamodb_client.put_item(
        TableName='simple-weather-news-table',
        Item={
            'CityId': {
                'N': '27',
            },
            'CityName': {
                'S': '大阪',
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
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
```

# Day2-6 断面の put_random_weather_function
```py
import json
import boto3
import random

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):

    if 'cityId' in event:
        city_id = int(event['cityId'])
    else:
        city_id = random.choice([1, 13, 23, 27, 40]) # event に city_id が含まれない場合はランダムに更新

    city_name = findCityName(city_id)
    if city_name == 'ERROR':
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid cityId')
        }

    random_number = random.randrange(11)

    if random_number <= 2:
        weather_id = 2
        weather_name = '晴れ'
    elif random_number <= 7:
        weather_id = 4
        weather_name = 'くもり'
    else:
        weather_id = 12
        weather_name = '雨'

    rainfall_probability = random_number * 10

    response = dynamodb_client.put_item(
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
        'statusCode': 200,
        'body': json.dumps('Update: ' + str(city_id))
    }

def findCityName(city_id):
    city_map = {1: '札幌', 13: '東京', 23: '名古屋', 27: '大阪', 40: '博多'}
    return city_map.get(city_id, 'ERROR')
```