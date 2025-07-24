import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class SimpleWeatherNewsCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda関数1: 全天気データ取得（閲覧者用）
    const getAllWeatherPublicFunction = new lambda.Function(this, 'GetAllWeatherPublicFunction', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('lambda/get_all_weather_public'),
      functionName: 'get_all_weather_public_function'
    });

    // Lambda関数2: 特定都市の天気データ取得（閲覧者用）
    const getCityWeatherPublicFunction = new lambda.Function(this, 'GetCityWeatherPublicFunction', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('lambda/get_city_weather_public'),
      functionName: 'get_city_weather_public_function'
    });

    // DynamoDB読み取り権限をLambda関数に付与
    const dynamoDbPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'dynamodb:Scan',
        'dynamodb:GetItem'
      ],
      resources: [
        'arn:aws:dynamodb:*:*:table/simple-weather-table'
      ]
    });

    getAllWeatherPublicFunction.addToRolePolicy(dynamoDbPolicy);
    getCityWeatherPublicFunction.addToRolePolicy(dynamoDbPolicy);
  }
}