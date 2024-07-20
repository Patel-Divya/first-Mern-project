// await shema.parseAsync(req.body) is the line where you use Zod to validate ythe request body data against the defined schema

const { parseAsync } = require("../validators/auth-validator");

const validate = (schema) => async (req,res,next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) { 
        const message = 'Fill the details properly';
        const extraDetails = err.errors[0].message;
        const status = 400;
        //res.status(400).json({msg:msg});  // replacing with error middleware

        const error = {
            status,
            message,
            extraDetails
        }

        console.log(err)
        console.log('parseBody',error);
        next(error);
    }
};

module.exports = validate;