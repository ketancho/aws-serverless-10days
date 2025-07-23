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

## CloudShell 上での作業コマンド

### vim の初期設定
```bash
vim ~/.vimrc
```
i を押し、挿入モードにした上で、下記のように記入し、 ESC + :wq + Enter で保存
```
set tabstop=2
```

### GitHub からフロントエンドコードの雛形を取得し、作業用ディレクトリに配置、皆さまの S3 バケットにホスティング
```bash
git clone https://github.com/ketancho/aws-serverless-10days.git
mkdir work
cp -r aws-serverless-10days/Day05/simple_weather_admin/Day05-01/* work/
cd work
aws s3 sync . s3://your-bucket-name/

# もし上手く動かなくなった場合、DayNN-NN終了断面に戻したい場合に使用するコマンド
# （最後のコマンドの DayNN-NN-end の NN 部分を具体的な数字に置き換えてください。例：Day5-2終了断面に戻したい場合は、Day05-02-end）
#cd ~
#rm -r work/*
#cp -r aws-serverless-10days/Day05/simple_weather_admin/DayNN-NN-end/* work/
```

# Day5-2 

```bash
cd ~/work
vim list.html
vim js/config.js 
aws s3 sync . s3://your-bucket-name/
```

# Day5-3 

# Day5-4 

# Day5-5 

