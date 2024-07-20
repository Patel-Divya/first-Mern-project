const User = require('../model/uesr-model');
const Contact = require('../model/contact-model');
const Service = require('../model/service-model');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, {password: 0}); // give data except password
        if(!users || users.length ===0){
            return res.status(404).json({message: 'No users found'});
        }
        return res.status(200).json(users);
        
        //console.log(users);
    } catch (error) {
        //console.log(error);
        next(error);
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // give data except password
        if(!contacts || contacts.length ===0){
            return res.status(404).json({message: 'No contacts found'});
        }
        
        res.status(200).json(contacts);
        // console.log('contacts');
    } catch (error) {
        //console.log(error);
        //next(error);
    }
}

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find(); // give data except password
        if(!services || services.length ===0){
            return res.status(404).json({message: 'No services found'});
        }
        res.status(200).json(services);
        //console.log(services);
    } catch (error) {
        //console.log(error);
        next(error);
    }
}

const deleteUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});

        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.log(error);
        // next(error);
    }
}

const getUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id}, {password:0});

        console.log(id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

const uppdateUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne({_id:id}, {
            $set: updateUserData
        });

        return res.status(200).json(updatedData);
    } catch (error) {
        console.log(error);
    }
}

const daleteContactById = async (req, res) =>{
    try {
        const id = req.params.id;

        await Contact.deleteOne({_id:id});

        res.status(200).json({message: 'Contact deleted successfully'});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllUsers, getAllServices, getAllContacts, deleteUserById, getUserById, uppdateUserById, daleteContactById};