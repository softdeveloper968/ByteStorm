"use client";

import ResetPassword from "@/components/forms/ResetPassword";

export default function ChangePassword() {
  return (
    <main className="container header-space">
      <div className="flex flex-col justify-center items-center md:h-screen">
        <div className="w-full max-w-[400px] bg-mw_white text-mw_black border-mw_olive border-t-[5px] rounded-lg shadow-xl p-5">
          <ResetPassword />
        </div>
      </div>
    </main>
  );
};
