const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    phone: {
        type:Number,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    isAdmin: {
        type:Boolean,
        default: false
    }
});

userSchema.methods.generateToken = function (){ // to make Json Web Token (JWT tokens) in anywhere in controllers
    // by using .methods, you can make multiple methods
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY, {
            expiresIn: '30D',
        }
    )
    } catch (error) {
        console.error(error);
    }
};  

userSchema.methods.checkPassword = async function (password){
    //console.log(password);

    if(this.password===password){
        return true;
    }else{
        return false;
    }
} 

const User = new mongoose.model('users', userSchema, 'users');

module.exports = User;