import { Credential } from "../model/credModel";
import { Request, Response } from "express";
import { connectDB } from "../config/db";

export async function verifyCredential(req: Request, res: Response) {

    await connectDB();
    try {
        const { credentialId, credential } = req.body;
        if (!credentialId || !credential) {
            return res.status(400).json({ message: "Missing credentialId or credential in request body" });
        }
        const existing = await Credential.findOne({ credentialId });
        if (!existing) {
            return res.status(404).json({ message: "credential not found" });
        }
        if (existing.isVerified) {
            return res.status(400).json({ message: "credential already verified" });
        }
        existing.isVerified = true;
        existing.verifiedBy = process.env.WORKER_ID || `worker-${process.pid}`;
        existing.verifiedAt = new Date();
        await existing.save();
        res.json({ message: `credential verified by ${process.env.WORKER_ID || `worker-${process.pid}`}`, credentialId });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

}