import { FormLayout } from "@/app/usignup/formLayout";
import { InputWithLabel } from "@/app/usignup/inputWithLabel";
import { PrimaryButtonSignUp } from "@/app/usignup/page";
import useSafeStore from "@/app/usignup/safeStore";
import { checkRequired } from "@/app/usignup/validation";
import React, { useEffect, useState } from "react";

export const CreateAnAccount = () => {
  const signUpStore = useSafeStore();
  const [success, setSuccess] = useState(true);
  const updateStore = (userState) => {
    signUpStore.setUser({ ...userState });
  };

  function handleClick() {
    if (checkRequired()) {
      signUpStore.next().then((res) => {
        // console.log(res);
        setSuccess(res);
        setTimeout(() => setSuccess(true), 1000);
      });
    }
  }

  const firstRef = React.useRef(null);
  const emailRef = React.useRef(null);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, [success]);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current.focus();
    }
  }, []);

  return (
    <FormLayout title={<p className="text-3xl md:text-[32px] font-roboto text-[#272424] font-medium !mb-4">{"Create an account"}</p>}
      subtitle={<p className="text-[#272424] text-lg md:text-xl">{"Submit your details to join the MustWants community and get personalized home matches."} </p>}
    >
      <div  className="input-full-width flex justify-between gap-8 w-full" >
        <InputWithLabel
          reff={firstRef}
          label={"First Name"}
          vslue={signUpStore.firstName ?? ""}
          type={"text"}
          onChange={(e) => updateStore({ firstName: e })}
          $required={true}
        />
        <InputWithLabel
          label={"Last Name"}
          $required={true}
          value={signUpStore.lastName ?? ""}
          type={"text"}
          onChange={(e) => updateStore({ lastName: e })}
        />
      </div>
      <div className="w-full">
      <InputWithLabel
        label={"Email"}
        type={"email"}
        reff={emailRef}
        value={signUpStore.email ?? ""}
        error={success ? "false" : "true"}
        placeholder={!success ? "This email is already in use." : ""}
        $required={true}
        onChange={(e) => updateStore({ email: e })}
      />
      <p className="text-[13px] text-stone-700 !mt-1">MustWants values your privacy. We never sell your data.</p>
      </div>
     
      <InputWithLabel
        label={"Agent of lender affiliate code"}
        type={"text"}
        value={signUpStore.agentCode ?? ""}
        onChange={(e) => updateStore({ agentCode: e })}
      />
      <CheckBoxWithTerms
        onChange={(e) => updateStore({ mwTerms: Boolean(e) })}
        checked={signUpStore.mwTerms ?? ""}
        $required={true}
      />
      <PrimaryButtonSignUp
        text={"Continue"}
        onClick={handleClick}
        // disabled={!signUpStore.mwTerms || !signUpStore.firstName || !signUpStore.lastName || !signUpStore.email}
      />
      {/*<p>Already have an account? <NavLink to={config.links.login} className={"red-link"}>Sign In</NavLink></p>*/}
    </FormLayout>
  );
};
export const CheckBoxWithTerms = (props) => {
  const useStore = useSafeStore();
  return (
    <div
      aria-required={props.$required}
      onClick={() => {
        if (useStore.mwTerms) {
          props.onChange("");
        } else {
          props.onChange("1");
        }
      }}
      className="requird-condition relative flex items-start cursor-pointer w-full"
    >
      <input
        type={"checkbox"}
        required={props.$required}
        checked={useStore.mwTerms}
        value={props.checked}
        className="mr-2 mt-[3px]"
        onChange={(e) => {
          props.onChange(e.target.checked ? "1" : "");
        }}
      />
      <div className={" text-[13px]"}>
        By clicking on checkbox you are accepting <a href="/footer/terms-conditions" className="underline" target="_blank">MW terms and conditions.</a>
      </div>
    </div>
  );
};
