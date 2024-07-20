const errorMiddleware = (err, req, res, next) =>{
    const status = err.status || 500;  //id the status is given then it will be used and if its not given, bydefault 500 status will be used.
    const message = err.message || 'Server error';
    const extraDetails = err.extraDetails || 'Error in server';
    
    //return res.status(status).json({message, extraDetails});
};

/*  now, If you want to show an error in anywhare in the program, like:
    try{
    
    }catch(error){
        next(error)   
        // here, whenever you want to show an error, you simply need to call next() and ggive details in it.

        If you are witing directly next(error), the entire error will be passed as a message
        If you want to give status, message and other details in it, you need to make an object of the error
        For eg.:
            try{
            }catch(err){
                const status = 200;
                cosnt message = 'This is the error msg';
                const otherDetails = 'These are other details about the error';

                next(error);
            }
    }
*/

module.exports = errorMiddleware;