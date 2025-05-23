import { useState, useEffect } from "react";
import { sendVerificationCode } from "@/lib/sms";
import { verificationData } from "@/types/auth";

export const useVerification = (smsUserInfo: {
  phoneNumber: string;
  id: string;
}) => {
  const [verificationData, setVerificationData] = useState<verificationData>({
    isVerificationSent: false,
    verificationCode: "",
    verificationError: false,
    isValid: false,
    timeLeft: 300,
  });

  useEffect(() => {
    if (!verificationData.isVerificationSent) return;

    const timer = setInterval(() => {
      setVerificationData((prev: verificationData) => ({
        ...prev,
        timeLeft: prev.timeLeft <= 0 ? 0 : prev.timeLeft - 1,
        isVerificationSent: prev.timeLeft > 0,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [verificationData.isVerificationSent]);

  // 인증번호 발송
  const handleSendVerification = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const response = await sendVerificationCode(smsUserInfo);
      const data = await response.json();
      const verificationCode = data.verificationCode;

      setVerificationData((prev: verificationData) => ({
        ...prev,
        isVerificationSent: true,
        timeLeft: 300,
        verificationCode: verificationCode,
      }));
    } catch (error) {
      console.error("인증번호 발송 실패:", error);
    }
  };

  return {
    verificationData,
    handleSendVerification,
  };
};
