Day4 のハンズオンに関する情報を掲載します。
動画にあわせて手を動かしていただくことを推奨していますが、もし「同じ手順を実施したはずなのに動かない..」となったときように、コピー＆ペーストしていただく用途で使っていただければと考えています。

Day2 のハンズオンのコピー＆ペースト用コマンドリストです。
任意での実行のものも含めています。動画にあわせてご活用ください。

# Day5-1 

## バケットポリシー
`Bucket-Name` の部分を皆さまが作成した S3 バケット名に変更してください。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::Bucket-Name/*"
            ]
        }
    ]
}
```

```bash
git clone https://github.com/ketancho/aws-serverless-10days.git
mkdir work
cp -r aws-serverless-10days/Day05/simple_weather_admin/Day05-01/* work/
cd work
aws s3 sync . s3://your-bucket-name/

# もし上手く動かなくなった場合、DayNN-NN断面に戻したい場合
cd ~
rm -r work/*
cp -r aws-serverless-10days/Day05/simple_weather_admin/[DayNN-NN]/* work/
```

# Day5-2 

# Day5-3 

# Day5-4 

# Day5-5 

