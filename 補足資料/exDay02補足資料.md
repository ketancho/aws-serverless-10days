exDay02 のハンズオンに関する情報を掲載します。

# エラー出力する Lambda 関数を作成する

```python
import json

def lambda_handler(event, context):
    
    msg = event.get('msg')

    if msg is None:
        print('[ERROR] msg is not specified')
        return {'statusCode': 400}

    return {
        'statusCode': 200,
        'body': json.dumps({'msg': msg})
    }
```