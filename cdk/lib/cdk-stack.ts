import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 create Dynamodb table
    const table = new dynamodb.Table(this, id, {
      tableName: 'products',
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {name: 'id', type: dynamodb.AttributeType.STRING},
      pointInTimeRecovery: true,
    });

    console.log('table name 👉', table.tableName);
    console.log('table arn 👉', table.tableArn);
  }
}
