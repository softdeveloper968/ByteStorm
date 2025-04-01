"use client";

import LoginMobile from "@/app/login/LoginMobile";
import LoginPassword from "@/app/login/LoginPassword";
import SelectUserRole from "@/components/SelectUserRole";
import { useState } from "react";

export default function Login() {
  const roles = ["user", "realtor", "lender"];

  const [role, setRole] = useState(roles[0]);
  const [mobile, setMobile] = useState(true);
  const [action] = useState("Log In");

  const option = "text-center rounded-t-xl p-2 cursor-pointer";
  const optionSelected = "bg-mw_olive text-white";

  return (
    <main className="container header-space">
      <div className="flex flex-col justify-center items-center md:h-screen md:my-16 lg:my-4">
        <div className="w-full max-w-[400px] bg-mw_white text-mw_black border-mw_olive border-t-[5px] rounded-lg shadow-xl p-5">
          <SelectUserRole
            roles={roles}
            role={role}
            setRole={setRole}
            action={action}
          />

          {role === "user" ? (
            <div className="flex bg-white w-full rounded-t-xl h-[40px] border-slate-200	border-b-[1px]">
              <div
                className={
                  `flex items-center justify-center w-1/2 ${option} ` +
                  (mobile ? `${optionSelected}` : "")
                }
                onClick={() => setMobile(true)}
              >
                <h5 className="font-medium text-sm">Receive Text Code</h5>
              </div>
              <div
                className={
                  `flex items-center justify-center w-1/2 ${option} ` +
                  (!mobile ? `${optionSelected}` : "")
                }
                onClick={() => setMobile(false)}
              >
                <h5 className="font-medium text-sm">Use Password</h5>
              </div>
            </div>
          ) : (
            <div className="flex bg-white w-full rounded-t-xl"></div>
          )}
          {role === "user" && mobile ? (
            <LoginMobile />
          ) : (
            <LoginPassword role={role} />
          )}
        </div>
      </div>
    </main>
  );
};
