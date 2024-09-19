const { mongoose } = require("mongoose")

const serviceschema = new mongoose.Schema({
    Name :{
        type: String,
        required: true
    },
    Surname :{
        type: String,
        require: true
    }
})

const Service = mongoose.model("Service", serviceschema)
module.exports = Service