const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.URL);
        console.log("MongoDB is connected Successfully");
    } catch (error) {
        console.log("MongoDB connection Failed", error);
    }
}

module.exports = connectDB;