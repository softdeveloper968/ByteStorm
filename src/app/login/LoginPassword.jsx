"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Submit({ role }) {
  return (
    <div className="flex flex-col">
      <Link
        className="text-sm text-center mt-2"
        href={role === "user" ? "/usignup" : `/signup?role=${role}`}
      >
        <p>
          <LoginButton
            text={role === "user" ? "Join Must Wants Community" : "Apply Here"}
          />
        </p>
      </Link>
    </div>
  );
}

export function LoginButton(props) {
  return (
    <button
      className="bg-mw_olive text-white font-bold rounded-lg px-6 py-2 border-2
					hover:bg-mw_gray hover:text-mw_black transition duration-150 hover-scale-btn ease-in-out cursor-pointer hover:border-mw_olive"
    >
      {props.text}
    </button>
  );
}

export default function LoginPassword({ role }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const capitalizeRole = (role) => {
    const capitalized = role.charAt(0).toUpperCase() + role.slice(1);

    return capitalized;
  };

  useEffect(() => {
    setError(null);
  }, [role]);

  const onSubmit = async (data) => {
    const email = data.userEmail;
    const password = data.userPassword;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });

      if (!role) {
        setError("Must select Log In type");
        return;
      }

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      if (role) router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

	return (
		<form
			className="flex flex-col bg-white rounded-b-xl p-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className="text-xl text-center font-bold mb-4">
				{`Login to ${capitalizeRole(role)} Account`}
			</h2>

			<div className="flex flex-col mb-2">
					<label
						htmlFor="userEmail"
					>
						Email
					</label>

				<input
					type="email"
					id="userEmail"
					name="userEmail"
					className="mw-input !mt-1 !ml-0"
					{...register("userEmail", {
						required: "Email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2,4}|realtor)$/i,
							message: "Invalid email address"
						}
					})}
					placeholder="jsmith@email.com"
					autoComplete="off"
				/>
				{errors.userEmail &&
						<p className="text-mw_red text-sm mt-1">
							{errors.userEmail?.message}
						</p>
					}
			</div>

			<div className="flex flex-col mb-2">
					<label
						htmlFor="userPassword"
					>
						Password
					</label>

				<input
					type="password"
					id="usePassword"
					name="userPassword"
					className="mw-input !mt-1 !ml-0"
					{...register("userPassword", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "At least 8 characters required."
						}
					})}
					placeholder="password"
					autoComplete="current_password"
				/>
				{errors.userPassword &&
						<p className="text-mw_red text-sm mt-1">
							{errors.userPassword?.message}
						</p>
					}
			</div>
			<div className="flex flex-col mb-2">
			<Link
					className="text-end"
					href={role ? `/login/reset-password?role=${role}` : `/login/reset-password`}
				>
					<span className="text-xs rounded-lg text-mw_olive no-underline"
					>
						Forgot Password?
					</span>
				</Link>
			</div>
			<div className="flex flex-col mb-2">
				<button className="bg-mw_olive text-white font-bold rounded-lg px-6 py-2 border-2
					hover:bg-mw_gray hover:text-mw_black transition duration-150 hover-scale-btn ease-in-out cursor-pointer hover:border-mw_olive"
				>
					Log In
				</button>

				{error && error ? (
					<div className="flex bg-mw_red justify-center items-center rounded-lg h-10 mt-2">
						{error}
					</div>
				) : (
					<div
						className="flex text-mw_olive justify-center items-center rounded-lg hover:text-mw_turq cursor-pointer"
						onClick={() => {
							if (role === "realtor")
								router.push("signup/status-realtor");

              if (role === "lender") router.push("signup/status-lender");
            }}
          >
            {role === "realtor" || role === "lender" ? (
              <span className="mt-3">Check Application Status</span>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className="or-login my-1 text-center text-sm relative">
        <span className="text-slate-300 bg-white px-2 relative">Or</span>
      </div>
      <Submit role={role} />
    </form>
  );
}
