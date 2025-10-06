import { Credential } from "../model/credModel";
import { getCredentialId } from "../lib/getCredentialId";
import { Request, Response } from "express";
import { connectDB } from "../config/db";

export async function issueCredential(req: Request, res: Response) {

    await connectDB();
    try {
        const { credential } = req.body;
        if (credential) {
            return res.status(400).json({ message: "Missing credential in request body" });
        }
        const generatedCredId = getCredentialId(credential);

        const existing = await Credential.findOne({ credentialId: generatedCredId });
        if (existing) {
            return res.json({ message: "credential already issued" });
        }

        await Credential.create({
            credentialId: generatedCredId,
            credential: credential,
            issuedBy: process.env.WORKER_ID || `worker-${process.pid}`,
        });

        res.json({ message: `credential issued by ${process.env.WORKER_ID || `worker-${process.pid}`}`, credentialId: generatedCredId });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

}