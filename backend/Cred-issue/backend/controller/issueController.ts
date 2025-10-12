import { Credential } from "../model/credModel";
import { getCredentialId } from "../lib/getCredentialId";
import { Request, Response } from "express";
import { connectDB } from "../config/db";

export async function issueCredential(req: Request, res: Response) {
    try {
        await connectDB();
        
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ message: "Missing credential in request body" });
        }
        
        const generatedCredId = getCredentialId(credential);
        console.log('Generated credential ID:', generatedCredId);

        const existing = await Credential.findOne({ credentialId: generatedCredId });
        if (existing) {
            return res.json({ message: "credential already issued", credentialId: generatedCredId });
        }

        const newCredential = await Credential.create({
            credentialId: generatedCredId,
            credential: credential,
            issuedBy: process.env.WORKER_ID || `worker-${process.pid}`,
        });
        
        console.log('Credential saved:', newCredential._id);
        return res.json({ 
            message: `credential issued by ${process.env.WORKER_ID || `worker-${process.pid}`}`, 
            credentialId: generatedCredId 
        });
    } catch (error: any) {
        console.error('Error issuing credential:', error);
        res.status(500).json({ message: error.message });
    }
}