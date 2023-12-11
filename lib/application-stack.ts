import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
   

    // define the Lambda function
    const hello = new lambda.Function(this, 'HelloHandler', {
        runtime: lambda.Runtime.NODEJS_16_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
        downstream: hello
    });

    // define API GW for the Lambda function
    new apigw.LambdaRestApi(this, 'Endpoint', {
        handler: hello
    })
  }
}

export interface HitCounterProps {
    downstream: lambda.IFunction;
}

export class HitCounter extends Construct {

    // allow access counter function
    public readonly handler: lambda.Function;

    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        // const dbTableName = ssm.StringParameter.fromStringParameterName(
        //     this, 'dbTableName', 'dbTableName',
        // );

        const dbTableName = ssm.StringParameter.fromStringParameterName(this, 'dbTableName', 'CFN-tableName902E7F8C-XuwnqEe1jX1c')

        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: dbTableName.stringValue
            }
        })
        
    }
}