const express = require('express')
const router = express.Router();
const authControllers = require('../Controllers/auth-controller');
const {home, register} = require('../Controllers/auth-controller');

//middlewares
const {signupSchema, loginSchema} = require('../validators/auth-validator');
const validate = require('../middleware/register-middleware');
const authMiddlware = require('../middleware/auth-middleware');

//router.get('/', (req,res)=>{
//    res.status(200).send('Router of express');
//});

router.route('/').get(home);
router.route('/register').post(validate(signupSchema), register); // for practice purpose
router.route('/login').post(validate(loginSchema), authControllers.login);
router.route('/user').get(authMiddlware, authControllers.user);

module.exports = router;