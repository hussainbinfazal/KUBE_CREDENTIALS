import express, { Application, Request, Response } from "express";
import expressProxy from "express-http-proxy";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();
const app: Application = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", (req: Request, res: Response) => {
  res.send("Welcome to the Gateway");
});
app.use("/api/issue", expressProxy(`${process.env.ISSUE_SERVICE_URL}`));
app.use("/api/verify", expressProxy(`${process.env.VERIFY_SERVICE_URL}`));
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the build folder
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // Handle React routing - send all non-API requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
} else {
    
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gateway server listening on port ${PORT}`);
});

