"use client";
import Image from "next/image";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <div className="flex flex-col h-screen bg-white w-full mx-auto">
        <div className="w-full h-[33vh] bg-red-500 overflow-hidden relative">
          <Image
            src="/assets/images/login_bg_mounjaro.png"
            alt="login-bg"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="flex justify-center items-center w-full px-4 md:px-0 mt-7">
          <div className="w-full max-w-lg mx-auto px-6">{children}</div>
        </div>
      </div>
    </>
  );
}
