"use client";

import ProfileUpdateLender from "@/app/lender/profile/profile-update-lender";
import ModalProfileUpdate from "@/components/profile/modal-profile-update";
import { state_data } from "@/static/state-data";
import addHttps from "@/utils/addHttps";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function LenderProfile() {
	const { data: session, update } = useSession();
	const [lender, setLender] = useState({});
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchLender = async () => {
			try {
				const response = await fetch(`${baseURL}/lender/get_lender`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ _id: session.user._id }),
				});

				if (response.ok) {
					const data = await response.json();
					setLender(data);
				}
			} catch (error) {
				console.log(error)
			};
		};

		if (session?.user) {
			fetchLender();
		};
	}, [session]);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const getFullStateName = (state) => {
		const result = state_data.filter(st => { return st.value === state });

		return <p key={state}>{result[0].label}</p>
	};

	return (
		<main className="flex flex-col bg-mw_white text-mw_black w-full pt-16">
			{session?.user.userRole !== "lender" &&
				<>
					<div className="font-bold text-center text-3xl mt-12 mb-16">
						Lender Profile
					</div>

					<div className="text-mw_red text-center text-3xl">
						Must be logged in as Lender to view.
					</div>
				</>
			}

			{session?.user.userRole === "lender" && lender._id &&
				<div className="px:8 lg:px-14">
					<button
						className="flex justify-evenly bg-white text-mw_black gap-x-4 border-2 border-mw_black
							rounded-xl w-36 mt-8 ml-8 p-1 cursor-pointer hover:bg-mw_gray hover-scale-btn"
						onClick={() => openModal()}
					>
						Edit Profile
						<BsPencil className="h-5 w-5" />
					</button>

					<section className="flex justify-between md:flex-row md:items-start
						md:gap-8 md:p-8 sm:flex-col sm:items-center"
					>
						<div className="flex flex-col h-full lg:justify-between lg:gap-0 md:m-0
							sm:justify-start sm:gap-8 sm:mt-6 sm:mb-6"
						>
							<div className="flex flex-col justify-between">
								<div className="flex bg-mw_gray justify-center items-center w-64 h-64 rounded-xl">
									<Image
										className="w-full h-full object-contain rounded-xl"
										src={lender.headshot_url}
										alt="user headshot image"
										placeholder="blur"
										blurDataURL={lender.headshot_url}
										width="0"
										height="0"
										sizes="100vh"
									/>
								</div>

								<div className="flex flex-col items-center text-mw_black mt-8 mb-8">
									<p>{lender.name}</p>

									<p>{lender.email}</p>

									<p>{lender.phone}</p>
								</div>
							</div>

							<div className="flex bg-mw_gray justify-center items-center w-64 h-64 rounded-xl">
								<Image
									className="w-full h-full object-contain rounded-xl"
									src={lender.brokerage_logo_url}
									alt="brokerage logo image"
									placeholder="blur"
									blurDataURL={lender.brokerage_logo_url}
									width="0"
									height="0"
									sizes="100vh"
								/>
							</div>
						</div>

						<div className="flex flex-col w-2/3 text-mw_black bg-mw_white shadow-xl rounded-lg
							p-8 gap-y-4 md:mb-0 sm:mb-8"
						>
							<div className="flex lg:flex-row sm:flex-col">
								<div className="font-bold w-48">
									Social Media:
								</div>

								<div className="flex flex-col gap-y-2">
									<div className="flex">
										<div className="h-6 w-6">
											<Image
												className="w-full h-full object-contain"
												src="/images/icons-social-media/facebook-color/facebook-96.svg"
												alt="facebook logo"
												placeholder="blur"
												blurDataURL="/images/icons-social-media/facebook-color/facebook-96.svg"
												width="0"
												height="0"
												sizes="100vh"
											/>
										</div>

										<p className="w-24">
											Facebook:
										</p>

										{lender.social_media_facebook &&
											<Link
												className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
													transition duration-150 ease-in-out"
												href={addHttps(lender.social_media_facebook)}
												target="blank"
											>
												{lender.social_media_facebook}
											</Link>
										}
									</div>

									<div className="flex">
										<div className="h-6 w-6">
											<Image
												className="w-full h-full object-contain"
												src="/images/icons-social-media/linkedin-color/linkedin-96.svg"
												alt="linkedin logo"
												placeholder="blur"
												blurDataURL="/images/icons-social-media/linkedin-color/linkedin-96.svg"
												width="0"
												height="0"
												sizes="100vh"
											/>
										</div>

										<p className="w-24">
											LinkedIn:
										</p>

										{lender.social_media_linkedin &&
											<Link
												className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
													transition duration-150 ease-in-out"
												href={addHttps(lender.social_media_linkedin)}
												target="blank"
											>
												{lender.social_media_linkedin}
											</Link>
										}
									</div>

									<div className="flex">
										<div className="h-6 w-6">
											<Image
												className="w-full h-full object-contain"
												src="/images/icons-social-media/instagram-color/instagram-96.svg"
												alt="instagram logo"
												placeholder="blur"
												blurDataURL="/images/icons-social-media/instagram-color/instagram-96.svg"
												width="0"
												height="0"
												sizes="100vh"
											/>
										</div>

										<p className="w-24">
											Instagram:
										</p>

										{lender.social_media_instagram &&
											<Link
												className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
													transition duration-150 ease-in-out"
												href={addHttps(lender.social_media_instagram)}
												target="blank"
											>
												{lender.social_media_instagram}
											</Link>
										}
									</div>

									<div className="flex">
										<div className="h-6 w-6">
											<Image
												className="w-full h-full object-contain"
												src="/images/icons-social-media/twitterx-color/twitterx-96.svg"
												alt="twitter-x logo"
												placeholder="blur"
												blurDataURL="/images/icons-social-media/twitterx-color/twitterx-96.svg"
												width="0"
												height="0"
												sizes="100vh"
											/>
										</div>

										<p className="w-24">
											Twitter/ X:
										</p>

										{lender.social_media_x &&
											<Link
												className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
													transition duration-150 ease-in-out"
												href={addHttps(lender.social_media_x)}
												target="blank"
											>
												{lender.social_media_x}
											</Link>
										}
									</div>
								</div>
							</div>

							<div className="flex lg:flex-row sm:flex-col">
								<p className="font-bold w-48">
									Affiliate Code:
								</p>

								<div>
									{lender.affiliate_code}
								</div>
							</div>

							<div className="flex lg:flex-row sm:flex-col">
								<p className="font-bold w-48">
									Brokerage:
								</p>

								<p>
									{lender.brokerage}
								</p>
							</div>

							<div className="flex lg:flex-row sm:flex-col">
								<p className="font-bold w-48">
									Brokerage URL:
								</p>

								<p>
									{lender.link}
								</p>
							</div>

							<div className="flex lg:flex-row sm:flex-col">
								<p className="font-bold w-48">
									Brokerage Address:
								</p>

								<p>
									{lender.address}
								</p>
							</div>

							<div className="flex lg:flex-row sm:flex-col">
								<p className="font-bold w-48">
									NMLS Number:
								</p>

								<p>
									{lender.nmls_number}
								</p>
							</div>

							<div className="flex">
								<p className="font-bold w-48">
									Position:
								</p>

								<p className="border-hidden">
									{lender.position}
								</p>
							</div>

							<div className="flex">
								<p className="font-bold w-48">
									Current State Subscriptions:
								</p>

								<div>
									{lender.states.map((state) => getFullStateName(state))}
								</div>
							</div>

							<div className="flex">
								<p className="font-bold w-48">
									Bio:
								</p>

								<p className="border-hidden">
									{lender.bio}
								</p>
							</div>
						</div>
					</section>
				</div>
			}

			<ModalProfileUpdate
				isOpen={showModal}
				onDismiss={closeModal}
			>
				<ProfileUpdateLender
					lender={lender}
					onDismiss={closeModal}
				/>
			</ModalProfileUpdate>
		</main >
	);
};
