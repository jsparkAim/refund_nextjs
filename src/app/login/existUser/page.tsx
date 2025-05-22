"use client";
import { useState, useEffect } from "react";
import { LoginLayout } from "@/components/layout/LoginLayout";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { VerificationInput } from "@/components/features/auth/VerificationInput";
import { Button } from "@/components/common/Button";
import { User } from "next-auth";
import { useUserStore } from "@/store/userStore";

export default function ExistUser() {
  const { user } = useUserStore((state) => state);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const userPhoneNum = user?.phone_number;

  const handleCheck = () => {};

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
          {/* <VerificationInput
            phone={userPhoneNum ?? ""}
            handleSendVerification={handleSendVerification}
            verificationData={verificationData}
            onVerificationComplete={handleVerificationComplete}
          /> */}

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[78vw] max-w-[400px]">
            <Button
              type="button"
              // disabled={!isVerified}
              onClick={handleCheck}
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
