import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
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
    /* Day08-04
    const getCityWeatherPublicFunction = new lambda.Function(this, 'GetCityWeatherPublicFunction', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'index.lambda_handler',
      code: , //TODO(Day08-04)
      functionName: '' //TODO(Day08-04)
    });
    */

    // DynamoDB読み取り権限をLambda関数に付与
    const dynamoDbPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'dynamodb:Scan',
        'dynamodb:GetItem'
      ],
      resources: [
        'arn:aws:dynamodb:*:*:table/simple-weather-news-table'
      ]
    });

    getAllWeatherPublicFunction.addToRolePolicy(dynamoDbPolicy);
    //TODO(Day08-04)

    // HTTP API の追加
    /* Day10-01
    const httpApi = new apigatewayv2.HttpApi(this, 'WeatherPublicHttpApi', {
      apiName: 'simple-weather-api-public',
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [apigatewayv2.CorsHttpMethod.GET],
        allowHeaders: ['Content-Type'],
      },
    });
    */

    // GET /all エンドポイント
    /* Day10-01
    const getAllIntegration = new integrations.HttpLambdaIntegration('GetAllWeatherIntegration', getAllWeatherPublicFunction);
    httpApi.addRoutes({
      path: '/all',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: getAllIntegration,
    });
    */

    // GET /{cityId} エンドポイント
    /* Day10-02
    const getCityIntegration = new integrations.HttpLambdaIntegration('GetCityWeatherIntegration', ); //TODO(Day10-02)
    httpApi.addRoutes({
      path: '', //TODO(Day10-02)
      methods: [apigatewayv2.HttpMethod.GET],
      integration: , //TODO(Day10-02)
    });
    */
  }
}