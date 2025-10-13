import { Credential } from "../model/credModel";
import { getCredentialId } from "../lib/getCredentialId";
import { Request, Response } from "express";
import { connectDB } from "../config/db";

export async function allCredential(req: Request, res: Response): Promise<Response> {

    await connectDB();
    try {
        const credentials = await Credential.find({});
        const sortedCredentials = credentials.sort((a, b) => b.issuedAt.getTime() - a.issuedAt.getTime());
        return res.status(200).json({ sortedCredentials });
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}