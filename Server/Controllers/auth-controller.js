const User = require('../model/uesr-model');

const home = (req,res)=>{
    try {
        res.status(200).send('Router of express');
    } catch (error) {
        console.log(error)
    }
}

const register = async(req,res)=>{
    try {
        const {username, email, phone, password} = req.body;
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(400).json({message:'Email already exist'});
        }

        const userCreated = await User.create({username, email, phone, password});

        //console.log(req.body);
        res.status(201).json({
            msg: 'Registration successful', 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString()
        });
    } catch (error) {
        res.status(400).send({msg:'Page not found'});
        console.log(error);
    }
}

const login = async (req,res)=>{
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email: email});
        if(!userExist){
            return res.status(500).json({message: 'invalid Credentials'});;
        }

        if(await userExist.checkPassword(password)){
            res.status(200).json({
                msg: 'Login successful', 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString()
            });
        }else{
            res.status(401).json({message: 'Invalid email or password'});
        }
        
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}

const user = async (req, res)=>{
    try {
        const userData = req.user;
        console.log(userData);

        return res.status(200).json({userData});
        
    } catch (error) {
        console.log('error from user route: ',error);
    }
}
module.exports = {home, register, login, user};