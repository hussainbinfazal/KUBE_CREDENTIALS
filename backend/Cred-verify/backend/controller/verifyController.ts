import { Credential } from "../model/credModel";
import { Request, Response } from "express";
import { connectDB } from "../config/db";

export async function verifyCredential(req: Request, res: Response) {

    await connectDB();
    try {
        const { credentialId, verifiedBy } = req.body;
        if (!credentialId) {
            return res.status(400).json({ message: "Missing credentialId in request body" });
        }
        const existing = await Credential.findOne({ credentialId });
        if (!existing) {
            return res.status(404).json({ message: "credential not found" });
        }
        if (existing.isVerified) {
            return res.status(400).json({ message: "credential already verified" });
        }
        existing.isVerified = true;
        existing.verifiedBy = verifiedBy;
        existing.verifiedAt = new Date();
        await existing.save();
        return res.json({ message: `credential verified by ${verifiedBy}`, credentialId });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}