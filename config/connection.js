const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // To exit process with failure
    }
};

// Handle connection events
mongoose.connection.on("conencted", () => {
    console.log("Mognoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
});

// Export connection function

module.exports = connectDB;