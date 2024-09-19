const User = require("../models/user-model");
const Service = require("../models/user-model")

const home = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome all to routers using controllers" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Something Error" });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        const token = await newUser.generateToken();
        res.status(201).json({ msg: "User registered successfully", token, userId: newUser._id.toString() });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Something Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            // alert(`Invalid Credentials`)
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await userExist.comparePassword(password);
        // console.log(isPasswordValid)

        if (isPasswordValid) {
            const token = await userExist.generateToken();
            res.status(200).json({ message: "Login Successful", token, userId: userExist._id.toString() });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login" });
    }
};

const service = async (req, res) => {
    try {
        const response = await Service.find()
        if(!response){
            return res.status(404).json({message : "No services found"})
        }
        return res.status(200).json({message : "Services found", data : response})
    } catch (error) {
        console.log(error)
    }
}

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ msg: userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports = { home, register, login, service, user};
