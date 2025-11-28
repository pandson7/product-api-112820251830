#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ProductApiStack112820251830 } from '../lib/cdk-app-stack';

const app = new cdk.App();
new ProductApiStack112820251830(app, 'ProductApiStack112820251830', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
