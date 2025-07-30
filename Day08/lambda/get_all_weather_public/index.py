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