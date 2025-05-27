"use client";

import { Button } from "@/components/common/Button";
import { CheckCancelModal } from "@/components/common/modal/CheckCancelModal";
import { LoginLayout } from "@/components/layout/LoginLayout";
import { NotFoundUserPasswordModalMessages } from "@/constants/LoginModalMessages";
import { findUserPassword } from "@/lib/api/findUserPassword";
import { useAuthStore } from "@/store/useAuthStore";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FindPassword() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const companyInfo = useCompanyStore((state) => state.company);
  const router = useRouter();
  const [showNotFoundUserPasswordModal, setShowNotFoundUserPasswordModal] =
    useState(false);
  const { setAuthMode } = useAuthStore((state) => state);

  const { mutate: findUserPasswordMutate } = useMutation<
    { status: string },
    Error,
    { name: string; phoneNumber: string }
  >({
    mutationFn: findUserPassword,
    onSuccess: (data: { status: string }) => {
      if (data.status === "EXISTING") {
        setAuthMode("findPassword");
        router.push("/login/identity-verification");
      } else {
        setShowNotFoundUserPasswordModal(true);
      }
    },
    onError: (error) => {
      console.error("findUserPasswordMutate error >> ", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      setPhoneNumber(value);
    }
  };

  const handleCheck = () => {
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }
    findUserPasswordMutate({ name, phoneNumber });
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="space-y-1">
          <p className="text-[18px] font-bold leading-[24px] text-gray-800">
            비밀번호 찾기
          </p>
          <p className="text-[14px] font-normal leading-[20px] text-gray-800">
            가입 시 입력하신 이름, 휴대폰번호를 입력하시면
            <br />
            비밀번호를 찾으실 수 있습니다.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력해주세요."
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2`}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              휴대폰번호
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="-없이 숫자만 입력해주세요."
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2`}
              required
            />
          </div>
        </form>
        <div className="w-full mt-40">
          <Button
            type="button"
            onClick={handleCheck}
            style={{
              backgroundColor:
                name.trim().length > 0 && phoneNumber.length === 11
                  ? companyInfo?.companyMainColor
                  : "#9CA3AF",
            }}
            className="w-full h-[6vh] flex items-center justify-center text-white hover:opacity-90 text-base">
            비밀번호 찾기
          </Button>
        </div>
      </div>
      <CheckCancelModal
        isOpen={showNotFoundUserPasswordModal}
        onClose={() => setShowNotFoundUserPasswordModal(false)}
        message={
          <NotFoundUserPasswordModalMessages.NotFoundUserPasswordContent />
        }
        cancelText="취소"
        buttonText="확인"
        companyColor={companyInfo?.companyMainColor}
        onConfirm={() => {
          window.location.reload();
        }}
      />
    </LoginLayout>
  );
}
