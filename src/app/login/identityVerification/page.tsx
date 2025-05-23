"use client";

import { Button } from "@/components/common/Button";
import { LoginLayout } from "@/components/layout/LoginLayout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
export default function IdentityVerification() {
  const router = useRouter();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleCheck = () => {
    // 첫 화면의 이름, 연락처가 같으면
    // sms 인증 문자 로직으로 이동
  };

  return (
    <>
      <LoginLayout>
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-1">
            <p className="text-[18px] font-bold leading-[24px] text-gray-800">
              본인확인
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[15px] font-bold leading-[24px] text-gray-800">
              회원가입을 위해 본인인증을 진행합니다.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[15px] font-bold leading-[24px] text-gray-800">
              아래 버튼을 클릭하고 본인인증을 진행해 주세요. <br />
              인증을 완료한 후, 화면 하단의 인증 완료를 선택해 주세요
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              className="mt-10 w-[250px] h-[90px] flex flex-col items-center justify-center gap-2 bg-white "
              onClick={() =>
                router.push("/login/identityVerification/detailVerification")
              }>
              <Image
                src="/assets/images/goto_pass.png"
                alt="person icon"
                width={400}
                height={400}
              />
            </Button>
          </div>

          <div className="flex justify-center mt-2">
            {showErrorMessage && (
              <p className="text-red-500 text-sm mb-2 text-center">
                본인인증을 완료한 후 시도해주세요.
              </p>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[78vw] max-w-[400px]">
            <Button
              type="button"
              // disabled={!isVerified}
              onClick={handleCheck}
              style={{
                backgroundColor: "#9CA3AF",
              }}
              className="w-full h-[6vh] flex items-center justify-center text-white hover:opacity-90 text-base">
              인증완료
            </Button>
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
