import { CheckUserResponse, User, UserStatus } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest
): Promise<NextResponse<CheckUserResponse>> {
  const { phoneNumber, password } = await request.json();

  const userByPhone = await prisma.rf_mbr.findUnique({
    where: {
      phone_number: phoneNumber,
    },
  });

  if (!userByPhone) {
    return NextResponse.json({ status: UserStatus.NOT_FOUND });
  }

  if (userByPhone.pw !== password) {
    return NextResponse.json({ status: UserStatus.PASSWORD_MISMATCH });
  }

  if (userByPhone.mbr_stts_cd === "91") {
    // 91 : 강제탈퇴회원
    return NextResponse.json({ status: UserStatus.USER_RESTRICTIONS });
  }

  // 기존 회원
  const user: User = {
    id: userByPhone.id,
    name: userByPhone.name,
    gender: userByPhone.gender,
    birth_date: userByPhone.birth_date,
    phone_number: userByPhone.phone_number,
    auth_token: userByPhone.auth_token,
  };

  return NextResponse.json({ status: UserStatus.EXISTING, user });
}
