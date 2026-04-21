const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require('./config/db');
const routes = require('./routes/routes.js');

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
express.urlencoded({ extended: true })

// MongoDB connection
connectDB();

// Routes
app.use("/api", routes)

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})