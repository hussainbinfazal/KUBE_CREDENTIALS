export interface ICredential extends Document {
  credentialId: string;                // Unique hash of credential JSON
  credential: Record<string, any>;     // The actual credential JSON
  issuedAt: Date;                      // When the credential was issued
  issuedBy: string;                    // Which worker (pod/container) issued it
  isVerified: { type: Boolean, default: false },
  verifiedBy: { type: String },
  verifiedAt: { type: Date },
}