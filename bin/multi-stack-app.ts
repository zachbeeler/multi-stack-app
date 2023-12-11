#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NetworkingStack } from '../lib/networking-stack';
import { DatabaseStack } from '../lib/database-stack';
import { ApplicationStack } from '../lib/application-stack';

const app = new cdk.App();
const networking = new NetworkingStack(app, 'NetworkingStack', {
  
});

const database = new DatabaseStack(app, 'DatabaseStack', {

});

const application = new ApplicationStack(app, 'ApplicationStack', {
})


