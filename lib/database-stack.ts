import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ssm from 'aws-cdk-lib/aws-ssm'

export class DatabaseStack extends cdk.Stack {
  public readonly table: dynamodb.Table;  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.table = new dynamodb.Table(this, 'Hits', {
        partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    })

    new cdk.CfnOutput(this, 'TableName', {
        value: this.table.tableName
    })

    new ssm.StringParameter(
      this, 'tableName', {
        stringValue: this.table.tableName,
      }
    )

  }
}
