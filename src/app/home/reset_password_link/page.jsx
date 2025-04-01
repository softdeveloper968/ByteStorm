"use client";

import SelectUserRole from "@/components/SelectUserRole";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function ResetPassword() {
	const roles = ["realtor", "lender"];

	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [role, setRole] = useState(roles[0]);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [action] = useState("Password Reset");

	const searchParams = useSearchParams()
	const id = searchParams.get('id');
	const token = searchParams.get('token');

	const handleSubmit = async (e) => {
		e.preventDefault();

		let res;

		try {
			if (password === passwordConfirm) {
				res = await fetch(`${baseURL}/${role}/reset_password`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ 'id': id, 'token': token, 'password': password }),
				});
			} else {
				setError("Passwords must match.");
			};

			if (res.error) {
				setError(error);
				return;
			};

			if (res.status == 200) {
				console.log(res);
				setSuccess("Password reset successful");
			}
		} catch (error) {
			console.log(error);
		};
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen pt-24 p-16">
			<div className="bg-white text-mw_black border-mw_olive border-t-8 rounded-lg w-[450px]
				shadow-xl p-4 overflow-y-scroll no-scrollbar"
			>
				<SelectUserRole roles={roles} role={role} setRole={setRole} action={action} />
				<form
					className="flex flex-col bg-mw_white rounded-xl h-[364px] gap-6 p-4"
					onSubmit={handleSubmit}
				>
					<div className="mt-16"></div>

					<input
						name="userPassword"
						type="password"
						className="p-2"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<input
						name="userPasswordConfirm"
						type="password"
						className="p-2"
						placeholder="Confirm Password"
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>

					{!success &&
						<button className="bg-mw_olive hover-scale-btn font-bold rounded-lg w-full mt-6 py-2 hover:bg-mw_turq cursor-pointer">
							Reset Password
						</button>
					}

					{error && (
						<div className="bg-mw_red text-center text-sm rounded-md py-1 px-3 mt-2">
							{error}
						</div>
					)}

					{success && (
						<div className="bg-mw_olive text-galaxy_black-700 text-center text-sm rounded-md
							py-1 px-3 mt-2"
						>
							{success}
						</div>
					)}

					<div className="flex justify-center">
						<Link
							className="bg-mw_green underline px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
								transition duration-150 ease-in-out hover-scale-btn"
							href={"/login"}
						>
							<p className="underline">
								Back to Login
							</p>
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
};
