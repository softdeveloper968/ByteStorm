import Image from "next/image"


export default function ClientInfoCard({ client }) {
	return (
		<section aria-labelledby="client-basecall-card">
			<div className="rounded-lg bg-white overflow-hidden shadow">
				<div className="bg-white p-6">
					<div className="sm:flex sm:items-center sm:justify-between">
						<div className="sm:flex sm:space-x-5">
							<div className="inline-flex overflow-hidden relative justify-center items-center w-20 h-20 bg-purple-700 rounded-full">
								<span className="text-xl text-white">{client.name.charAt(0) + client.name.charAt(client.name.indexOf(" ") + 1)}</span>
							</div>

							<div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
								<p className="text-xl font-bold text-gray-900 sm:text-2xl">{client.name ? client.name : 'Unavailable'}</p>
								<p className="text-sm font-medium text-gray-500">Phone: {client.phone ? client.phone : 'Unavailable'}</p>
								<p className="text-sm font-medium text-gray-500">Email: {client.email ? client.email : 'Unavailable'}</p>
								{/* <p className="text-sm font-medium text-gray-500">Current Address: {client.current_addres ? client.current_address : 'Unavailable'}</p> */}
							</div>
						</div>
					</div>
					<div className="mt-2">
						<span className="inline-flex items-center mr-4 px-2.5 py-0.5 rounded-full text-xs font-medium outline outline-teal-500 outline-1 text-gray-500">
							Serious Buyer
						</span>

						<span className="inline-flex items-center mr-4 px-2.5 py-0.5 rounded-full text-xs font-medium outline outline-teal-500 outline-1 text-gray-500">
							Veteran
						</span>

						<span className="inline-flex items-center mr-4 px-2.5 py-0.5 rounded-full text-xs font-medium outline outline-teal-500 outline-1 text-gray-500">
							Pre-Approved
						</span>
					</div>

					<div>
						<div className="mt-4">
							<p className="text-m text-gray-800">
								Notes
							</p>

							<p className="text-sm text-gray-500">
								{client.comments ? client.comments : 'None'}
							</p>
						</div>
					</div>

					<div>
						<div className="mt-4">
							<p className="text-m text-gray-800">Partner</p>
						</div>

						{client.partner ? (
							<div className="sm:flex sm:items-center sm:justify-between mt-4">
								<div className="sm:flex sm:space-x-5">
									<div className="flex-shrink-0">
										<div className="mx-auto h-10 w-10 rounded-full">
											<Image
												className="w-full h-full object-contain"
												src={client.partner.profile_picture}
												alt=""
												placeholder="blur"
												blurDataURL={client.partner.profile_picture}
												width="0"
												height="0"
												sizes="100vh"
											/>
										</div>
									</div>

									<div className="text-center sm:mt-0 sm:pt-1 sm:text-left">
										<p className="text-sm font-bold text-gray-900 sm:text-l">
											{client.partner ? client.partner.name : 'Unavailable'}
										</p>

										<p className="text-xs font-medium text-gray-500">
											Phone: {client.partner ? client.partner.phone : 'Unavailable'}
										</p>

										<p className="text-xs font-medium text-gray-500">
											Email: {client.partner ? client.partner.email : 'Unavailable'}
										</p>

										{/* <p className="text-xs font-medium text-gray-500">Influence Level: {client.partner.influence_level ? collab.influence_level : 'Unavailable'}</p> */}
									</div>
								</div>
							</div>
						) :
							<p>None</p>
						}
					</div>
				</div>
			</div>
		</section>
	);
};
