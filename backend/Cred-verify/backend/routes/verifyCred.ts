import express from 'express';
import { verifyCredential } from '../controller/verifyController';
const router = express.Router();

router.put('/', verifyCredential);



export { router as credVerifyRoutes };
