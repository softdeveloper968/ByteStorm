"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function PasswordResetRquest({ role }) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [response,setResponse] = useState('');

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${baseURL}/${role}/request_password_reset`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: email }),
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

	const capitalizeRole = (role) => {
		const capitalized = role.charAt(0).toUpperCase() + role.slice(1);

		return capitalized
	};

	return (
		<form
			className="flex flex-col bg-white rounded-xl h-[300px] gap-4 p-4"
			onSubmit={handleSubmit}
		>
			<h2 className="text-xl text-center font-bold">{`Reset ${capitalizeRole(role)} Password`}</h2>
			<input
				name="userEmail"
				type="text"
				className="mw-input"
				autoComplete="off"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<button
				className="bg-mw_olive text-white hover-scale-btn font-bold rounded-lg mt-2 px-6 py-2 hover:bg-mw_gray border-2 hover:border-mw_olive hover:text-mw_black transition duration-150 ease-in-out cursor-pointer">
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
