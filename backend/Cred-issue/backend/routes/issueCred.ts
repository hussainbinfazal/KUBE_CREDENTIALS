import express from 'express';
import { issueCredential } from '../controller/issueController';
const router = express.Router();

router.post('/create', issueCredential);



export { router as credIssueRoutes };