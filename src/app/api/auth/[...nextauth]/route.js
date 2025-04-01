import {verifyOTP} from "@/utils/verifyOTP"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@xyz.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        let userRole = credentials.role;
        let userData = {};
        if (credentials.role == "realtor") {
          userData = {
            email: credentials?.email,
            password: credentials?.password,
            isRealtor: true,
          };
        } else if (credentials.role == "lender") {
          userData = {
            email: credentials?.email,
            password: credentials?.password,
            isLender: true,
          };
        } else if (credentials.role == "home_inspector") {
          userData = {
            email: credentials?.email,
            password: credentials?.password,
            isHomeInspector: true,
          };
        } else if (credentials.role == "title_insurance") {
          userData = {
            email: credentials?.email,
            password: credentials?.password,
            isTitleInsuranceAgent: true,
          };
        }else if (credentials.role == "property_manager") {
          userData = {
            email: credentials?.email,
            password: credentials?.password,
            isPropertyManager: true,
          };
        }  else if (credentials.role == "user") {
          userData = {
            email: credentials?.email,
            password: credentials?.password,
            isUser: true,
          };
        }

        try {
          const response = await fetch(`${baseURL}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
          const user = await response.json();
          if (response.ok && user && credentials.role == "realtor") {
            return { ...user.realtor, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "lender") {
            return { ...user.lender, userRole, token: user.token };
          }else if (response.ok && user && credentials.role == "home_inspector") {
            return { ...user.home_inspector, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "title_insurance") {
            return { ...user.user, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "property_manager") {
            return { ...user.user, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "business_partner") {
            return { ...user.user, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "attorney") {
            return { ...user.user, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "home_insurances") {
            return { ...user.user, userRole, token: user.token };
          } else if (response.ok && user && credentials.role == "user") {
            return { ...user.user, userRole, token: user.token };
          } else {
            console.log("no user found");

            return null;
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    CredentialsProvider({
      id: "OTP",
      name: "OTP",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        code: { label: "OTP Code", type: "text" },
        email: { label: "E-mail", type: "text" },
        role: { label: "role", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { phoneNumber, code, email, role } = credentials;
          let result;
          if (credentials.role === "user") {
            result = await verifyOTP(
              phoneNumber.toString(),
              code.toString(),
              email.toString()
            );
          } else if (role){
            result = await verifyOTP(
              phoneNumber.toString(),
              code.toString(),
              email.toString(),
              role.toString()
            );
          } else {
            result = await verifyOTP(
              phoneNumber.toString(),
              code.toString(),
              email.toString()
            );
          }
          if (result && result.token) {
            if (role === "user" || (!role && result.user)) {
              return { ...result.user, userRole: "user", token: result.token };
            }
            if (role === "lender") {
              return {
                ...result.lender,
                userRole: "lender",
                token: result.token,
              };
            }
            if (role === "realtor") {
              return {
                ...result.realtor,
                userRole: "realtor",
                token: result.token,
              };
            }
          } else {
            console.log("User not verified");
            throw new Error(result?.message || "User not verified.");
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    // CredentialsProvider({
    //   id: "OTP",
    //   name: "OTP",
    //   credentials: {
    //     phoneNumber: { label: "Phone Number", type: "text" },
    //     code: { label: "OTP Code", type: "text" },
    //     email: { label: "E-mail", type: "text" },
    //   },
    //   async authorize(credentials) {
    //     try {
    //       const { phoneNumber, code, email } = credentials;
    //       const result = await verifyOTP(
    //         phoneNumber.toString(),
    //         code.toString(),
    //         email.toString()
    //       );
    //       if (result && result.token) {
    //         console.log("User verified");
    //         console.log(result);

    //         return { ...result.user, userRole: "user", token: result.token };
    //       } else {
    //         console.log("User not verified");

    //         return null;
    //       }
    //     } catch (error) {
    //       console.log("Error: ", error);
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.user) {

        return { ...token, ...session };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
