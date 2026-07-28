exDay01 のハンズオンに関する情報を掲載します。

# 設定値をハードコーディングした Lambda 関数を作成

```python
import json

def lambda_handler(event, context):

    API_KEY = 'ABCD1234567890'

    return {
        'statusCode': 200,
        'body': json.dumps({'apiKey': API_KEY})
    }
```

# 環境変数を利用する形に Lambda 関数を修正する

```python
import json
import os

def lambda_handler(event, context):

    API_KEY = os.environ['API_KEY']

    return {
        'statusCode': 200,
        'body': json.dumps({'apiKey': API_KEY})
    }
```

# AWS Systems Manager の Parameter Store を利用する形に修正する

```python
import json
import boto3

ssm_client = boto3.client('ssm')

def lambda_handler(event, context):

    response = ssm_client.get_parameter(
        Name='/SLS10Days/ExDay01/api-key',
        WithDecryption=True
    )

    API_KEY = response['Parameter']['Value']

    return {
        'statusCode': 200,
        'body': json.dumps({'apiKey': API_KEY})
    }
```
