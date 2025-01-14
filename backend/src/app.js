const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth')
const invoiceRoutes = require('./routes/invoice')
const cookiesParser = require('cookie-parser')
const cors = require('cors')
const fs = require('fs')

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
// Load environment variables
if(fs.existsSync(envFile)) {
    dotenv.config({path: envFile});
    console.log(`Environment file loaded: ${envFile}`);
}else{
    console.log('No environment file found. Using .env file');
    process.exit(1);
}

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
// app.use(express.bodyParser())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookiesParser())
// app.use(logger);
// app.set('view engine', 'ejs')

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/invoice', invoiceRoutes)

module.exports = app;
