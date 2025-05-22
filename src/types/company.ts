export type CompanyInfo = {
  companyCode: string;
  companyName: string;
  companyMainColor: string;
  companySub1Color: string;
  companySub2Color: string;
  companySub3Color: string;
};

export type CompanyState = {
  company: CompanyInfo | null;
  setCompany: (company: CompanyInfo) => void;
  updateCompany: (partial: Partial<CompanyInfo>) => void;
};
