const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URl);
    console.log("Connected to DB");
}

module.exports = connectDB;