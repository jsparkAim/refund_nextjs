export interface verificationData {
  isVerificationSent: boolean;
  verificationCode: string;
  verificationError: boolean;
  isValid: boolean;
  timeLeft: number;
}

export interface VerificationInputProps {
  phone: string;
  handleSendVerification: (e: React.MouseEvent<HTMLButtonElement>) => void;
  verificationData: verificationData;
  onVerificationComplete: (isValid: boolean) => void;
}
