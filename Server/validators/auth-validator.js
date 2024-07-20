const {z} = require('zod');

const loginSchema = z.object({
    email: z
    .string({required_error:'Email is required'})
    .trim()
    .min(5, {message: 'Email must have atleast 3 chars'})
    .max(255, {message: 'Email cannot be more than 255 chars'}),

    password: z
    .string({required_error:'Password is requires'})
    .trim()
    .min(4, {message: 'Password must have atleast 8 chars'})
    .max(1024, {message: 'Password cannot be more than 1024 chars'}),
})

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:'Name is requires'})
    .trim()
    .min(3, {message: 'Name must have atleast 3 chars'})
    .max(255, {message: 'Name cannot be more than 255 chars'}),

    //email: z                                          // we don't need because we already have it in loginSchema
    //.string({required_error:'Email is requires'})
    //.trim()
    //.min(3, {message: 'Email must have atleast 3 chars'})
    //.max(255, {message: 'Email cannot be more than 255 chars'}),

    phone: z 
    .number({required_error:'Phone number should be of numbers only'})
    .min(1000000000, {message:'Phone number should be of 10 numbers'})
    .max(9999999999, {message:'Phone number should be of 10 numbers'}),

    //password: z
    //.string({required_error:'Password is requires'})
    //.trim()
    //.min(8, {message: 'Password must have atleast 8 chars'})
    //.max(1024, {message: 'Password cannot be more than 1024 chars'}),
});

module.exports = {signupSchema, loginSchema};