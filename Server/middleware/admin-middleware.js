const User = require('../model/uesr-model');
const adminMiddleware = async (req, res, next) => {
    try {
        //console.log('middlware',req.user);
        const isAdminRole = req.user.isAdmin;
        if(!isAdminRole){
            return res.status(403).json({message: 'Access denied. User is not an admin'});
        }
        // res.status(200).json({msg:req.user.isAdmin});

        // previous middleware was not working well so entered all here
        const users = await User.find({}, {password: 0}); // give data except password
        if(!users || users.length ===0){
            return res.status(404).json({message: 'No users found'});
        }
        
        //return res.status(200).json(users);
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;