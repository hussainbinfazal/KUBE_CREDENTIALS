export interface ICredential extends Document {
  credentialId: string;                // Unique hash of credential JSON
  credential: Record<string, any>;     // The actual credential JSON
  issuedAt: Date;                      // When the credential was issued
  issuedBy: string; 
  isVerified: boolean;                   // Which worker (pod/container) issued it
  verifiedBy?: string;                // Optional: last worker that verified it
  verifiedAt?: Date;
}