const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: string,
        required: [true, "Product name is required!"]
    },
    description: {
        type: string,
        required: [true, "product description is required!"]
    },
    price: {
        type: number,
        required: [true, "Product price is required"],
        min: [0, "Price must be grater than 0"]
    },
    category: {
        type: string,
        required: [true, "Product category is required!"]
    },
    isStock: {
        type: boolean,
        default: true
    },
    tags: {
        type: [string],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});