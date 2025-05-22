"use client";

import { Providers } from "@/app/providers";
import "./globals.css";
import { CompanyInitializer } from "@/components/system/CompanyInitializer";
import { GlobalLoading } from "@/components/common/GlobalLoading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>
          <GlobalLoading />
          <CompanyInitializer />
          <div className="container-custom">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
