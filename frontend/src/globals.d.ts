export interface Credential {
  id: string;
  studentName: string;
  course: string;
  issueDate: string;
  grade: string;
  institutionName: string;
}

export interface IssuanceResponse {
  message: string;
  credential: Credential;
}

export interface VerificationResponse {
  valid: boolean;
  message: string;
  credential?: Credential;
}

export type PageType = 'issuance' | 'verification';

export interface Credential {
  credentialId: string;
  name: string;
  email: string;
  courseName: string;
  issuedBy: string;
  details?: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}