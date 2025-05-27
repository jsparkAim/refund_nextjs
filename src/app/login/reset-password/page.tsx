"use client";

import { Button } from "@/components/common/Button";
import { CheckCancelModal } from "@/components/common/modal/CheckCancelModal";
import { LoginLayout } from "@/components/layout/LoginLayout";
import {
  PasswordChangeCheckModalMessages,
  PasswordChangeSuccessModalMessages,
} from "@/constants/LoginModalMessages";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FindPassword() {
  const companyInfo = useCompanyStore((state) => state.company);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPasswordChangeCheckModal, setShowPasswordChangeCheckModal] =
    useState(false);
  const [passwordChangeSuccessModal, setPasswordChangeSuccessModal] =
    useState(false);
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(
      /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/g,
      ""
    );
    setPassword(value);
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const handleCheck = () => {
    console.log("password >> ", password);
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="space-y-1">
          <p className="text-[18px] font-bold leading-[24px] text-gray-800">
            새 비밀번호를 입력해주세요.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              비밀번호
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
              placeholder="영문자, 숫자, 특수문자 혼합하여 10자리 이상"
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs  `}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="passwordCheck"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              비밀번호 확인
            </label>
            <input
              id="passwordCheck"
              type="text"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
              placeholder="영문자, 숫자, 특수문자 혼합하여 10자리 이상"
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs `}
              required
            />
          </div>
        </form>
        <div className="flex justify-center mt-2">
          {showErrorMessage && (
            <p className="text-red-500 text-sm mb-2 text-center">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
        <div className="w-full mt-40">
          <Button
            type="button"
            onClick={handleCheck}
            style={{
              backgroundColor:
                password.trim().length > 0 && passwordCheck.trim().length > 0
                  ? companyInfo?.companyMainColor
                  : "#9CA3AF",
            }}
            className="w-full h-[6vh] flex items-center justify-center text-white hover:opacity-90 text-base">
            비밀번호 변경
          </Button>
        </div>
      </div>
      <CheckCancelModal
        isOpen={showPasswordChangeCheckModal}
        onClose={() => setShowPasswordChangeCheckModal(false)}
        message={
          <PasswordChangeCheckModalMessages.PasswordChangeCheckContent />
        }
        cancelText="취소"
        buttonText="확인"
        companyColor={companyInfo?.companyMainColor}
        onConfirm={() => {
          setPasswordChangeSuccessModal(true);
        }}
      />

      <CheckCancelModal
        isOpen={passwordChangeSuccessModal}
        onClose={() => setPasswordChangeSuccessModal(false)}
        message={
          <PasswordChangeSuccessModalMessages.PasswordChangeSuccessContent />
        }
        cancelText="취소"
        buttonText="확인"
        companyColor={companyInfo?.companyMainColor}
        onConfirm={() => {
          router.push("/login");
        }}
      />
    </LoginLayout>
  );
}
