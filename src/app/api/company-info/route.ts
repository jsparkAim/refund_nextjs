import { NextResponse } from "next/server";

export async function GET() {
  // TODO : 실제 DB로 연결 필요
  const companyData = {
    companyCode: "kiscali",
    companyName: "키스칼리",
    companyMainColor: "#A3D8F4", // 파스텔 블루
    companySub1Color: "#FFD6E0", // 파스텔 핑크
    companySub2Color: "#FFF5BA", // 파스텔 옐로우
    companySub3Color: "#B6E2D3", // 파스텔 민트
  };

  return NextResponse.json(companyData);
}
