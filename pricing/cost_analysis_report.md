# Product API System Cost Analysis Estimate Report

## Service Overview

Product API System is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- Standard ON DEMAND pricing model for all services
- US East (N. Virginia) region deployment
- Lambda functions: 256 MB memory, Node.js 18.x runtime
- DynamoDB on-demand billing mode
- API Gateway REST API without caching
- No data transfer costs between services in same region
- Average API response size of 2KB
- Average product record size of 1KB in DynamoDB

## Limitations and Exclusions

- Data transfer costs to/from internet
- CloudWatch Logs storage beyond free tier
- Development and testing costs
- Custom domain and SSL certificate costs
- Backup and restore costs for DynamoDB
- Lambda provisioned concurrency costs
- API Gateway caching costs

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| AWS Lambda | Requests | request | $0.0000002 | First 12 months: 1M requests/month and 400,000 GB-seconds/month free |
| AWS Lambda | Compute Tier 1 | GB-second (first 6B GB-seconds/month) | $0.0000166667 | First 12 months: 1M requests/month and 400,000 GB-seconds/month free |
| AWS Lambda | Compute Tier 2 | GB-second (next 9B GB-seconds/month) | $0.0000150000 | First 12 months: 1M requests/month and 400,000 GB-seconds/month free |
| AWS Lambda | Compute Tier 3 | GB-second (over 15B GB-seconds/month) | $0.0000133334 | First 12 months: 1M requests/month and 400,000 GB-seconds/month free |
| Amazon API Gateway | Requests Tier 1 | request (first 333M requests/month) | $0.0000035 | First 12 months: 1M API calls/month free |
| Amazon API Gateway | Requests Tier 2 | request (next 667M requests/month) | $0.0000028 | First 12 months: 1M API calls/month free |
| Amazon API Gateway | Requests Tier 3 | request (next 19B requests/month) | $0.0000238 | First 12 months: 1M API calls/month free |
| Amazon API Gateway | Requests Tier 4 | request (over 20B requests/month) | $0.0000151 | First 12 months: 1M API calls/month free |
| Amazon DynamoDB | Read Request Units | RRU ($0.125 per million RRUs) | $0.000000125 | Always free: 25 GB storage, 25 WRU, 25 RRU per month |
| Amazon DynamoDB | Write Request Units | WRU ($0.625 per million WRUs) | $0.000000625 | Always free: 25 GB storage, 25 WRU, 25 RRU per month |
| Amazon DynamoDB | Storage Free | GB-month (first 25 GB) | $0.00 | Always free: 25 GB storage, 25 WRU, 25 RRU per month |
| Amazon DynamoDB | Storage Paid | GB-month (beyond 25 GB) | $0.25 | Always free: 25 GB storage, 25 WRU, 25 RRU per month |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| AWS Lambda | 2 Lambda functions (getProducts, getProductById) with 256MB memory | Cost = (Requests × $0.0000002) + (GB-seconds × tier rate) | $0.00 - $2.50 |
| Amazon API Gateway | REST API with 2 endpoints (GET /products, GET /products/{id}) | Cost = Requests × tier rate (first 1M free in first 12 months) | $0.00 - $3.50 |
| Amazon DynamoDB | Single Products table with on-demand billing | Cost = (RRUs × $0.000000125) + (WRUs × $0.000000625) + (Storage beyond 25GB × $0.25) | $0.00 - $6.25 |

### Free Tier

Free tier information by service:
- **AWS Lambda**: First 12 months: 1M requests/month and 400,000 GB-seconds/month free
- **Amazon API Gateway**: First 12 months: 1M API calls/month free
- **Amazon DynamoDB**: Always free: 25 GB storage, 25 WRU, 25 RRU per month

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| AWS Lambda | Varies | Varies | Varies |
| Amazon API Gateway | Varies | Varies | Varies |
| Amazon DynamoDB | Varies | Varies | Varies |

### Key Cost Factors

- **AWS Lambda**: 2 Lambda functions (getProducts, getProductById) with 256MB memory
- **Amazon API Gateway**: REST API with 2 endpoints (GET /products, GET /products/{id})
- **Amazon DynamoDB**: Single Products table with on-demand billing

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Insufficient data to generate cost projections. See Custom Analysis Data section for available cost information.

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs to/from internet
- CloudWatch Logs storage beyond free tier
- Development and testing costs
- Custom domain and SSL certificate costs
- Backup and restore costs for DynamoDB
- Lambda provisioned concurrency costs
- API Gateway caching costs

### Recommendations

#### Immediate Actions

- Start with on-demand pricing for all services to minimize initial costs
- Monitor usage patterns for first 3 months to identify optimization opportunities
- Implement efficient DynamoDB query patterns to minimize RRU consumption
- Use Lambda function warming strategies if cold starts become an issue
- Consider API Gateway caching for frequently accessed product data



## Cost Optimization Recommendations

### Immediate Actions

- Start with on-demand pricing for all services to minimize initial costs
- Monitor usage patterns for first 3 months to identify optimization opportunities
- Implement efficient DynamoDB query patterns to minimize RRU consumption

### Best Practices

- Regularly review costs with AWS Cost Explorer
- Consider reserved capacity for predictable workloads
- Implement automated scaling based on demand

## Conclusion

By following the recommendations in this report, you can optimize your Product API System costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.
