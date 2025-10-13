import express from 'express';
import { issueCredential } from '../controller/issueController.js';
import { allCredential } from '../controller/allCredentials.js';
const router = express.Router();

router.post('/', issueCredential);
router.get('/allCredentials', allCredential);



export { router as credIssueRoutes };