import { signIn } from "next-auth/react";
import { create } from "zustand";

export const UserSignUpState = Object.freeze({
  CREATE_ACCOUNT: Symbol(1),
  PHONE_NUMBER: Symbol(2),
  VERIFICATION_CODE: Symbol(3),
  COMPLETED: Symbol(4),
});
/**
 *
 */
const useSafeStore = create((set, get) => ({
  signUpState: UserSignUpState.CREATE_ACCOUNT,
  // signUpState: UserSignUpState.PHONE_NUMBER,
  // signUpState: UserSignUpState.VERIFICATION_CODE,
  email: "",
  phoneNumber: 0,
  code: "",
  firstName: "",
  lastName: "",
  mwTerms: false,
  smsAgreement: false,
  errorMessage:"",
  agentCode: "",
  suggestedPassword: "",
  token: "",
  setUser: (updatedUser) => {
    set({ ...get(), ...updatedUser });
  },
  next: async () => {
    switch (get().signUpState) {
      case UserSignUpState.CREATE_ACCOUNT: {
        const response = await createAccount(
          get().firstName,
          get().lastName,
          get().email
        );
        if (response)
          set({ ...get(), signUpState: UserSignUpState.PHONE_NUMBER });

        return response;
      }

      case UserSignUpState.PHONE_NUMBER: {
        let response;
        if(get().smsAgreement) {
          response = await sendOTP(get().email, get().phoneNumber);
        }
        if (response)
          set({ ...get(), signUpState: UserSignUpState.VERIFICATION_CODE });

        return response;
      }

      case UserSignUpState.VERIFICATION_CODE: {
        const response = await verifyOtp(
          get().code,
          get().phoneNumber,
          get().email
        );
        if (response) {
            set({ ...get(), signUpState: UserSignUpState.COMPLETED });
        }
        return response;
      }
    }
  },
  refresh: () =>
    set({
      ...get(),
      signUpState: UserSignUpState.CREATE_ACCOUNT,
      email: "",
      phoneNumber: 0,
      code: "",
      firstName: "",
      lastName: "",
      mwTerms: false,
      agentCode: "",
      suggestedPassword: "",
      token: "",
    }),
}));
export default useSafeStore;

/**
 *
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @returns {Promise<boolean>} indicating if the operation was successful
 */
async function createAccount(firstName, lastName, email) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const headers = {
    "Content-Type": "application/json",
    mode: "no-cors",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
  };
  const body = JSON.stringify({ firstName, lastName, email, device: "Web" });
  const config = { method: "post", headers, body };
  const response = await fetch(`${baseUrl}/user/register`, config);
  return response.status >= 200 && response.status < 300;
}

/**
 * @param {string} email
 * @param {number} phonenumber
 */
export async function sendOTP(email, number) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const headers = {
    "Content-Type": "application/json",

    mode: "no-cors",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
  };
  const phonenumber = formatNumber(number)
  const body = JSON.stringify({ email, phonenumber });

  console.log(phonenumber,"phonenumber");
  const config = { method: "post", headers, body };
  const response = await fetch(`${baseUrl}/user/send_verification`, config);
  return response.status >= 200 && response.status < 300;
}

/**
 * @param {string} code
 * @param {number} phonenumber
 */
async function verifyOtp(code, phonenumber, email) {

  const response = await signIn("OTP", {
    phoneNumber: phonenumber,
    code: code,
    email: email,
    redirect: false,
  });
  return response.status >= 200 && response.status < 300;
}

/**
 * @param {string} token
 * @param {string} password
 */
export async function suggestPassword(token, password) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const headers = {
    "Content-Type": "application/json",
    mode: "no-cors",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify({ password });
  const config = { method: "post", headers, body };
  const response = await fetch(`${baseUrl}/user/update_password`, config);
  return response.status >= 200 && response.status < 300;
}

/**
 * @param {number} length
 */
export function generatePassword(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex);
  }
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasLowercase || !hasUppercase || !hasNumber) {
    return generatePassword(length);
  }

  return password;
}


function formatNumber(number) {
  return number.toString().replace(/^(\d)(\*+)/, "$1-$2");
}