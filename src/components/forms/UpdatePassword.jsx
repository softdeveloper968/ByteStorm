"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function UpdatePassword() {
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const { data: session } = useSession();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = session.user.token;
			const res = await fetch(`${baseURL}/user/update_password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ password: password }),
			});

			if (res.status === 200) {
				setMessage("Password updated successfully");
			} else {
				setError("Failed to update password");
			}
		} catch (error) {
			console.log(error)
		};
	};

	return (
		<form
			className="flex flex-col gap-6 bg-mw_olive rounded-xl p-4 mt-6"
			onSubmit={handleSubmit}
		>
			<div className="text-mw_black text-2xl text-center">
				Create or Update Password
			</div>

			<input
				name="userPassword"
				type="password"
				className="mw-input"
				autoComplete="off"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button className="bg-mw_green text-mw_black font-bold rounded-xl px-6 py-2 cursor-pointer">
				Create/Update
			</button>

			{message && (
				<div className="bg-mw_green text-mw_black text-center text-sm rounded-md py-1 px-3 mt-1">
					{message}
				</div>
			)}

			<div className="h-12 mt-4">
				{error && (
					<div className="bg-mw_red text-mw_black text-center text-sm rounded-md py-1 px-3 mt-1"
					>
						{error}
					</div>
				)}
			</div>
		</form>
	);
};
