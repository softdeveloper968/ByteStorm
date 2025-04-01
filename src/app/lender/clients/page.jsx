"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ModalInviteClients from "../clients/clients-components/ModalInviteClients";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Clients() {
	const { data: session } = useSession();

	const [clients, setClients] = useState(null);
	const [noClients, setNoClients] = useState(false);
	const [error, setError] = useState("");

	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		try {
			if (session?.user.userRole === "lender") {
				const token = session.user.token;

				const fetchClients = async () => {
					const clientData = await fetch(`${baseURL}/lender/clients`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						}
					});

					if (clientData.status === 200) {
						const json = await clientData.json();
						if (json.message === "No clients found")
							setNoClients(true);
						else
							setClients(json);
					} else {
						setError("Failed to get clients");
					};
				};

				fetchClients().catch(console.error);
			};
		} catch (error) {
			console.log(error)
		};
	}, [session]);

	return (
		<main className="flex flex-col bg-mw_white text-black w-full py-16 mb-8">
			{session?.user.userRole !== "lender" &&
				<>
					<p className="font-bold text-center text-3xl mt-12 mb-16">
						Lender Clients
					</p>

					<p className="text-mw_red text-center text-3xl">
						Must be logged in as Lender to view.
					</p>
				</>
			}

			{session?.user.userRole === "lender" &&
				<div className="flex flex-col w-full text-center mt-16 p-10">
					<section className="pb-10">
						{/* <Link
							href={"/agents/invite"}
						> */}
						<button
							className="flex justify-evenly items-center bg-mw_olive text-mw_black space-x-4
								rounded-xl w-40 p-1 cursor-pointer"
							onClick={() => openModal()}
						>
							Invite Clients
							<FaPlus className="h-4 w-4" />
						</button>
						{/* </Link> */}
					</section>

					<section className="bg-mw_white rounded-2xl p-4">
						<div className="flex flex-row text-mw_black border-mw_black border-b-2 pb-4">
							<p className="text-xl font-bold w-[50%]">
								Client List
							</p>

							<p className="text-xl font-bold w-[15%]">
								Status
							</p>

							<p className="text-xl font-bold w-[35%]">
								Client Partner
							</p>
						</div>

						{noClients &&
							<div className="text-mw_red mt-6">
								No clients found.
							</div>
						}

						{clients && !noClients && clients.length && clients.map((client, index) => (
							<div
								key={index}
								className={
									`flex justify-center items-center h-32 ${index == clients.length - 1 ? "" :
										"border-mw_olive border-b-2"}`
								}
							>
								<div className="flex px-6 py-4 w-[50%]">
									<span
										className="flex bg-mw_gray text-mw_red justify-center items-center
											w-10 h-10 rounded-full"
									>
										{client.name.charAt(0) + client.name.charAt(client.name.indexOf(" ") + 1)}
									</span>

									<div className="flex ml-8">
										<div className="flex flex-col w-72">
											<p className="font-bold text-mw_black text-left">
												{client.name}
											</p>

											<p className="text-sm text-mw_gray text-left">
												{client.email}
											</p>
										</div>

										<button
											className="bg-mw_red text-mw_white text text-xs rounded-md w-24"
										// onClick={() => console.log(client._id)}
										>
											<Link
												href={`/lender/clients/${client._id}`}
											>
												Client Details
											</Link>
										</button>
									</div>
								</div>

								<div className="flex w-[50%]">
									<div className="flex justify-center w-[30%]">
										<p className="bg-mw_turq text-mw_black h-6 rounded-full px-4">
											Active
										</p>
									</div>

									<div className="flex justify-center w-[70%]">
										{client.partner ? (
											<div className="flex items-center mt-1">
												<div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-mw_turq rounded-full">
													<span className="font-medium text-white">
														{client.name.charAt(0) + client.name.charAt(client.name.indexOf(" ") + 1)}
													</span>
												</div>

												<div className="ml-4">
													<div className="text-sm font-medium text-mw_gray">
														<Link href={`/users/${client.partner._id}`}>
															{client.partner.name}
														</Link>
													</div>

													<div className="text-sm text-mw_gray">
														{client.partner.email}
													</div>
												</div>
											</div>
										) :
											<p>None</p>
										}
										{client.collaborators && client.collaborators.length == 0 &&
											<p>None</p>
										}
									</div>
								</div>
							</div>
						))}
					</section>
				</div>}

			<ModalInviteClients
				isOpen={showModal}
				onDismiss={closeModal}
			/>
		</main>
	);
};
