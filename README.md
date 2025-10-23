# Express.js Products API - Week 2 Assignment

A complete RESTful API for managing products built with Express.js, MongoDB, and modern backend practices.

## 🚀 Features

- **Full CRUD Operations** - Create, Read, Update, Delete products
- **Authentication** - API key-based security for protected routes
- **Advanced Filtering** - Filter by category, stock status
- **Search Functionality** - Search products by name
- **Pagination** - Efficient data loading with page limits
- **Product Statistics** - Analytics and category insights
- **Input Validation** - Robust data validation middleware
- **Error Handling** - Custom error classes and global error handling
- **Logging** - Request logging middleware

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Body-parser** - Request body parsing
- **Dotenv** - Environment variables
- **UUID** - Unique identifier generation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Compass (local instance)
- Postman (for API testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd express-js-server-side-framework-glorymukami
Install dependencies

bash
npm install
Environment Configuration
Create a .env file in the root directory:

env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/week2_assignment

# Security
API_KEY=your-secret-api-key-123
Start MongoDB

Ensure MongoDB Compass is running on localhost:27017

Run the application

bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
🔑 Authentication
Protected routes require an API key in the request headers:

http
x-api-key: your-secret-api-key-123
Protected Routes: POST, PUT, DELETE operations

📋 API Endpoints
🏠 Root & Info
GET / - Server status and basic info

GET /api - API documentation and available endpoints

📦 Products Management
Method	Endpoint	Description	Auth Required
GET	/api/products	Get all products with filtering	No
GET	/api/products/:id	Get single product by ID	No
POST	/api/products	Create new product	✅ Yes
PUT	/api/products/:id	Update existing product	✅ Yes
DELETE	/api/products/:id	Delete product	✅ Yes
🔍 Advanced Features
Method	Endpoint	Description	Parameters
GET	/api/products/search	Search products	q (search query)
GET	/api/products/stats	Product statistics	None
🎯 Query Parameters
For /api/products:

category - Filter by category (e.g., ?category=electronics)

inStock - Filter by stock status (e.g., ?inStock=true)

page - Pagination page number (e.g., ?page=1)

limit - Items per page (e.g., ?limit=10)

For /api/products/search:

q - Search query (e.g., ?q=phone)

🧪 API Examples
Get All Products
http
GET http://localhost:3000/api/products
Get Products with Filtering
http
GET http://localhost:3000/api/products?category=electronics&inStock=true&page=1&limit=5
Search Products
http
GET http://localhost:3000/api/products/search?q=phone
Get Product Statistics
http
GET http://localhost:3000/api/products/stats
Create a Product
http
POST http://localhost:3000/api/products
Headers:
  Content-Type: application/json
  x-api-key: your-secret-api-key-123

Body:
{
  "name": "iPhone 15",
  "description": "Latest smartphone",
  "price": 999,
  "category": "electronics",
  "inStock": true
}
Update a Product
http
PUT http://localhost:3000/api/products/:id
Headers:
  Content-Type: application/json
  x-api-key: your-secret-api-key-123

Body:
{
  "name": "Updated Product Name",
  "price": 899
}
Delete a Product
http
DELETE http://localhost:3000/api/products/:id
Headers:
  x-api-key: your-secret-api-key-123
📊 Response Format
Success Response
json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
Error Response
json
{
  "success": false,
  "message": "Error message",
  "errors": ["Validation error details"]
}
Pagination Response
json
{
  "success": true,
  "count": 5,
  "total": 25,
  "page": 1,
  "pages": 5,
  "data": [ ... ]
}
🗂️ Project Structure
text
express-js-server-side-framework-glorymukami/
├── server.js                 # Main application entry point
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
├── README.md                 # This documentation
│
├── models/
│   └── Product.js           # Mongoose product model
│
├── routes/
│   └── products.js          # Product routes and handlers
│
└── middleware/
    ├── auth.js              # Authentication middleware
    ├── logger.js            # Request logging
    ├── validation.js        # Input validation
    └── errors.js            # Custom error handlers
🚦 Running Tests
Use Postman or any API client to test the endpoints:

Start the server: npm run dev

Test root endpoint: GET http://localhost:3000/

Create products: Use POST endpoint with API key

Test all CRUD operations

Verify advanced features: Search, filter, statistics

📝 Assignment Requirements Completed
✅ Task 1: Express.js Setup
✅ Task 2: RESTful API Routes (Full CRUD)
✅ Task 3: Middleware Implementation (Logger, Auth, Validation)
✅ Task 4: Error Handling (Custom errors, Global handler)
✅ Task 5: Advanced Features (Filtering, Pagination, Search, Statistics)

👨‍💻 Author
Glory Mukami
MERN Stack Development - Power Learn Project

📄 License
This project is created for educational purposes as part of the PLP MERN Stack Development program.