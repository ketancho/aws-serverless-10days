Day1 の各動画で作成する Lambda 関数の模範解答（？）的なものを掲載します。
動画にあわせて手を動かしていただくことを推奨していますが、もし「同じ実装なはずなのに動かない..」となったときように、コピー＆ペーストしていただく用途で使っていただければと考えています。

# Day1-2 sample-lambda-function の実装
```py
import json

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda!') # Update
    }
```

# Day1-3 sample-lambda-function の実装
## event や context の確認
```py
import json

def lambda_handler(event, context):
    print(event) # Update
    print(context) # Update
    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda!')
    }
```

## event の値を利用する
```py
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda! - ' + event['msg'])
    }
```
```json
{
  "msg": "aws-serverless-10days!!"
}
```

# Day1-4 sample-lambda-function の実装
```py
import os # Update
import json
import boto3

KEY = os.environ['KEY'] # Update

def lambda_handler(event, context):

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda! - ' + KEY) # Update
    }
```

# Day1-5 sample-lambda-function の実装
```py
import json
import boto3
import time # Update

def lambda_handler(event, context):

    time.sleep(5) # Update

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda! - ' + event['msg'])
    }
```

# Day1-6 sample-lambda-function の実装
```py
import json
import boto3

translate_client = boto3.client('translate')

def lambda_handler(event, context):

    response = translate_client.translate_text(
        Text='サーバーレスに入門しています！',
        SourceLanguageCode='ja',
        TargetLanguageCode='en',
    )
    print(response['TranslatedText'])

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda!')
    }
```

# Day1-7 sample-lambda-function の実装
```py
import json
import boto3
from datetime import datetime, timedelta, timezone

JST = timezone(timedelta(hours=+9), 'JST')
now = datetime.now(JST).strftime("%Y%m%d%H%M%S") # Update

def lambda_handler(event, context):

    # now = datetime.now(JST).strftime("%Y%m%d%H%M%S") # Update

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda! - ' + now)
    }
```