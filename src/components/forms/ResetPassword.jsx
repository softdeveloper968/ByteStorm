"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function ResetPassword() {
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");
	const [response,setResponse] = useState('');

	const router = useRouter();

	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const account = searchParams.get("account") || "realtor";
	const token = searchParams.get("token");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}
		
		if (password !== passwordConfirm) {
			setError("Passwords do not match");
			return;
		}

		try {
			const res = await fetch(`${baseURL}/${account}/reset_password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
					token: token,
					password: password 
				}),
			});

			const response = await res.json();
			if (res.error || res.status !== 200) {
				setResponse(response.message)
				return;
			};

			setResponse(response.message)
			router.push("/login");
		} catch (error) {
			console.log(error);
		};
	};

	return (
		<form
			className="flex flex-col bg-white rounded-xl h-[300px] gap-4 p-4"
			onSubmit={handleSubmit}
		>
			<h2 className="text-xl text-center font-bold">Change Password</h2>
			<input
				name="password"
				type="password"
				className="mw-input"
				autoComplete="off"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>

			<input
				name="passwordConfirm"
				type="password"
				className="mw-input"
				autoComplete="off"
				placeholder="Confirm Password"
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>

			<button
				className="bg-mw_olive hover-scale-btn border-2 hover:border-mw_olive text-white font-bold rounded-lg mt-2 px-6 py-2 hover:bg-mw_gray border-2 hover:border-mw_olive hover:text-mw_black transition duration-150 ease-in-out cursor-pointer">
				Reset Password
			</button>

			{error && (
				<div
					className="
						bg-red-500 
						text-galaxy_black-700
						text-center
						text-sm
						rounded-md
						py-1
						px-3
						mt-2
					"
				>
					{error}
				</div>
			)}
			
			{response && 
					<div className="flex bg-mw_red justify-center items-center rounded-lg h-10 mt-2">
						{response}
					</div> }

			<div className="flex justify-center">
				<Link
					className="text-sm text-center mt-2"
					href={"/signup"}
				>
					<p>Don't Have an Account? <span className="text-sm ml-1 text-mw_olive no-underline">Apply</span></p>
				</Link>
			</div>

		</form>
	);
};
