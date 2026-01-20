const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// =============================================
// 1. POST /api/products - Create a Product
// =============================================
router.post('/', async (req, res) => {
    try {
        // create new product from request body
        const product = await Product.create(req.body);

        // Return created product with 201 status
        res.status(201).json(product);
    } catch (error) {
        
        // Handle validation errors with 400 status
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
});

// ===============================================
// 2. GET /api/products/:id - Read Single Product
// ===============================================
router.get('/:id', async(req, res) => {
    try {
        // Find product by ID
        const product = await Product.findById(req.params.id);
        // If product not found, return 404
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Return found product
        res.json(product);
    }catch (error) {
        // Handle invalid ID format
        res.status(400).json({ message: "Failed to retrieve product", error: error.message });
    }
});

// =============================================
// 3. PUT /api/products/:id - Update a Product
// =============================================

router.put('/:id', async (req, res) => {
    try {
        // Find and update product, return updated product
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // (new: true) returns the updated document
        );
        // if product not found, return 404
        if(!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        // Return updated product
        res.json(product);
    } catch (error) {
        // Handle validation or other errors
        res.status(400).json({ message: "Failed to update product", error: error.message });
    }
});

// ================================================
// 4. DELETE /api/products/:id - Delete a Product
// ================================================
router.delete('/:id', async (req, res) => {
    try {
        // Find and delete product
        const product = await Product.findByIdAndDelete(req.params.id);
        // if product not found, return 404
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Return success message
        res.json({ message: "Product deleted successfully", deletedProduct: product });
    } catch (error) {
        //Handle errors
        res.status(400).json({  message: "Failed to delete product", error: error.message});
    }
});
 
// ===============================================
// 5. GET /api/products - Read all products
// ===============================================
router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const { category, minPrice, maxprice, sortBy, page = 1, limit = 10 } = req.query;

        // Build filter object
        const filter = {};

        // Add category filter if provided
        if(category) {
            filter.categor = category;
        }

        // Add price range filters if provided
        if (minPrice || maxPrice) {
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice); //$gte means greater than equal
            if(maxprice) filter.price.$lte = Number(maxPrice); // $lte means less than equal
        }

        // Build sort object
        let sort = {};
        if (sortBy) {
            if (sortBy === 'price_asc') { // price_asc means price ascending
                sort.price = 1; // Ascending
            } else if (sortBy === 'price_desc') { // price_desc means price descending
                sort.price = -1; // Descending
            }
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Execute query with filters, sorting, and pagination
        const products = await Product.find(filter).sort(sort).limit(Number(limit)).skip(skip);

        // get total count for pagination info
        const total = await Product.countDocuments(filter);

        //  Return product with pagination metadata
        res.json({
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalProducts: total,
                productsPerPage: Number(limit)
            }
        });
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: "Failed to retrieve products", error: error.message });
    }
});

module.exports = router;