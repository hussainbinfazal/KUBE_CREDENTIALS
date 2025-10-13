
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { credIssueRoutes } from './routes/issueCred';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // You can customize the methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);


// MongoDB Connection
connectDB();

// Routes
app.use('/',credIssueRoutes );

// app.get("/", requestController);

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the build folder
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // Handle React routing - send all non-API requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
} else {
    // Development route
    // app.get("/", requestController);
}
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));