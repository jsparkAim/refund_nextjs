import { CheckUserResponse, UserStatus } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest
): Promise<NextResponse<CheckUserResponse>> {
  try {
    const { name, phoneNumber } = await request.json();

    const findResult = await prisma.rf_mbr.findUnique({
      where: {
        name: name,
        phone_number: phoneNumber,
      },
    });

    if (!findResult) {
      return NextResponse.json({ status: UserStatus.NOT_FOUND });
    }

    return NextResponse.json({ status: UserStatus.EXISTING });
  } catch (error) {
    console.error("API error in find-user-password >>", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
