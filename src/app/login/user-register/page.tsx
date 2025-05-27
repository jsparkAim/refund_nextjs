"use client";

import { Button } from "@/components/common/Button";
import { CheckCancelModal } from "@/components/common/modal/CheckCancelModal";
import { LoginLayout } from "@/components/layout/LoginLayout";
import {
  PasswordChangeCheckModalMessages,
  PasswordChangeSuccessModalMessages,
} from "@/constants/LoginModalMessages";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const userMockData = {
  name: "홍길동",
  birth_date: "1990-01-01",
};

export default function UserRegister() {
  const router = useRouter();
  const companyInfo = useCompanyStore((state) => state.company);
  const user = useUserStore((state) => state.user); // 본인인증 후 유저 정보 가져와야함
  const name = userMockData?.name;
  const birth_date = userMockData?.birth_date;
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPasswordChangeCheckModal, setShowPasswordChangeCheckModal] =
    useState(false);
  const [passwordChangeSuccessModal, setPasswordChangeSuccessModal] =
    useState(false);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(value);
  };

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
      <div className="w-full max-w-md flex flex-col gap-2">
        <div className="space-y-1">
          <p className="text-[18px] font-bold leading-[24px] text-gray-800">
            하단의 개인정보를 등록해주세요.
          </p>
        </div>

        <form className="space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name ?? ""}
              className={`w-full px-4 h-[35px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs  `}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="birth_date"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              생년월일
            </label>
            <input
              id="birth_date"
              type="text"
              value={birth_date ?? ""}
              className={`w-full px-4 h-[35px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs  `}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone_number"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              휴대폰번호
            </label>
            <input
              id="phone_number"
              type="text"
              value={phone_number}
              onChange={handlePhoneNumberChange}
              className={`w-full px-4 h-[35px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs  `}
              required
            />
            <div className="text-xs text-gray-500">
              * 숫자 9자리로만 입력 가능
            </div>
          </div>

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
              className={`w-full px-4 h-[35px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs  `}
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
              className={`w-full px-4 h-[35px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 text-xs `}
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
        <div className="w-full mt-3">
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
