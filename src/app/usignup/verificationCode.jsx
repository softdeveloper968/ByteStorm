import { FormLayout } from "@/app/usignup/formLayout";
import { NumberSlot } from "@/app/usignup/inputWithLabel";
import { PrimaryButtonSignUp, Subtitle } from "@/app/usignup/page";
import { ensureNumberOrEmpty } from "@/app/usignup/phoneNumber";
import useSafeStore, {
  generatePassword,
  sendOTP,
} from "@/app/usignup/safeStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export const VerificationCode = (props) => {
  const [success, setSuccess] = useState(true);
  const [sendCodeText, setSendCodeText] = useState("Resend Code");

  const title = "Enter your Verification Code";
  const expirationPolicy = "Code expire after 5 Minutes";
  const useStore = useSafeStore();
  const phoneNumber = useStore.phoneNumber || 12345677890;
  const first = React.useRef(null);
  const second = React.useRef(null);
  const third = React.useRef(null);
  const fourth = React.useRef(null);
  const fiveth = React.useRef(null);
  const nextRef = React.useRef(null);
  const last = useRef(null);
  const defaultOTP = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  };
  const [otp, setOtp] = useState(defaultOTP);
  useEffect(() => {
    // INFO: entering the page, you get the focus in the first
    if (first.current) {
      first.current.focus();
    }
  }, []);
  useEffect(() => {
    // INFO: changes the focus when completed
    if (otp["6"] && nextRef.current) {
      nextRef.current.focus();
    } else if (otp["5"] && last.current) {
      last.current.focus();
    } else if (otp["4"] && fiveth.current) {
      fiveth.current.focus();
    } else if (otp["3"] && fourth.current) {
      fourth.current.focus();
    } else if (otp["2"] && third.current) {
      third.current.focus();
    } else if (otp["1"] && second.current) {
      second.current.focus();
    }
  }, [otp]);

  const resetOTP = () => {
    setOtp(defaultOTP);
  };

  const router = useRouter();

  const resetCodeText = () => {
    resetOTP();
    setTimeout(() => {
      setSuccess(true);
      setSendCodeText("Resend Code");
    }, 2000);
  };

  async function resendOTP() {
    setSendCodeText("Sending...");
    const response = await sendOTP(
      useStore.email || "",
      useStore.phoneNumber || 0,
    );
    if (response) {
      setSendCodeText("Code Sent");
      resetCodeText();
    } else {
      setSendCodeText("Error sending");
      resetCodeText();
    }
  }

  const handleClick = () => {
    useStore.setUser({
      code: `${otp["1"]}${otp["2"]}${otp["3"]}${otp["4"]}${otp["5"]}${otp["6"]}`,
    });
    const password = generatePassword(8);
    useStore.setUser({ suggestedPassword: password });
    if (props.onClick)
      props.onClick(
        `${otp["1"]}${otp["2"]}${otp["3"]}${otp["4"]}${otp["5"]}${otp["6"]}`,
      );
    else {
      useStore.next().then((res) => {
       
        if (res) {
          router.push("/dashboard");
        } else {
          setSuccess(false);
          setSendCodeText("Something went wrong! please try after some time.");
          resetCodeText();
        }
      });
    }
  };

  function handleChange(label, e) {
    const newObject = {};
    newObject[label] = ensureNumberOrEmpty(e.target.value);
    setOtp((prev) => ({ ...prev, ...newObject }));
  }

  function handleKeyDown(label, e) {
    if (!otp[label] && e.key === "Backspace") {
      switch (label) {
        case 6:
          fiveth.current.focus();
          break;
        case 5:
          fourth.current.focus();
          break;
        case 4:
          third.current.focus();
          break;
        case 3:
          second.current.focus();
          break;
        default:
          first.current.focus();
      }
    }
  }

  return (
    <FormLayout title={<p className="text-3xl md:text-[32px] font-roboto text-[#272424] font-medium">{title}</p>} 
      subtitle={<Subtitle phoneNumber={phoneNumber} />}>
      <div className="gap-[0.2rem] flex items-center" >
        <NumberSlot
          ref={first}
          type={"number"}
          error={!success ? "true" : "false"}
          onChange={(e) => handleChange(1, e)}
          onKeyDown={(e) => handleKeyDown(1, e)}
          value={otp["1"]}
        />
        <NumberSlot
          ref={second}
          type={"number"}
          error={!success ? "true" : "false"}
          onChange={(e) => handleChange(2, e)}
          onKeyDown={(e) => handleKeyDown(2, e)}
          value={otp["2"]}
        />
        <NumberSlot
          ref={third}
          type={"number"}
          error={!success ? "true" : "false"}
          onChange={(e) => handleChange(3, e)}
          onKeyDown={(e) => handleKeyDown(3, e)}
          value={otp["3"]}
        />
        <NumberSlot
          ref={fourth}
          type={"number"}
          error={!success ? "true" : "false"}
          onChange={(e) => handleChange(4, e)}
          onKeyDown={(e) => handleKeyDown(4, e)}
          value={otp["4"]}
        />
        <NumberSlot
          ref={fiveth}
          type={"number"}
          error={!success ? "true" : "false"}
          onChange={(e) => handleChange(5, e)}
          onKeyDown={(e) => handleKeyDown(5, e)}
          value={otp["5"]}
        />
        <NumberSlot
          ref={last}
          error={!success ? "true" : "false"}
          onChange={(e) => handleChange(6, e)}
          onKeyDown={(e) => handleKeyDown(6, e)}
          value={otp["6"]}
        />
      </div>
      <p className={"text-[13px]"}>{expirationPolicy}</p>
      <p
        className={"red-link"}
        style={{ fontWeight: "bold" }}
        onClick={() => resendOTP()}
      >
        {sendCodeText}
      </p>
      <PrimaryButtonSignUp
        text={"Continue"}
        onClick={handleClick}
        ref={nextRef}
      />
    </FormLayout>
  );
};
