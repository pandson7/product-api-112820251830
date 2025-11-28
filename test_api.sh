#!/bin/bash

# Product API Testing Script
# Tests all endpoints and validates responses

API_BASE_URL="https://oozz7tf9o6.execute-api.us-east-1.amazonaws.com/prod"

echo "=== Product API Testing Script ==="
echo "Base URL: $API_BASE_URL"
echo ""

# Test 1: GET /products - List all products
echo "Test 1: GET /products (List all products)"
echo "Request: curl -X GET \"$API_BASE_URL/products\""
response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$API_BASE_URL/products")
http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
body=$(echo $response | sed -e 's/HTTPSTATUS\:.*//g')

if [ $http_code -eq 200 ]; then
    echo "✅ Status: $http_code (OK)"
    product_count=$(echo $body | jq '. | length')
    echo "✅ Product count: $product_count"
    echo "Sample product:"
    echo $body | jq '.[0]'
else
    echo "❌ Status: $http_code (Expected: 200)"
    echo "Response: $body"
fi
echo ""

# Test 2: GET /products/{id} - Valid product ID
echo "Test 2: GET /products/PROD001 (Valid product ID)"
echo "Request: curl -X GET \"$API_BASE_URL/products/PROD001\""
response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$API_BASE_URL/products/PROD001")
http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
body=$(echo $response | sed -e 's/HTTPSTATUS\:.*//g')

if [ $http_code -eq 200 ]; then
    echo "✅ Status: $http_code (OK)"
    product_name=$(echo $body | jq -r '.name')
    echo "✅ Product name: $product_name"
    echo "Product details:"
    echo $body | jq '.'
else
    echo "❌ Status: $http_code (Expected: 200)"
    echo "Response: $body"
fi
echo ""

# Test 3: GET /products/{id} - Invalid product ID
echo "Test 3: GET /products/INVALID (Invalid product ID)"
echo "Request: curl -X GET \"$API_BASE_URL/products/INVALID\""
response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$API_BASE_URL/products/INVALID")
http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
body=$(echo $response | sed -e 's/HTTPSTATUS\:.*//g')

if [ $http_code -eq 404 ]; then
    echo "✅ Status: $http_code (Not Found - Expected)"
    error_message=$(echo $body | jq -r '.error')
    echo "✅ Error message: $error_message"
else
    echo "❌ Status: $http_code (Expected: 404)"
    echo "Response: $body"
fi
echo ""

# Test 4: Performance test - Response time
echo "Test 4: Performance test (Response time)"
echo "Request: curl -X GET \"$API_BASE_URL/products\""
start_time=$(date +%s.%N)
curl -s "$API_BASE_URL/products" > /dev/null
end_time=$(date +%s.%N)
response_time=$(echo "$end_time - $start_time" | bc)

echo "✅ Response time: ${response_time}s"
if (( $(echo "$response_time < 2.0" | bc -l) )); then
    echo "✅ Performance: Under 2 seconds (Requirement met)"
else
    echo "❌ Performance: Over 2 seconds (Requirement not met)"
fi
echo ""

# Test 5: CORS headers
echo "Test 5: CORS headers validation"
echo "Request: curl -I \"$API_BASE_URL/products\""
headers=$(curl -s -I "$API_BASE_URL/products")
cors_origin=$(echo "$headers" | grep -i "access-control-allow-origin" | wc -l)
cors_methods=$(echo "$headers" | grep -i "access-control-allow-methods" | wc -l)

if [ $cors_origin -gt 0 ] && [ $cors_methods -gt 0 ]; then
    echo "✅ CORS headers present"
    echo "$headers" | grep -i "access-control"
else
    echo "❌ CORS headers missing"
fi
echo ""

# Test 6: Test multiple product categories
echo "Test 6: Validate product categories"
echo "Request: curl -X GET \"$API_BASE_URL/products\""
products=$(curl -s "$API_BASE_URL/products")
categories=$(echo $products | jq -r '.[].category' | sort | uniq)
category_count=$(echo $categories | wc -w)

echo "✅ Product categories found: $category_count"
echo "Categories:"
echo "$categories" | tr ' ' '\n' | sed 's/^/  - /'
echo ""

# Test 7: Validate mandatory fields
echo "Test 7: Validate mandatory fields in products"
echo "Request: curl -X GET \"$API_BASE_URL/products\""
products=$(curl -s "$API_BASE_URL/products")
first_product=$(echo $products | jq '.[0]')

required_fields=("product_id" "name" "category" "brand")
all_fields_present=true

for field in "${required_fields[@]}"; do
    field_value=$(echo $first_product | jq -r ".$field")
    if [ "$field_value" != "null" ] && [ "$field_value" != "" ]; then
        echo "✅ Field '$field': $field_value"
    else
        echo "❌ Field '$field': Missing or null"
        all_fields_present=false
    fi
done

if [ "$all_fields_present" = true ]; then
    echo "✅ All mandatory fields present"
else
    echo "❌ Some mandatory fields missing"
fi
echo ""

# Test 8: Flexible schema validation
echo "Test 8: Validate flexible schema (attributes field)"
echo "Request: curl -X GET \"$API_BASE_URL/products/PROD001\""
product=$(curl -s "$API_BASE_URL/products/PROD001")
attributes=$(echo $product | jq '.attributes')

if [ "$attributes" != "null" ]; then
    echo "✅ Attributes field present"
    echo "Sample attributes:"
    echo $attributes | jq '.'
else
    echo "❌ Attributes field missing"
fi
echo ""

echo "=== Test Summary ==="
echo "All tests completed. Review results above for any failures."
echo "API Base URL: $API_BASE_URL"
echo "DynamoDB Table: Products112820251830"
echo "Lambda Functions: getProducts112820251830, getProductById112820251830"
