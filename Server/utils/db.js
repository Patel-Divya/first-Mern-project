const mongoose = require('mongoose');
const DbURL = process.env.MONGODB_URI;

const connectDb = async ()=>{
    try {
        await mongoose.connect(DbURL);
        console.log('DB connection susccessful')
    } catch (error) {
        console.error('db connection failed');
        process.exit(0);
    }
}

module.exports = connectDb;