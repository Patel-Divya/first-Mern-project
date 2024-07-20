const Service = require("../model/service-model");

const services = async (req, res)=>{
    try {
        const response = await Service.find();

        if(!response){
            res.status(404).json({msg:'No sevices found'});
            return;
        }

        res.status(200).json({msg: response});
    } catch (error) {
        console.log('Error in services- controller:\n',error);
    }
}

module.exports = services;