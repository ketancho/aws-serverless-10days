Day1 の各動画で作成する Lambda 関数のソースコードを掲載します。
動画にあわせてハンズオンを進めていただいたときに、もし「同じ実装をしたはずなのにうまく動かない..」となってしまったときに、参考にしていただければと思います。

# Day1-2 sample-lambda-function の実装
```py
import json

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda!') # ' で囲まれている文字列を一部修正
    }
```

# Day1-3 sample-lambda-function の実装
## event や context の確認
```py
import json

def lambda_handler(event, context):
    print(event) # 追加 -> ログを確認
    print(context) # 追加 -> ログを確認
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
        'body': json.dumps('Hello World from Lambda! - ' + event['msg']) # 末尾を修正
    }
```
```json
{
  "msg": "aws-serverless-10days"
}
```

# Day1-4 sample-lambda-function の実装
```py
import os # 追加
import json

API_KEY = os.environ['KEY'] # 追加

def lambda_handler(event, context):

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda! - ' + API_KEY) # 末尾を修正
    }
```

# Day1-5 sample-lambda-function の実装
```py
import json
import time # 追加

def lambda_handler(event, context):

    time.sleep(5) # 追加

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda!') # 末尾を修正
    }
```

# Day1-6 sample-lambda-function の実装
```py
import json
import boto3 # 追加

translate_client = boto3.client('translate') # 追加

def lambda_handler(event, context):

    # 追加（ここから）
    response = translate_client.translate_text(
        Text='サーバーレスに入門しています！',
        SourceLanguageCode='ja',
        TargetLanguageCode='en',
    )
    print(response['TranslatedText'])
    # 追加（ここまで）

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda!')
    }
```

# Day1-7 sample-lambda-function の実装
```py
import json
import boto3
from datetime import datetime, timedelta, timezone # 追加

JST = timezone(timedelta(hours=+9), 'JST') # 追加
now = datetime.now(JST).strftime("%Y%m%d%H%M%S") # 追加

def lambda_handler(event, context):

    # now = datetime.now(JST).strftime("%Y%m%d%H%M%S") # 追加

    return {
        'statusCode': 200,
        'body': json.dumps('Hello World from Lambda! - ' + now) # 末尾を修正
    }
```