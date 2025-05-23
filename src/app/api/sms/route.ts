import { NextResponse } from "next/server";

// token 발급
const getToken = async () => {
  const params = new URLSearchParams();
  params.append("email", "aimit@aimmed.com");
  params.append("password", "aimmed1%^&");
  const resData = await fetch("https://api.aimmed.com/api/login", {
    method: "POST",
    body: params,
  });
  if (resData.ok) {
    return NextResponse.json({ data: await resData.json() });
  } else {
    return NextResponse.json({ data: "no token" }, { status: 400 });
  }
};

export async function POST(request: Request) {
  const smsUserInfo = await request.json();
  const { phoneNumber, id } = smsUserInfo;
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const message = `인증번호는 [${verificationCode}] 입니다.`;
    const smsData = {
      // user_id: String(session.user.id),
      user_id: String(id),
      subject: "인증번호 발송",
      sms_msg: message,
      dest_info: phoneNumber.replace(/-/g, ""),
      reserved4: "",
      callback: "0230157299",
    };

    const token = await getToken();
    const tokenData = await token.json();
    const response = await fetch(`https://api.aimmed.com/v1/sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.data.token}`,
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify(smsData),
    });

    if (!response.ok) {
      throw new Error("SMS 전송 실패");
    } else {
      return NextResponse.json({
        success: true,
        message: "SMS 전송 성공",
        verificationCode: verificationCode,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "SMS 전송 실패",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
