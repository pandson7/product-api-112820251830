# Design Document

## Architecture Overview

The Product API System follows a serverless architecture pattern using AWS services. The system consists of API Gateway for request routing, Lambda functions for business logic, and DynamoDB for data persistence.

## System Components

### 1. API Gateway
- **Purpose**: HTTP endpoint exposure and request routing
- **Configuration**: REST API with CORS enabled
- **Endpoints**:
  - `GET /products` - List all products
  - `GET /products/{id}` - Get specific product by ID

### 2. Lambda Functions
- **Runtime**: Node.js 18.x
- **Functions**:
  - `getProducts` - Handles listing all products
  - `getProductById` - Handles single product retrieval
- **Memory**: 256 MB
- **Timeout**: 30 seconds

### 3. DynamoDB Table
- **Table Name**: `Products`
- **Partition Key**: `product_id` (String)
- **Billing Mode**: On-demand
- **Attributes**:
  - `product_id` (String) - Primary key
  - `name` (String) - Product name
  - `category` (String) - Product category
  - `brand` (String) - Product brand
  - `attributes` (Map) - Flexible JSON attributes

## Data Model

### Product Schema
```json
{
  "product_id": "string",
  "name": "string",
  "category": "string", 
  "brand": "string",
  "attributes": {
    "price": "number",
    "description": "string",
    "specifications": {},
    "availability": "boolean"
  }
}
```

## API Specification

### GET /products
- **Description**: Retrieve all products
- **Response**: Array of product objects
- **Status Codes**: 200 (Success), 500 (Server Error)

### GET /products/{id}
- **Description**: Retrieve specific product
- **Parameters**: `id` - Product identifier
- **Response**: Single product object
- **Status Codes**: 200 (Success), 404 (Not Found), 400 (Bad Request), 500 (Server Error)

## Infrastructure as Code

### CDK Stack Components
- **API Gateway**: REST API with resource and method definitions
- **Lambda Functions**: Node.js functions with DynamoDB permissions
- **DynamoDB Table**: Products table with on-demand billing
- **IAM Roles**: Lambda execution roles with DynamoDB access

## Security Considerations

- Lambda functions use least-privilege IAM roles
- DynamoDB access limited to required operations (GetItem, Scan)
- API Gateway configured with appropriate throttling
- No authentication required (prototype system)

## Performance Considerations

- DynamoDB on-demand scaling for variable workloads
- Lambda cold start mitigation through appropriate memory allocation
- API Gateway caching disabled for development simplicity
- Response payload optimization for JSON data

## Error Handling Strategy

- Structured error responses in JSON format
- Appropriate HTTP status codes for different scenarios
- Lambda function error logging to CloudWatch
- Graceful degradation for database connectivity issues

## Deployment Strategy

- Single CDK stack deployment
- Environment-specific configuration through CDK context
- Sample data initialization through CDK custom resource
- Local development support with CDK hotswap

## Monitoring and Logging

- CloudWatch Logs for Lambda function execution
- API Gateway access logging
- DynamoDB CloudWatch metrics
- Basic error tracking and alerting
