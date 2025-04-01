"use client";

import PasswordResetRquest from "@/components/forms/PasswordResetRequest";
import SelectUserRole from "@/components/SelectUserRole";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const roles = ["user", "realtor", "lender"];

  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role");

  const [role, setRole] = useState(defaultRole || roles[0]);
  const [action] = useState("Request Password Reset");

  return (
    <main className="container header-space">
      <div className="flex flex-col justify-center items-center md:h-screen">
        <div className="w-full max-w-[400px] bg-mw_white text-mw_black border-mw_olive border-t-[5px] rounded-lg shadow-xl p-5">
          <SelectUserRole
            roles={roles}
            role={role}
            setRole={setRole}
            action={action}
          />
          <PasswordResetRquest role={role} />
        </div>
      </div>
    </main>
  );
};
