// import { NextRequest } from "next/server";

import { CheckUserResponse, UserStatus } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse<CheckUserResponse>> {
  // TODO : 추후 수정

  // 기존 회원
  const existUser = {
    name: "박정수",
    gender: "M",
    birth_date: "1990-01-01",
    phone_number: "01046013390",
    CI: "1234567890123",
  };

  // 강제 탈퇴 회원
  const restrictUser = {
    name: "박정수",
    gender: "M",
    birth_date: "1990-01-01",
    phone_number: "01046013390",
    CI: "1234567890123",
  };

  let status: UserStatus;

  if (existUser) {
    status = UserStatus.EXISTING;
  } else if (restrictUser) {
    status = UserStatus.USE_RESTRICTIONS;
  } else {
    status = UserStatus.NEW;
  }

  return NextResponse.json({ status, user: existUser });
}
