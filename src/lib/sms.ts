import { NextResponse } from "next/server";

export const sendVerificationCode = async ({
  phoneNumber,
  id,
}: {
  phoneNumber: string;
  id: string;
}) => {
  try {
    const response = await fetch("/api/sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, id }),
    });
    const data = await response.json();
    const verificationCode = data.verificationCode;

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: response.statusText || "Failed to send SMS",
          error: response.statusText || "알 수 없는 에러",
        },
        { status: response.status }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "SMS 전송 성공",
        verificationCode: verificationCode,
      });
    }
  } catch (error) {
    console.error("SMS 인증번호 전송 중 에러 발생:", error);
    throw error;
  }
};
