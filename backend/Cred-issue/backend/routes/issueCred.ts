import express from 'express';
import { issueCredential } from '../controller/issueController';
import { allCredential } from '../controller/allCredentials';
const router = express.Router();

router.post('/', issueCredential);
router.get('/allCredentials', allCredential);



export { router as credIssueRoutes };