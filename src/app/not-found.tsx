"use client";
// import { Button } from "@/components/common/button/Button";
// import { useRouter } from "next/navigation";

export default function NotFound() {
  //   const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex justify-evenly pt-40">
      <div className="h-screen flex flex-col items-start relative space-y-10">
        {/* <Button
          onClick={() => router.push("/")}
          className="relative bg-neutral-400 hover:bg-neutral-500"
          size="lg">
          ← Go Home
        </Button> */}
        <div className="space-y-10">
          <h1 className="text-4xl font-bold">
            죄송합니다. 해당 페이지를 찾을 수 없습니다.
          </h1>
        </div>
      </div>
    </div>
  );
}
