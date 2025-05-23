"use client";

import { LoginLayout } from "@/components/layout/LoginLayout";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { CheckCancelModal } from "@/components/common/modal/CheckCancelModal";
import {
  LoginModalMessages,
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
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false);
  const [showUseRestrictionsModal, setShowUseRestrictionsModal] =
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
        case "EXISTING":
          console.log("data.user >> ", data.user);
          setUser(data.user); // 유저 정보 저장
          router.push("/login/existUser");
          break;

        case "USE_RESTRICTIONS":
          setShowUseRestrictionsModal(true);
          break;
      }
    },
    onError: (error) => {
      console.error("checkUserMutate error >> ", error);
      alert("유저 확인 실패");
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  useEffect(() => {
    const isPhoneNumberValid = phoneNumber.length === 11;
    const isPasswordValid = password.trim().length > 0;
    setIsValid(isPhoneNumberValid && isPasswordValid);
  }, [phoneNumber, password]);

  const handleCheck = async () => {
    if (!isValid) return;
    await checkUserMutate({ phoneNumber, password });
  };

  return (
    <LoginLayout>
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            {companyInfo?.companyName} 환급 프로그램에
          </p>
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            오신것을 환영합니다.
          </p>
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            환급 프로그램을 이용하시려면
          </p>
          <p className="text-[16px] font-bold leading-[24px] text-gray-800">
            ID와 패스워드를 입력해 주세요.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              ID
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="휴대폰번호를 입력해주세요"
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2`}
              pattern="[0-9]*"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-[14px] font-normal leading-[18px] text-gray-600">
              패스워드
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="패스워드를 입력해주세요"
              className={`w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2`}
              required
            />
          </div>

          {/* <div className="flex justify-center">
            <Link
              href="/login/identityVerification"
              className="text-[13px] font-medium leading-[26px] text-gray-500 underline text-center bg-white-100"
              onClick={() => {
                //   setChangePhoneState({ changePhoneState: true });
              }}>
              휴대폰번호 변경시 재등록
            </Link>
          </div> */}
        </form>

        <div className="w-full">
          <Button
            type="button"
            onClick={() => {
              setShowFirstVisitModal(true);
            }}
            style={{
              backgroundColor: "#9CA3AF",
            }}
            className="w-full h-[6vh] flex items-center justify-center text-white hover:opacity-90 text-base">
            회원가입
          </Button>
        </div>

        <div className="w-full mt-16">
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
            확인
          </Button>
        </div>

        <CheckCancelModal
          isOpen={showFirstVisitModal}
          onClose={() => setShowFirstVisitModal(false)}
          title={<LoginModalMessages.firstVisitTitle />}
          message={<LoginModalMessages.firstVisitContent />}
          cancelText="취소"
          buttonText="신규회원가입"
          companyColor={companyInfo?.companyMainColor}
          onConfirm={() => {
            router.push("/login/termsAgreement");
          }}
        />

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
      </div>
    </LoginLayout>
  );
}
