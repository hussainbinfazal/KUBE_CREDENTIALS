import express, { Application, Request, Response } from "express";
import expressProxy from "express-http-proxy";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';



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
// app.use("/", (req: Request, res: Response) => {
//   res.send("Welcome to the Gateway");
// });

// Simple health endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ service: 'gateway', status: 'ok' });
});
app.use("/api/issue", expressProxy(`${process.env.ISSUE_SERVICE_URL}`));
app.use("/api/verify", expressProxy(`${process.env.VERIFY_SERVICE_URL}`));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gateway server listening on port ${PORT}`);
});

