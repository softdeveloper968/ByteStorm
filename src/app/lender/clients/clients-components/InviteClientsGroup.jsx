"use client";

import { useSession } from "next-auth/react";
import Papa from "papaparse";
import { useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function InviteClientsGroup() {
	const { data: session, update: updateSession } = useSession();

	const [csvMessage, setCSVMessage] = useState(null);
	const [error, setError] = useState("");
	const [clientsFromCsv, setClientsFromCsv] = useState([]);
	const [editTableClients, setEditTableClients] = useState([]);


	const clearCSVForm = (event) => {
		event.preventDefault();
		setCSVMessage(null);
		setClientsFromCsv([]);

		// Clear file input text.
		const csvInput =
			document.getElementById("csv");
		csvInput.value = "";
	};

	function handleFileChange(event) {
		const file = event.target.files[0];

		if (file) {
			Papa.parse(file, {
				complete: (result) => {
					let nameIndex;
					let emailIndex;
					let phoneIndex;

					if (result.data.length > 0) {
						const headers = result.data[0];

						nameIndex = headers.findIndex(header => header.toLowerCase().includes('name'));
						emailIndex = headers.findIndex(header => header.toLowerCase().includes('email'));
						phoneIndex = headers.findIndex(header => header.toLowerCase().includes('phone'));
					};

					const dataWithoutHeader = result.data.slice(1).filter(row => row.some(cell => cell));
					const clients = (dataWithoutHeader.map(row => ({
						name: nameIndex !== -1 ? row[nameIndex] : null,
						email: emailIndex !== -1 ? row[emailIndex] : null,
						phone: phoneIndex !== -1 ? row[phoneIndex] : null
					})));

					setClientsFromCsv(clients);
					setEditTableClients(clients);
				},
				header: false
			});
		};
	};

	const handleClientEdit = (index, field, value) => {
		const newEditTableClients = [...editTableClients];

		newEditTableClients[index][field] = value;

		setEditTableClients(newEditTableClients);
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		const token = session?.user.token;

		if (clientsFromCsv.length > 0) {
			const client = {
				"clients": clientsFromCsv
			};

			try {
				const response = await fetch(`${baseURL}/lender/invite_client`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(client)
				});
	
				if (response.ok) {
					const success = await response.json();
	
					setCSVMessage(success.message);
					setError(null);
					updateSession();
				} else if (response.status === 400) {
					const error = await response.json();
	
					setError(error.message);
				} else {
					throw new Error(`${response.status} ${response.statusText}`);
				};
			} catch (error) {
				setCSVMessage(null);
				setError(String(error));
			};
		} else {
			console.log("No clients from csv")
		};
	};

	return (
		<form
			className="flex bg-mw_white rounded-lg max-h-[95%] w-full"
			onSubmit={onSubmit}
		>
			<section className="w-full p-8 overflow-y-scroll">
				<div className="flex justify-between h-10 mb-6">
					<p className="text-xl pb-4">
						Upload CSV
					</p>

					{csvMessage &&
						<div className="flex justify-end items-center gap-8">
							<label className="text-mw_olive">
								{csvMessage}
							</label>

							<button
								className="bg-mw_olive text-mw_black rounded-lg w-40 p-2 cursor-pointer"
								onClick={event  => clearCSVForm(event)}
							>
								Clear Form
							</button>
						</div>
					}
				</div>

				<input
					id="csv"
					type="file"
					className="mw-input-file-select w-full"
					placeholder=""
					onChange={handleFileChange}
				/>

				{clientsFromCsv.length > 0 && (
					<div className="flex flex-col max-h-[80%] mt-6 w-full">
						<p className="mb-6">
							Verify Client Data:
						</p>

						<div className="flex flex-col overflow-y-scroll">
							<div className="flex justify-center gap-6 max-h-[10%]">
								<p className="text-center w-2/5">Name</p>
								<p className="text-center w-1/5">Phone</p>
								<p className="text-center w-2/5">Email</p>
							</div>

							<div className="flex flex-col flex-grow overflow-y-scroll">
								{clientsFromCsv.map((client, index) => (
									<div
										key={index}
										className="flex gap-6 justify-center"
									>
										<input
											type="text"
											id={`${index}${client.name}`}
											className="mw-input w-2/5 mt-1"
											defaultValue={client.name}
											onChange={e => handleClientEdit(index, 'name', e.target.value)}
										/>

										<input
											type="text"
											id={`${index}${client.phone}`}
											className="mw-input text-center w-1/5 mt-1"
											defaultValue={client.phone}
											onChange={e => handleClientEdit(index, 'phone', e.target.value)}
										/>

										<input
											type="email"
											id={`${index}${client.email}`}
											className="mw-input w-2/5 mt-1"
											defaultValue={client.email}
											onChange={e => handleClientEdit(index, 'email', e.target.value)}
										/>
									</div>
								))}
							</div>
						</div>

						<div className="flex justify-center mt-8">
							<button
								type="submit"
								className="bg-mw_red text-white rounded-lg w-40 p-2 cursor-pointer"
							>
								Send Invite Emails
							</button>
						</div>
					</div>
				)}
			</section>
		</form>
	);
};
