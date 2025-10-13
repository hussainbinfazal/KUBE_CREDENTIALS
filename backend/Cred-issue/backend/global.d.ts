export interface ICredential extends Document {
  credentialId: string;
  recipient: string;
  recipientEmail: string;
  credential: Record<string, any>;     
  issuedAt: Date;                      
  issuedBy: string;                   
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
  details?: string;        
}