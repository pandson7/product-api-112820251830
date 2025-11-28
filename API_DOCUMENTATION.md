# Product API Documentation

## Overview
The Product API System provides RESTful endpoints to access product specifications stored in DynamoDB. The API supports flexible JSON schema for product attributes and includes comprehensive sample data.

## Base URL
```
https://oozz7tf9o6.execute-api.us-east-1.amazonaws.com/prod/
```

## Endpoints

### GET /products
Retrieve all products from the database.

**Request:**
```bash
curl -X GET "https://oozz7tf9o6.execute-api.us-east-1.amazonaws.com/prod/products"
```

**Response (200 OK):**
```json
[
  {
    "product_id": "PROD001",
    "name": "iPhone 15 Pro",
    "category": "Electronics",
    "brand": "Apple",
    "attributes": {
      "price": 999.99,
      "description": "Latest iPhone with advanced camera system",
      "specifications": {
        "storage": "256GB",
        "color": "Natural Titanium",
        "display": "6.1-inch Super Retina XDR"
      },
      "availability": true
    }
  }
]
```

### GET /products/{id}
Retrieve a specific product by its ID.

**Request:**
```bash
curl -X GET "https://oozz7tf9o6.execute-api.us-east-1.amazonaws.com/prod/products/PROD001"
```

**Response (200 OK):**
```json
{
  "product_id": "PROD001",
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "brand": "Apple",
  "attributes": {
    "price": 999.99,
    "description": "Latest iPhone with advanced camera system",
    "specifications": {
      "storage": "256GB",
      "color": "Natural Titanium",
      "display": "6.1-inch Super Retina XDR"
    },
    "availability": true
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Product not found"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Product ID is required"
}
```

## Product Schema

### Mandatory Fields
- `product_id` (String): Unique identifier for the product
- `name` (String): Product name
- `category` (String): Product category
- `brand` (String): Product brand

### Optional Attributes
- `attributes` (Object): Flexible JSON object containing:
  - `price` (Number): Product price
  - `description` (String): Product description
  - `specifications` (Object): Technical specifications
  - `availability` (Boolean): Product availability status

## Sample Data Categories
The API includes 12 sample products across diverse categories:
- Electronics (iPhone, Samsung Galaxy)
- Computers (MacBook, Dell XPS, Microsoft Surface)
- Audio (Sony headphones, Bose earbuds)
- Footwear (Nike, Adidas)
- Tablets (iPad Pro)
- Cameras (Canon EOS)
- Clothing (Levis jeans)

## Error Handling

### HTTP Status Codes
- `200 OK`: Successful request
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

### Error Response Format
```json
{
  "error": "Error description"
}
```

## CORS Support
The API includes CORS headers for web client access:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`

## Performance
- Average response time: < 500ms
- DynamoDB auto-scaling enabled
- Lambda functions optimized for performance
