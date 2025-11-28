# Product API System

A comprehensive AWS-based product management API system built with AWS CDK, featuring DynamoDB storage, Lambda functions, and API Gateway integration.

## 🏗️ Architecture Overview

This system provides a complete product management solution with the following components:

- **API Gateway**: RESTful API endpoints for product operations
- **Lambda Functions**: Serverless compute for business logic
- **DynamoDB**: NoSQL database for product data storage
- **CloudWatch**: Monitoring and logging
- **IAM**: Security and access control

## 📁 Project Structure

```
product-api-112820251830/
├── cdk-app/                    # AWS CDK Infrastructure Code
│   ├── lib/                    # CDK Stack definitions
│   ├── bin/                    # CDK App entry point
│   ├── test/                   # Unit tests
│   └── package.json            # Dependencies
├── specs/                      # Project specifications
│   ├── requirements.md         # Functional requirements
│   ├── design.md              # System design
│   └── tasks.md               # Implementation tasks
├── generated-diagrams/         # Architecture diagrams
├── pricing/                    # Cost analysis reports
├── tasks/                      # Task definitions
├── API_DOCUMENTATION.md        # API endpoint documentation
├── PROJECT_SUMMARY.md          # Project overview
├── jira-stories-summary.md     # User stories
└── test_api.sh                # API testing script
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- AWS CLI configured
- AWS CDK CLI installed (`npm install -g aws-cdk`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-api-112820251830
   ```

2. **Install dependencies**
   ```bash
   cd cdk-app
   npm install
   ```

3. **Deploy the infrastructure**
   ```bash
   cdk bootstrap  # First time only
   cdk deploy
   ```

### Testing

Run the included test script to verify API functionality:
```bash
chmod +x test_api.sh
./test_api.sh
```

## 📊 API Endpoints

The system provides the following REST API endpoints:

- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/{id}` - Update existing product
- `DELETE /products/{id}` - Delete product

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

## 💰 Cost Analysis

Comprehensive cost analysis is available in the `pricing/` directory:

- **Monthly Estimate**: $15-25 for typical workloads
- **Key Cost Drivers**: Lambda invocations, DynamoDB operations, API Gateway requests
- **Optimization**: Auto-scaling and pay-per-use pricing model

See [detailed cost analysis](pricing/detailed_cost_analysis.md) for complete breakdown.

## 🏛️ Architecture Diagrams

Visual representations of the system architecture are available in `generated-diagrams/`:

- **System Architecture**: High-level component overview
- **Data Flow**: Request/response flow through components
- **Detailed Design**: In-depth technical architecture

## 🧪 Testing

The project includes comprehensive testing:

```bash
cd cdk-app
npm test
```

Test coverage includes:
- Unit tests for Lambda functions
- CDK stack validation
- API endpoint testing

## 📋 Development Tasks

The project follows a structured development approach with tasks defined in:

- [Specification Task](tasks/specification_task.md)
- [Development Task](tasks/development_task.md)
- [Diagram Task](tasks/diagram_task.md)
- [Pricing Task](tasks/pricing_task.md)
- [Jira Task](tasks/jira_task.md)

## 🔧 Configuration

Key configuration files:

- `cdk-app/cdk.json` - CDK configuration
- `cdk-app/package.json` - Node.js dependencies
- `cdk-app/tsconfig.json` - TypeScript configuration

## 📈 Monitoring

The system includes built-in monitoring via CloudWatch:

- Lambda function metrics
- API Gateway request/response metrics
- DynamoDB performance metrics
- Custom application logs

## 🔒 Security

Security features implemented:

- IAM roles with least privilege access
- API Gateway authentication/authorization
- DynamoDB encryption at rest
- CloudWatch audit logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues:

1. Check the [API Documentation](API_DOCUMENTATION.md)
2. Review the [Project Summary](PROJECT_SUMMARY.md)
3. Examine the [Jira Stories](jira-stories-summary.md)

## 🏷️ Tags

`aws` `cdk` `lambda` `dynamodb` `api-gateway` `serverless` `typescript` `nodejs` `rest-api` `cloud-infrastructure`
