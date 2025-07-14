import json
import boto3

dynamodb_client = boto3.client('dynamodb')

def lambda_handler(event, context):
    # API GatewayのパスパラメータからcityIdを取得
    city_id = event['pathParameters']['cityId']
    
    # DynamoDBから特定の都市のデータを取得
    response = dynamodb_client.get_item(
        TableName='simple-weather-table',
        Key={
            'CityId': {
                'N': city_id
            }
        }
    )
    
    # アイテムが見つからない場合
    if 'Item' not in response:
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "指定された都市が見つかりません"}, ensure_ascii=False),
            "headers": {"Content-Type": "application/json"}
        }
    
    # データ変換
    item = response['Item']
    weather_detail = {
        "cityId": int(item['CityId']['N']),
        "cityName": item['CityName']['S'],
        "weatherId": int(item['WeatherId']['N']),
        "weatherName": item['WeatherName']['S'],
        "rainfallProbability": int(item['RainfallProbability']['N'])
    }
    
    return {
        "statusCode": 200,
        "body": json.dumps(weather_detail, ensure_ascii=False),
        "headers": {"Content-Type": "application/json"}
    }