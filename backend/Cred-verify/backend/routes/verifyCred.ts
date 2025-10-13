import express from 'express';
import { verifyCredential } from '../controller/verifyController.js';
const router = express.Router();

router.put('/', verifyCredential);



export { router as credVerifyRoutes };
