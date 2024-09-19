const { default: mongoose } = require("mongoose")
// const mongoose = require("mongoose")

// const URI = "mongodb://127.0.0.1:27017/mern_admin"

const URI = "mongodb+srv://Smit:26062005@cluster0.jcsxoog.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () =>{
    try {
        console.log("It's working perfect")
        await mongoose.connect(URI)
    } catch (error) {
        console.error("Database connection failed due")
        process.exit(0)
    }
}

module.exports = connectDb