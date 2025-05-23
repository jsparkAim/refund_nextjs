import { Button } from "@/components/common/Button";
import { useUserStore } from "@/store/userStore";
import { VerificationInputProps } from "@/types/auth";
import Image from "next/image";
import { useState } from "react";

export const VerificationInput: React.FC<VerificationInputProps> = ({
  phone,
  handleSendVerification,
  verificationData,
  onVerificationComplete,
}) => {
  const { isVerificationSent, verificationCode, verificationError, timeLeft } =
    verificationData;

  const [inputValue, setInputValue] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length === 6) {
      if (String(value) === String(verificationCode)) {
        setIsVerified(true);
        setErrorMsg("");
        onVerificationComplete(true);
      } else {
        setIsVerified(false);
        setErrorMsg("인증번호를 다시 확인해주세요.");
        onVerificationComplete(false);
      }
    } else {
      setIsVerified(false);
      setErrorMsg("");
      onVerificationComplete(false);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-[14px] font-normal leading-[18px] text-gray-600">
          휴대폰번호
        </label>
        <input
          id="phone"
          type="tel"
          disabled
          value={phone}
          className="w-full px-4 h-[45px] border border-gray-400 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          inputMode="numeric"
          required
        />
        <div className="flex items-center justify-end w-fit ml-auto gap-2 bg-white border border-gray-400 p-1.5 rounded-[5px]">
          <Image
            src="/assets/images/mail.png"
            alt="mail icon"
            width={16}
            height={16}
            className="align-middle"
          />
          <Button
            className="text-xs px-2 h-6 flex items-center text-gray-800 bg-white"
            variant="ghost"
            onClick={handleSendVerification}
            disabled={isVerificationSent}>
            인증번호 전송
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="verificationCode"
          className="text-[14px] font-normal leading-[18px] text-gray-600">
          인증번호
        </label>
        <div className="relative">
          <input
            id="verificationCode"
            value={inputValue}
            onChange={handleVerificationCodeChange}
            disabled={!isVerificationSent}
            placeholder="인증번호를 입력해주세요"
            className={`w-full px-4 h-[45px] border rounded-[5px] focus:outline-none focus:ring-2 
              ${isVerificationSent ? "border-yellow-500" : ""}
              ${verificationError ? "border-red-500" : "border-gray-400"}`}
            maxLength={6}
            required
          />
          {/* 인증번호 전송 후 타이머 */}
          {isVerificationSent && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
              {`${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(
                timeLeft % 60
              ).padStart(2, "0")}`}
            </div>
          )}
        </div>
        <p
          className={`text-[13px] font-medium leading-[18px] ${
            errorMsg ? "text-red-500" : "text-gray-500"
          } cursor-pointer`}>
          {!isVerificationSent
            ? "인증번호 전송을 요청해주세요"
            : errorMsg
            ? errorMsg
            : isVerified
            ? "인증이 완료되었습니다."
            : "인증번호가 발송되었습니다. 번호를 입력해주세요."}
        </p>
      </div>
    </>
  );
};
