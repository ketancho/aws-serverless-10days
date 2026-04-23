Day7 のハンズオンに関する情報を掲載します。

# Day7-3
## Bedrock のお試し文言
```
天気予報のアナウンス原稿を作りたいです。「今日の天気は全国的に〜」から始めて、150文字前後の原稿を作ってください。途中で途切れないようにしてください。
```

## StepFunctions の Bedrock InvokeModel への入力

### Bedrock のモデル選択について（2026/04/23 更新）
* 本ハンズオンでは Claude 3 Haiku を利用していましたが、2026年3月にレガシーフェーズに移行しました。
* そのため、今後は Claude Haiku 4.5 を利用してハンズオンを進めていきますが、その際、推論プロファイルという仕組みが導入されたことに合わせて、StepFunctions におけるモデルの指定方法が変更になっています。
* Day7-3 の 9:30~9:40 あたりの作業の補足資料を用意していますので、講座の「リソース」からダウンロードしてご覧ください。

モデル ID 欄には
`global.anthropic.claude-haiku-4-5-20251001-v1:0`
を入力いただくようお願いいたします。

### messages.content.text の鉛筆マークでの入力
```
"この天気予報データから、天気予報のアナウンス原稿を作りたいです。「今日の天気は全国的に〜」から始めて、150文字前後の原稿を作ってください。途中で途切れないようにしてください。天気予報データ：" & $states.input.Items
```
### 参考: Bedrock モデルパラメータ JSON 全文
※ 一部の `"` が `/"` にエスケープされていることにご注意ください
```json
{
  "anthropic_version": "bedrock-2023-05-31",
  "max_tokens": 200,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "{% \"この天気予報データから、天気予報のアナウンス原稿を作りたいです。「今日の天気は全国的に〜」から始めて、150文字前後の原稿を作ってください。途中で途切れないようにしてください。天気予報データ:\" & $states.input.Items %}"
        }
      ]
    }
  ]
}
```

# Day7-4
## TranslateText State の　引数への入力
```json
{
  "SourceLanguageCode": "ja",
  "TargetLanguageCode": "en",
  "Text": "{% $states.input.Body.content.text %}"
}
```

# Day7-5
## AWS CLI で S3 バケットを作成する
※ BUCKET_NAME="your-bucket-name" の `your-bucket-name` は皆さまのユニークなバケット名に置き換える必要がある点にご注意ください
```bash
BUCKET_NAME="your-bucket-name"
# 1. S3バケット作成
aws s3api create-bucket --bucket $BUCKET_NAME --create-bucket-configuration LocationConstraint=ap-northeast-1
# 2. パブリックアクセスブロック設定を無効化
aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
# 3. 静的ウェブサイトホスティング有効化
aws s3api put-bucket-website --bucket $BUCKET_NAME --website-configuration '{"IndexDocument":{"Suffix":"list.html"},"ErrorDocument":{"Key":"list.html"}}'
# 4. バケットポリシー設定
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"PublicReadGetObject\",\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::$BUCKET_NAME/*\"}]}"
# 5. voice-news フォルダ作成
aws s3api put-object --bucket $BUCKET_NAME --key voice-news/
```

# Day7-6
## StartSpeechSynthesisTask ステートの引数 JSON
※ `your-bucket-name` は皆さまのユニークなバケット名に置き換える必要がある点にご注意ください
```json
{
  "OutputFormat": "mp3",
  "OutputS3BucketName": "your-bucket-name",
  "OutputS3KeyPrefix": "voice-news/",
  "Text": "{% $states.input.Body.content.text %}",
  "VoiceId": "Takumi"
}
```
## CobyObject ステートの引数 JSON
※ `your-bucket-name` は皆さまのユニークなバケット名に置き換える必要がある点にご注意ください
```json
{
  "Bucket": "your-bucket-name",
  "CopySource": "{% $states.input.SynthesisTask.OutputUri %}",
  "Key": "voice-news/voice-news.mp3"
}
```

# Day7-7
## Choice State の Condition
```
{% ($states.input.SynthesisTask.TaskStatus) = ("completed") %}
```