// Import dependencies
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/connection');
const productRoutes = require('./routes/productRoutes');

// initialize express app
const app = express();

// Get port from environment variables
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Product routes
app.use('/api/products', productRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Zenith Product API",
        version: "1.0.0", // Version property is use for API versioning
        endpoints: {
            'POST /api/products': 'Create a new product',
            'GET /api/products': 'Get all products (with filtering, sorting, pagination)',
            'GET /api/products/:id': 'Get a single product by ID',
            'PUT /api/products/:id': 'Update a product by ID',
            'DELETE /api/products/:id': 'Delete a product by ID'
        }
    });
});

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`API endpoints available at http://localhost:${PORT}/api/products`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});