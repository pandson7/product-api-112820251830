# Product API System - Architecture Diagrams

This document contains the AWS architecture diagrams generated for the Product API System based on the technical design specifications.

## Generated Diagrams

### 1. High-Level Architecture Diagram
**File:** `product-api-architecture.png`
**Description:** Shows the overall system architecture with main components:
- User/Client interaction
- API Gateway as the entry point
- Lambda functions for business logic
- DynamoDB for data persistence
- CloudWatch for monitoring and logging

### 2. Detailed Architecture Diagram
**File:** `product-api-detailed.png`
**Description:** Provides a comprehensive view including:
- Client layer (Web and Mobile clients)
- API Gateway with specific endpoints
- Lambda functions with runtime specifications
- DynamoDB table configuration
- IAM roles and permissions
- Monitoring and logging components

### 3. Data Flow Diagram
**File:** `product-api-dataflow.png`
**Description:** Illustrates the request/response flow for both API endpoints:
- GET /products - Lists all products using DynamoDB Scan
- GET /products/{id} - Retrieves specific product using DynamoDB GetItem

## System Components

### API Gateway
- REST API with CORS enabled
- Two main endpoints:
  - `GET /products` - List all products
  - `GET /products/{id}` - Get specific product by ID

### Lambda Functions
- **Runtime:** Node.js 18.x
- **Memory:** 256 MB
- **Timeout:** 30 seconds
- **Functions:**
  - `getProducts` - Handles product listing
  - `getProductById` - Handles single product retrieval

### DynamoDB Table
- **Table Name:** Products
- **Partition Key:** product_id (String)
- **Billing Mode:** On-demand
- **Operations:** Scan (list all), GetItem (get by ID)

### Security & Monitoring
- IAM roles with least-privilege access
- CloudWatch Logs for function execution
- CloudWatch Metrics for performance monitoring
- No authentication required (prototype system)

## File Locations
All diagrams are stored in: `/home/pandson/echo-architect-artifacts/product-api-112820251830/generated-diagrams/generated-diagrams/`

## Architecture Principles
- Serverless architecture for scalability
- On-demand billing for cost optimization
- Separation of concerns with dedicated Lambda functions
- Comprehensive monitoring and logging
- RESTful API design patterns
