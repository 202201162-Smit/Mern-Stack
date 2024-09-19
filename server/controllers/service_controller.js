const Service = require("../models/service-model")

const services = async (req, res) => {
    try {
        const response = await Service.find()
        if(!response){
            return res.status(403).json({msg: "No service"})
        }
        res.status(200).json({msg: response})
    } catch (error) {
        console.log(error)
    }
}

module.exports = services