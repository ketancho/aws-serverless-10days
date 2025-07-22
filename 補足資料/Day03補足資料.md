Day3 のハンズオンに関する情報を掲載します。
動画にあわせて手を動かしていただくことを推奨していますが、もし「同じ手順を実施したはずなのに動かない..」となったときように、コピー＆ペーストしていただく用途で使っていただければと考えています。

# Day3-3 put_random_weather_function の修正
```py
    # return 文の前に追加する
    print('Update: ' + city_name + ' to ' + weather_name)
```

# Day3-6 update_weather_from_csv_function
```py
import json
import urllib.parse
import boto3

print('Loading function')

s3 = boto3.client('s3')
dynamodb_client = boto3.client('dynamodb') ###

def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        #print("CONTENT TYPE: " + response['ContentType'])
        
        ###
        weather_info_list = response['Body'].read().decode('utf-8').splitlines()
        for weather_info in weather_info_list:
            weather_info = weather_info.split(',')
            dynamodb_client.put_item(
                TableName='simple-weather-news-table',
                Item={
                    'CityId': {
                        'N': weather_info[0],
                    },
                    'CityName': {
                        'S': weather_info[1],
                    },
                    'WeatherId': {
                        'N': weather_info[2],
                    },
                    'WeatherName': {
                        'S': weather_info[3],
                    },
                    'RainfallProbability': {
                        'N': weather_info[4],
                    },
                },
            )
        ###
        
        return response['ContentType']
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
```

# Day3 のまとめ
## 落ち穂拾い: DynamoDB テーブルへの一括書き込みについて
### Table.batch_writer
https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/programming-with-python.html
### 一括取り込みソリューション
https://aws.amazon.com/jp/blogs/news/implementing-bulk-csv-ingestion-to-amazon-dynamodb/
