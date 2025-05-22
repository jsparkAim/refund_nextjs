export const fetchCompanyInfo = async () => {
  const res = await fetch("/api/company-info");
  if (!res.ok) {
    throw new Error("회사 정보 fetch 실패");
  }
  return res.json();
};
