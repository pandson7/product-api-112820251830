import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class ProductApiStack112820251830 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = '112820251830';

    // DynamoDB Table
    const productsTable = new dynamodb.Table(this, `ProductsTable${suffix}`, {
      tableName: `Products${suffix}`,
      partitionKey: {
        name: 'product_id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Enable auto scaling
    productsTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });

    productsTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });

    // Lambda Functions
    const getProductsFunction = new lambda.Function(this, `GetProductsFunction${suffix}`, {
      functionName: `getProducts${suffix}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
        const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);

        exports.handler = async (event) => {
          console.log('Event:', JSON.stringify(event, null, 2));
          
          try {
            const result = await docClient.send(new ScanCommand({
              TableName: process.env.TABLE_NAME
            }));
            
            return {
              statusCode: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
              },
              body: JSON.stringify(result.Items || [])
            };
          } catch (error) {
            console.error('Error:', error);
            return {
              statusCode: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ error: 'Internal server error' })
            };
          }
        };
      `),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
    });

    const getProductByIdFunction = new lambda.Function(this, `GetProductByIdFunction${suffix}`, {
      functionName: `getProductById${suffix}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
        const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);

        exports.handler = async (event) => {
          console.log('Event:', JSON.stringify(event, null, 2));
          
          const productId = event.pathParameters?.id;
          
          if (!productId) {
            return {
              statusCode: 400,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ error: 'Product ID is required' })
            };
          }
          
          try {
            const result = await docClient.send(new GetCommand({
              TableName: process.env.TABLE_NAME,
              Key: { product_id: productId }
            }));
            
            if (!result.Item) {
              return {
                statusCode: 404,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Product not found' })
              };
            }
            
            return {
              statusCode: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
              },
              body: JSON.stringify(result.Item)
            };
          } catch (error) {
            console.error('Error:', error);
            return {
              statusCode: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ error: 'Internal server error' })
            };
          }
        };
      `),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
    });

    // Grant DynamoDB permissions
    productsTable.grantReadData(getProductsFunction);
    productsTable.grantReadData(getProductByIdFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, `ProductApi${suffix}`, {
      restApiName: `ProductApi${suffix}`,
      description: 'Product API for accessing product specifications',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      },
    });

    // API Resources and Methods
    const productsResource = api.root.addResource('products');
    
    // GET /products
    productsResource.addMethod('GET', new apigateway.LambdaIntegration(getProductsFunction));
    
    // GET /products/{id}
    const productByIdResource = productsResource.addResource('{id}');
    productByIdResource.addMethod('GET', new apigateway.LambdaIntegration(getProductByIdFunction));

    // Sample Data Population Lambda
    const populateDataFunction = new lambda.Function(this, `PopulateDataFunction${suffix}`, {
      functionName: `populateData${suffix}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
        const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);

        const sampleProducts = [
          {
            product_id: 'PROD001',
            name: 'iPhone 15 Pro',
            category: 'Electronics',
            brand: 'Apple',
            attributes: {
              price: 999.99,
              description: 'Latest iPhone with advanced camera system',
              specifications: {
                storage: '256GB',
                color: 'Natural Titanium',
                display: '6.1-inch Super Retina XDR'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD002',
            name: 'MacBook Air M3',
            category: 'Computers',
            brand: 'Apple',
            attributes: {
              price: 1299.99,
              description: 'Lightweight laptop with M3 chip',
              specifications: {
                processor: 'Apple M3',
                memory: '16GB',
                storage: '512GB SSD'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD003',
            name: 'Samsung Galaxy S24',
            category: 'Electronics',
            brand: 'Samsung',
            attributes: {
              price: 899.99,
              description: 'Flagship Android smartphone',
              specifications: {
                storage: '256GB',
                color: 'Phantom Black',
                display: '6.2-inch Dynamic AMOLED'
              },
              availability: false
            }
          },
          {
            product_id: 'PROD004',
            name: 'Nike Air Max 270',
            category: 'Footwear',
            brand: 'Nike',
            attributes: {
              price: 150.00,
              description: 'Comfortable running shoes',
              specifications: {
                size: '10.5',
                color: 'Black/White',
                material: 'Mesh and synthetic'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD005',
            name: 'Sony WH-1000XM5',
            category: 'Audio',
            brand: 'Sony',
            attributes: {
              price: 399.99,
              description: 'Noise-canceling wireless headphones',
              specifications: {
                battery: '30 hours',
                connectivity: 'Bluetooth 5.2',
                weight: '250g'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD006',
            name: 'Dell XPS 13',
            category: 'Computers',
            brand: 'Dell',
            attributes: {
              price: 1199.99,
              description: 'Ultra-portable laptop',
              specifications: {
                processor: 'Intel Core i7',
                memory: '16GB',
                display: '13.4-inch FHD+'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD007',
            name: 'Adidas Ultraboost 22',
            category: 'Footwear',
            brand: 'Adidas',
            attributes: {
              price: 180.00,
              description: 'Premium running shoes',
              specifications: {
                size: '9',
                color: 'Core Black',
                technology: 'Boost midsole'
              },
              availability: false
            }
          },
          {
            product_id: 'PROD008',
            name: 'iPad Pro 12.9',
            category: 'Tablets',
            brand: 'Apple',
            attributes: {
              price: 1099.99,
              description: 'Professional tablet with M2 chip',
              specifications: {
                storage: '256GB',
                display: '12.9-inch Liquid Retina XDR',
                connectivity: 'Wi-Fi + Cellular'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD009',
            name: 'Bose QuietComfort Earbuds',
            category: 'Audio',
            brand: 'Bose',
            attributes: {
              price: 279.99,
              description: 'True wireless earbuds with noise cancellation',
              specifications: {
                battery: '6 hours + 12 hours case',
                waterproof: 'IPX4',
                controls: 'Touch'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD010',
            name: 'Microsoft Surface Laptop 5',
            category: 'Computers',
            brand: 'Microsoft',
            attributes: {
              price: 1299.99,
              description: 'Premium Windows laptop',
              specifications: {
                processor: 'Intel Core i7',
                memory: '16GB',
                display: '13.5-inch PixelSense'
              },
              availability: true
            }
          },
          {
            product_id: 'PROD011',
            name: 'Canon EOS R6 Mark II',
            category: 'Cameras',
            brand: 'Canon',
            attributes: {
              price: 2499.99,
              description: 'Full-frame mirrorless camera',
              specifications: {
                resolution: '24.2MP',
                video: '4K 60fps',
                stabilization: '8-stop IBIS'
              },
              availability: false
            }
          },
          {
            product_id: 'PROD012',
            name: 'Levis 501 Original Jeans',
            category: 'Clothing',
            brand: 'Levis',
            attributes: {
              price: 89.99,
              description: 'Classic straight-leg jeans',
              specifications: {
                size: '32x32',
                color: 'Dark Wash',
                material: '100% Cotton'
              },
              availability: true
            }
          }
        ];

        exports.handler = async (event) => {
          console.log('Populating sample data...');
          
          try {
            for (const product of sampleProducts) {
              await docClient.send(new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: product
              }));
            }
            
            console.log('Sample data populated successfully');
            return {
              statusCode: 200,
              body: JSON.stringify({ message: 'Sample data populated successfully' })
            };
          } catch (error) {
            console.error('Error populating data:', error);
            throw error;
          }
        };
      `),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
    });

    // Grant write permissions for data population
    productsTable.grantWriteData(populateDataFunction);

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'Product API URL',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: productsTable.tableName,
      description: 'DynamoDB Table Name',
    });

    new cdk.CfnOutput(this, 'PopulateDataFunctionName', {
      value: populateDataFunction.functionName,
      description: 'Function to populate sample data',
    });
  }
}
