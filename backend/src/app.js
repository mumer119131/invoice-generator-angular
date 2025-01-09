const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth')
const cookiesParser = require('cookie-parser')
const cors = require('cors')
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
// app.use(express.bodyParser())

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookiesParser())
// app.use(logger);
// app.set('view engine', 'ejs')

// Routes
app.use('/api/auth', authRoutes)

module.exports = app;
