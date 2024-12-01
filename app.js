const express = require('express');
const {connectDB} = require('./config/db')
const {rateLimit} = require('express-rate-limit'); 
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

const {homeRouter} = require('./routes/home-router')
const {userRouter} = require('./routes/user-router')
const {profileRouter} = require('./routes/profile-router')
const {adminRouter} = require('./routes/admin-router')

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    limit: 100,
	standardHeaders: 'draft-7', 
	legacyHeaders: false,
    message : {
        code : 429,
        message : "Too many requests, try again later"
    } 
})

app.use(limiter);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 3000;

// request log middleware
app.use('/', (req, res, next) => {
    const date = new Date();
    console.log(`Request log for url : ${req.url} method : ${req.method} at ${date.toLocaleString()}`);
    next();
})

app.use('/', homeRouter)
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);


connectDB().then(() => {
    console.log(`Database connected successfully`);
    app.listen(PORT , () => {
    console.log(`Server is listening on port ${PORT}`);
})
}).catch(error => {
    console.log(`Error while connecting to database ${error}`);
})