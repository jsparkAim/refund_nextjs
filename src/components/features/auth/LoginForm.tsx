"use client";

import { LoginLayout } from "@/components/layout/LoginLayout";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { CheckCancelModal } from "@/components/common/modal/CheckCancelModal";
import {
  LoginModalMessages,
  NotFoundUserModalMessages,
  PasswordMismatchModalMessages,
  UseRestrictionsModalMessages,
} from "@/constants/LoginModalMessages";
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useMutation } from "@tanstack/react-query";
import { checkUser } from "@/lib/api/user";
import { User } from "next-auth";
import { useUserStore } from "@/store/userStore";

export default function LoginForm() {
  const router = useRouter();
  const companyInfo = useCompanyStore((state) => state.company);
  const { setUser } = useUserStore((state) => state);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showUseRestrictionsModal, setShowUseRestrictionsModal] =
    useState(false);
  const [showPasswordRequiredModal, setShowPasswordRequiredModal] =
    useState(false);
  const [showNotFoundUserModal, setShowNotFoundUserModal] = useState(false);
  const [showPasswordMismatchModal, setShowPasswordMismatchModal] =
    useState(false);

  const { mutate: checkUserMutate } = useMutation<
    { status: string; user: User },
    Error,
    { phoneNumber: string; password: string }
  >({
    mutationFn: checkUser,
    onSuccess: (data: { status: string; user: User }) => {
      console.log("checkUserMutate data >> ", data);
      switch (data.status) {
        // 존재하는 유저
        case "EXISTING":
          console.log("data.user >> ", data.user);
          setUser(data.user);
          router.push("/login/existUser");
          break;

        // 강제 탈퇴 회원 (2차 개발사항)
        case "USER_RESTRICTIONS":
          setShowUseRestrictionsModal(true);
          break;

        // 비밀번호 불일치
        case "PASSWORD_MISMATCH":
          setShowPasswordMismatchModal(true);
          break;

        // 존재하지 않는 유저
        case "NOT_FOUND":
          setShowNotFoundUserModal(true);
          break;
      }
    },
    onError: (error) => {
      console.error("checkUserMutate error >> ", error);
      alert("유저 확인 실패");
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    setPhoneNumber(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setPassword(value);
  };

  const handleCheck = async () => {
    if (!password.trim()) {
      setShowPasswordRequiredModal(true);
      return;
    }
    await checkUserMutate({ phoneNumber, password });
  };

  const setShowPhoneNumberChangeModal = () => {
    console.log("setShowPhoneNumberChangeModal");
  };

  return (
    <LoginLayout>
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            {companyInfo?.companyName}에
          </p>
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            오신것을 환영합니다.
          </p>
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            환급 프로그램을 이용하시려면
          </p>
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            로그인해주세요.
          </p>
        </div>

        <form className="space-y-4">
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
              pattern="[0-9]*"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요(10자)."
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2`}
              required
            />
          </div>
        </form>

        <div className="flex justify-center gap-14">
          <span
            role="link"
            tabIndex={0}
            onClick={() => router.push("/login/find-password")}
            className="underline text-gray-600 text-[14px] leading-[20px] cursor-pointer text-center">
            비밀번호 찾기
          </span>
          <span
            role="link"
            tabIndex={0}
            onClick={() => setShowPhoneNumberChangeModal(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setShowPhoneNumberChangeModal(true);
            }}
            className="underline text-gray-600 text-[14px] leading-[20px] cursor-pointer text-center">
            휴대폰번호가 변경됐다면?
          </span>
        </div>

        <div className="w-full mt-12">
          <div className="flex justify-center">
            <span
              role="link"
              tabIndex={0}
              onClick={() => router.push("/login/terms-agreement")}
              className="underline text-gray-600 text-[14px] leading-[20px] cursor-pointer text-center ">
              처음 오셨나요? 회원가입
            </span>
          </div>
          <div className="mt-6" />
          <Button
            type="button"
            disabled={!isValid}
            onClick={handleCheck}
            style={{
              backgroundColor: isValid
                ? companyInfo?.companyMainColor
                : "#9CA3AF",
            }}
            className="w-full h-[6vh] flex items-center justify-center text-white hover:opacity-90 text-base">
            휴대폰 인증하고 로그인하기
          </Button>
        </div>

        <CheckCancelModal
          isOpen={showUseRestrictionsModal}
          onClose={() => setShowUseRestrictionsModal(false)}
          title={<UseRestrictionsModalMessages.UseRestrictionsTitle />}
          message={<UseRestrictionsModalMessages.UseRestrictionsContent />}
          cancelText="취소"
          buttonText="확인"
          companyColor={companyInfo?.companyMainColor}
          onConfirm={() => {
            window.location.reload();
          }}
        />

        {/* case1. 비밀번호 불일치 모달 */}
        <CheckCancelModal
          isOpen={showPasswordMismatchModal}
          onClose={() => setShowPasswordMismatchModal(false)}
          title={<PasswordMismatchModalMessages.PasswordMismatchTitle />}
          cancelText="취소"
          buttonText="확인"
          companyColor={companyInfo?.companyMainColor}
          onConfirm={() => {
            setShowPasswordMismatchModal(false);
          }}
        />

        {/* case2. 존재하지 않는 유저 모달 */}
        <CheckCancelModal
          isOpen={showNotFoundUserModal}
          onClose={() => setShowNotFoundUserModal(false)}
          title={<NotFoundUserModalMessages.NotFoundUserTitle />}
          message={<NotFoundUserModalMessages.NotFoundUserContent />}
          cancelText="취소"
          buttonText="확인"
          companyColor={companyInfo?.companyMainColor}
          onConfirm={() => {
            setShowNotFoundUserModal(false);
          }}
        />
      </div>
    </LoginLayout>
  );
}
