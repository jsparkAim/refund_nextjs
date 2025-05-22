"use client";

import { useCompanyStore } from "@/store/useCompanyStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchCompanyInfo } from "@/lib/api/company";

export function CompanyInitializer() {
  const setCompany = useCompanyStore((state) => state.setCompany);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const { data, isLoading, error } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: fetchCompanyInfo,
    staleTime: 5 * 60 * 1000, // 5분
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (data) {
      setCompany(data);
    }
  }, [data, setCompany]);

  useEffect(() => {
    if (error) {
      console.error("회사 정보 fetch 실패:", error);
    }
  }, [error]);

  return null;
}
