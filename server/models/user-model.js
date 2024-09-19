const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isadmin: this.isadmin
        }, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });
    } catch (error) { 
        console.error(error);
    }
};

userSchema.methods.comparePassword = async function (password) {
    // console.log(password)
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
