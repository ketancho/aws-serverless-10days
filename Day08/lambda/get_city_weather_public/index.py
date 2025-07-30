import json
import boto3

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):

    city_id = event['pathParameters']['cityId']
    
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