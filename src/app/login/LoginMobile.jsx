"use client";

import { LoginButton } from "@/app/login/LoginPassword";
import { parserPhoneNumber } from "@/app/usignup/phoneNumber";
import { requestOTP } from "@/utils/verifyOTP";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginMobile() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textSent, setTextSent] = useState(false);
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestOTP(email);
      if (response.phone_number) {
        setPhone(response.phone_number);
        setTextSent(true);
      } else {
        setError("No phone number found for this email");
      }
    } catch (error) {
      console.log(error);
      setError("Error sending verification text");
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    // console.log(email);
    try {
      const result = await signIn("OTP", {
        phoneNumber: phone,
        code: code,
        email: email,
        redirect: false,
      });

      if (result) {
        setVerified(true);
        router.replace("/buyer");
      } else {
        setError("SMS verification failed");
      }
    } catch (error) {
      console.log(error);
      setError("Error verifying code");
    }
  };

  return (
    <>
      {!textSent ? (
        <form
          className="flex flex-col bg-white rounded-b-xl h-[300px] gap-4 p-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl text-center font-bold mb-4">Mobile Log In</h2>
          <input
            name="userEmail"
            type="text"
            className="mw-input !m-0"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-mw_olive text-white font-bold rounded-lg mt-2 px-6 py-2 
						hover:bg-mw_gray border-2 hover:border-mw_olive hover-scale-btn hover:text-mw_black transition duration-150 ease-in-out cursor-pointer"
          >
            Text Me
          </button>
          <div className="or-login my-1 text-center text-sm relative">
            <span className="text-slate-300 bg-white px-2 relative">Or</span>
          </div>
          <div className="flex flex-col">
            <Link className="text-sm text-center mt-2" href={"/usignup"}>
              <p>
                <LoginButton text={"Join MustWants Community"} />
              </p>
            </Link>
          </div>
          {error && (
            <div className="bg-mw_red text-mw_black text-center text-sm rounded-md py-1 px-3 mt-2">
              {error}
            </div>
          )}
        </form>
      ) : (
        <form
          className="flex flex-col gap-4 bg-mw_olive rounded-b-xl h-[300px] p-4"
          onSubmit={handleSubmitCode}
        >
          {!verified && (
            <>
              <h2 className="text-center text-xl font-bold">
                Enter Verification Code
              </h2>
              <p className="text-center">
                We sent a verification code to:<br></br>
                {phone && parserPhoneNumber(phone)}
              </p>
              <p className="text-center">Code expires after 5 minutes</p>
            </>
          )}
          {verified && (
            <p className="text-center text-xl text-mw_gray mb-8">
              User Verified: {phone}
            </p>
          )}
          <input
            name="code"
            type="text"
            className="mw-input"
            autoComplete="off"
            placeholder="Code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="bg-mw_gray text-mw_black font-bold rounded-lg px-6 py-2 cursor-pointer">
            Verify
          </button>
          {error && (
            <div className="bg-mw_red text-mw_black text-center text-sm rounded-md py-1 px-3 mt-2">
              {error}
            </div>
          )}
        </form>
      )}
    </>
  );
}
