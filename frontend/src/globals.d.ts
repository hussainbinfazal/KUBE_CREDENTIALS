interface Credential {
  id: string;
  studentName: string;
  course: string;
  issueDate: string;
  grade: string;
  institutionName: string;
}

interface IssuanceResponse {
  message: string;
  credential: Credential;
}

interface VerificationResponse {
  valid: boolean;
  message: string;
  credential?: Credential;
}

type PageType = 'issuance' | 'verification';