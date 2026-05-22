# CodeAlpha_Ecommerce_Store
# ShopEasy E-commerce Website

This is my first full stack E-Commerce website project made using HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.
I created this project to practice frontend and backend development and understand how real e-commerce websites work. This project helped me improve my understanding of APIs, database connection, authentication system, and responsive web design.
The website includes user authentication, product section, shopping cart system, checkout page, and backend API connection with MySQL database.

# Features

- User Registration
- User Login
- Product Display
- Product Details Page
- Add To Cart
- Cart Quantity Update
- Remove Cart Items
- Checkout System
- Order Summary
- Responsive Design
- Dark Mode
- Product Filter
- Hero Slider

# Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js
- MySQL

## Packages Used
- express
- mysql2
- cors
- dotenv
- bcryptjs
- jsonwebtoken

# Project Folder Structure
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── .env
├── server.js

frontend/
│
├── css/
├── js/
├── images/
├── index.html
├── product.html
├── cart.html
├── checkout.html
├── login.html
├── register.html
```

## How To Run The Project

# Step 1

Install all packages

```bash
npm install
```

### Step 2
Create `.env` file inside backend folder

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db

JWT_SECRET=secretkey
```
# Step 3

Start the server

```bash
nodemon server.js
```
or

```bash
node server.js
```

## API Routes

### Authentication

```bash
/api/auth/register
/api/auth/login
```

### Products

```bash
/ api/products
```

### Cart

```bash
/ api/cart
```

### Orders

```bash
/ api/orders
```

## What I Learned From This Project

While building this project, I learned:

- frontend and backend connection
- API creation using Express.js
- MySQL database connection
- user authentication system
- cart management system
- responsive website design
- Express routing
- project folder structure
- using local storage
- backend debugging

This project helped me understand how a complete e-commerce website works from frontend to backend.

# Future Improvements

In future, I plan to add:

- online payment gateway
- admin dashboard
- product image upload
- order tracking
- search functionality
- wishlist system

## Author
Prem Sagar Thakur


