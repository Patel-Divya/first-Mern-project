require('dotenv').config();  // to use dbRUL from .env file

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const authRoute = require('./routers/auth-router');
const contactRoute = require('./routers/contact-router');
const serviceRoute = require('./routers/service-router');
const adminRoute = require('./routers/admin-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');

app.use(cors({
    origin: 'http://localhost:3000',
    //methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    //Credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);

connectDb().then(()=>{  // connctDB gives promises because of await in it so, using .then()
    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`)
    });
});


app.use(errorMiddleware);