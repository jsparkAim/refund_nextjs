export const companyThemes = {
  aimmed: {
    primary: "blue",
    secondary: ["red", "yellow", "pink"],
  },
  kiscali: {
    primary: "green",
    secondary: ["orange", "gray", "lime"],
  },
  maunjaro: {
    primary: "purple",
    secondary: ["indigo", "rose", "fuchsia"],
  },
};

export type CompanyCode = keyof typeof companyThemes;
