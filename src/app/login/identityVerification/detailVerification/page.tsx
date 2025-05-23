"use client";

import PortOne from "@portone/browser-sdk/v2";

export default function DetailVerification() {
  console.log("DetailVerification");
  // 다날 pass 인증요청
  const passVerification = async () => {
    const response = await PortOne.requestIdentityVerification({
      // isTestChannel: true,
      storeId: "store-6e272ba2-2475-4700-95b7-f8ab1424c9e0",
      identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      channelKey: "channel-key-6433fec4-f453-414f-85bc-ce3e9f9731cb",
      // redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/identity-verifications`, // api 단에서 유저의 정보 확인
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login/identityVerification`,
    });
  };

  return (
    <>
      <div>
        <p onClick={passVerification}>본인인증 진행</p>
      </div>
    </>
  );
}
