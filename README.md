Express.js – RESTful API (Week 2 Assignment)
📘 Project Overview

This project is a RESTful API built with Express.js as part of the Power Learn Project (PLP) – MERN Stack Development Course.
It performs full CRUD operations on a products resource, with proper routing, middleware, and MongoDB integration.

🧠 Objective

To build a server-side application using Express.js that:

Implements Create, Read, Update, Delete (CRUD) operations.

Uses middleware for logging, authentication, and validation.

Handles errors gracefully.

Connects to a MongoDB database (via Compass or Atlas).

Supports filtering, pagination, and search.

🛠️ Technologies Used

Node.js

Express.js

MongoDB (Local using Compass)

Mongoose

dotenv

body-parser

Postman (for API testing)

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/express-js-server-side-framework-glorymukami.git
cd express-js-server-side-framework-glorymukami

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the project root and add:

MONGO_URI=mongodb://127.0.0.1:27017/express_api_db
PORT=3000
API_KEY=12345


💡 Also include a .env.example file with placeholder values for submission.

4️⃣ Start MongoDB

Ensure your local MongoDB server is running.
Then open MongoDB Compass and connect to:

mongodb://127.0.0.1:27017

5️⃣ Run the Server
npm start


Or:

node server.js


You should see:

✅ MongoDB Connected Successfully
🚀 Server running on port 3000

🧪 API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products (with optional filters, pagination, search)
GET	/api/products/:id	Get a specific product by ID
POST	/api/products	Create a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product
GET	/api/products/stats/category	Get count of products by category
🔑 Authentication

All /api/products routes require an API key in the headers:

x-api-key: 12345


If the key is missing or incorrect, the API returns:

{
  "error": "Unauthorized. Invalid API Key."
}

🧱 Request Body Example (POST /api/products)
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 85000,
  "category": "Electronics",
  "inStock": true
}

🧩 Query Parameters
Parameter	Type	Description
category	string	Filter products by category
search	string	Search products by name
page	number	Page number for pagination
limit	number	Number of products per page

✅ Example:

GET /api/products?category=Electronics&page=1&limit=5&search=laptop

🧰 Middleware Implemented
Middleware	Purpose
logger.js	Logs request method, URL, and timestamp
auth.js	Verifies API key for secure access
validateProduct.js	Validates required fields for product creation/update
Global Error Handler	Catches all application errors and sends structured responses
📊 Advanced Features

Filtering by category

Search by product name

Pagination for product listing

Statistics endpoint showing product count by category

🧭 Testing the API in Postman

Open Postman

Set x-api-key in Headers

Test endpoints:

GET http://localhost:3000/api/products

POST http://localhost:3000/api/products

PUT http://localhost:3000/api/products/:id

DELETE http://localhost:3000/api/products/:id

Observe data appear in MongoDB Compass under express_api_db → products

🪲 Error Handling

Examples of responses:

Scenario	Status	Response
Invalid API Key	401	{ "error": "Unauthorized. Invalid API Key." }
Missing fields	400	{ "error": "Name and price are required." }
Product not found	404	{ "error": "Product not found" }
Server error	500	{ "error": "Internal Server Error" }
📚 Folder Structure
express-api/
│
├── server.js
├── package.json
├── .env
├── .env.example
├── README.md
│
├── models/
│   └── Product.js
│
├── routes/
│   └── products.js
│
└── middleware/
    ├── logger.js
    ├── auth.js
    └── validateProduct.js

👩‍💻 Author

Name: Glory Mukami
Course: Power Learn Project – MERN Stack Development
Email: mukamiglory93@gmail.com

GitHub: gloryMukami