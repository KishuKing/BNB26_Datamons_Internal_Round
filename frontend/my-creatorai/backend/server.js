const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Routes
app.use("/api/upload", uploadRoutes);

// Test route
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "CreatorAi Backend is running 🚀"
    });

});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});