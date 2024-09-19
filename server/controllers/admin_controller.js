// admin_controller.js
const User = require("../models/user-model");
const Service = require("../models/service-model")

const getAllUsers = async (req, res, next) => {
    try {
        const response = await User.find({}, {password : 0});
        if (!response) {
            return res.status(403).json({ msg: "Cannot fetch Users" });
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const allservices = async (req, res, next) => {
    try {
        const response = await Service.find();
        if (!response) {
            return res.status(403).json({ msg: "Cannot fetch Services" });
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const getuserbyId = async(req, res) => {
    try {
        const id = req.params.id
        const data = await User.findOne({_id : id}, {password : 0})
        console.log("From Server", data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

const updateUserbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body; // Rename to avoid confusion
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const deleteUserbyId = async(req, res) => {
    try {
        const id = req.params.id
        await User.deleteOne({_id : id})
        return res.status(200).json({message : "User deleted successfully"})
    } catch (error) {
        next()
    }
}

module.exports = {getAllUsers, allservices, deleteUserbyId, getuserbyId, updateUserbyId};
