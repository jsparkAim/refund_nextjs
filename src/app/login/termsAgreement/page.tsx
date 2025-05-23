"use client";

import { Button } from "@/components/common/Button";
import { PolicyModal } from "@/components/common/modal/PolicyModal";
import { LoginLayout } from "@/components/layout/LoginLayout";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TermsAgreement() {
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    thirdParty: false,
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isThirdPartyModalOpen, setIsThirdPartyModalOpen] = useState(false);
  const companyInfo = useCompanyStore((state) => state.company);

  const handleAgreementChange = (type: keyof typeof agreements) => {
    if (type === "all") {
      const checked = !agreements.all;
      setAgreements({
        all: checked,
        service: checked,
        privacy: checked,
        thirdParty: checked,
      });
    } else {
      const newAgreements = { ...agreements, [type]: !agreements[type] };
      newAgreements.all =
        newAgreements.service &&
        newAgreements.privacy &&
        newAgreements.thirdParty;
      setAgreements(newAgreements);
    }
  };

  const handleCheck = () => {
    if (!agreements.all) {
      setShowErrorMessage(true);
      return;
    }
    setShowErrorMessage(false);
    //setChangePhoneState({ changePhoneState: false });
    router.push("/login/identityVerification");
  };

  return (
    <>
      <LoginLayout>
        <div className="w-full flex flex-col gap-4">
          <p className="text-gray-800 text-lg font-bold mb-8">
            정보보호를 보호하기 위해 <br />
            약관동의가 필요합니다.
          </p>

          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="hidden"
                checked={agreements.all}
                onChange={() => handleAgreementChange("all")}
              />
              <div
                className="h-6 w-6 flex justify-center items-center rounded-full border-2"
                style={{
                  backgroundColor: agreements.all
                    ? companyInfo?.companyMainColor
                    : undefined,
                  borderColor: agreements.all
                    ? companyInfo?.companyMainColor
                    : "#D1D5DB", // fallback gray-300
                }}>
                {agreements.all && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-800 text-base font-bold">
                모든 약관에 동의합니다.
              </span>
            </label>
            <div className="mt-5 border-b-2 border-gray-300"></div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={agreements.service}
                  onChange={() => handleAgreementChange("service")}
                />
                <div
                  className="h-6 w-6 flex justify-center items-center rounded-full border-2"
                  style={{
                    backgroundColor: agreements.service
                      ? companyInfo?.companyMainColor
                      : undefined,
                    borderColor: agreements.service
                      ? companyInfo?.companyMainColor
                      : "#D1D5DB", // fallback gray-300
                  }}>
                  {agreements.service && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-800">[필수] 서비스 이용약관</span>
              </label>
              <button
                onClick={() => setIsServiceModalOpen(true)}
                className="text-gray-400 text-sm underline">
                보기
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={agreements.privacy}
                  onChange={() => handleAgreementChange("privacy")}
                />
                <div
                  className="h-6 w-6 flex justify-center items-center rounded-full border-2"
                  style={{
                    backgroundColor: agreements.privacy
                      ? companyInfo?.companyMainColor
                      : undefined,
                    borderColor: agreements.privacy
                      ? companyInfo?.companyMainColor
                      : "#D1D5DB", // fallback gray-300
                  }}>
                  {agreements.privacy && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-800">[필수] 개인정보 처리방침</span>
              </label>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-gray-400 text-sm underline">
                보기
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={agreements.thirdParty}
                  onChange={() => handleAgreementChange("thirdParty")}
                />
                <div
                  className="h-6 w-6 flex justify-center items-center rounded-full border-2"
                  style={{
                    backgroundColor: agreements.thirdParty
                      ? companyInfo?.companyMainColor
                      : undefined,
                    borderColor: agreements.thirdParty
                      ? companyInfo?.companyMainColor
                      : "#D1D5DB", // fallback gray-300
                  }}>
                  {agreements.thirdParty && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-800">
                  [필수] 개인정보 제3자 제공 동의
                </span>
              </label>
              <button
                onClick={() => setIsThirdPartyModalOpen(true)}
                className="text-gray-400 text-sm underline">
                보기
              </button>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs">
              고객은 제3자 정보 제공 동의를 거부할 권리가 있습니다.
              <br />
              단, 동의하지 않을 경우 서비스 이용 목적에 따른
              <br />
              서비스 제공에 제한이 따르게 됩니다.
            </p>
          </div>
          {showErrorMessage && (
            <div className="flex justify-center items-center mt-16">
              <p className="text-red-600 text-sm mb-4 text-center">
                필수항목에 모두 동의해주세요
              </p>
            </div>
          )}
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
        </div>
      </LoginLayout>
      <PolicyModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        policy={[
          {
            title: "서비스 이용약관",
            content: "서비스 이용약관 내용...",
            updatedAt: "2024.03.23",
          },
        ]}
      />
      <PolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        policy={[
          {
            title: "개인정보처리방침",
            content: "개인정보처리방침 내용...",
            updatedAt: "2024.03.23",
          },
        ]}
      />
      <PolicyModal
        isOpen={isThirdPartyModalOpen}
        onClose={() => setIsThirdPartyModalOpen(false)}
        policy={[
          {
            title: "제3자 제공 동의",
            content: "제3자 제공 동의 내용...",
            updatedAt: "2024.03.23",
          },
        ]}
      />
    </>
  );
}
