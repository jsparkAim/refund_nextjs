"use client";
import { useState, useEffect } from "react";
import { LoginLayout } from "@/components/layout/LoginLayout";
import { VerificationInput } from "@/components/features/auth/VerificationInput";
import { Button } from "@/components/common/Button";
import { useUserStore } from "@/store/userStore";
import { useVerification } from "@/hooks/auth/useVerification";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ExistUser() {
  const { user } = useUserStore((state) => state);
  const userPhoneNum = user?.phone_number;
  const smsUserInfo = {
    phoneNumber: String(userPhoneNum ?? ""),
    id: String(user?.id ?? "0"),
  };
  const router = useRouter();
  const { verificationData, handleSendVerification } =
    useVerification(smsUserInfo);
  const [isVerificationValid, setIsVerificationValid] = useState(false);

  const handleVerificationComplete = (value: boolean) => {
    // 인증 상태 처리
    setIsVerificationValid(value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const completedUser = await signIn("credentials", {
      name: user?.name ?? "",
      gender: user?.gender ?? "",
      birth_date: user?.birth_date ?? "",
      phone_number: user?.phone_number ?? "",
      id: user?.id ?? 0,
    });
    console.log("completedUser >> ", completedUser);
    router.push("/");
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="space-y-1">
          <p className="text-[18px] font-bold leading-[24px] text-gray-800">
            휴대폰번호로
            <br />
            본인인증을 진행합니다.
          </p>
        </div>

        <form className="space-y-4">
          <VerificationInput
            phone={userPhoneNum}
            handleSendVerification={handleSendVerification}
            verificationData={verificationData}
            onVerificationComplete={handleVerificationComplete}
          />

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[78vw] max-w-[400px]">
            <Button
              type="button"
              // disabled={!isVerified}
              onClick={handleSubmit}
              style={{
                backgroundColor: "#9CA3AF",
              }}
              className="w-full h-[6vh] flex items-center justify-center text-white hover:opacity-90 text-base">
              확인
            </Button>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
}
