"use client";

import { useEffect } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("HomeLayout");
  }, []);

  return <div>{children}</div>;
}
