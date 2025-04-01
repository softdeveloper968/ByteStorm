import Link from "next/link";

import { RecommendedList } from "./users";


export default function ClientHomesCard({ client }) {

	return (
		<section aria-labelledby="homes">
			<div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
				<div className="divide-y divide-gray-200">
					<div className="px-4 py-5 sm:px-6">
						<h2 id="homes" className="text-lg font-medium text-gray-900">
							{client.name}&#39;s Homes
						</h2>
					</div>

					<div className="lg:col-span-2">
						<div className="sm:hidden">
							<label htmlFor="tabs" className="sr-only">
								Select a Tab
							</label>

							<select
								id="tabs"
								name="tabs"
								className="block w-fill focus:ring-teal-500 focus:border-purple-500 border-gray-300 rounded-md"
								defaultValue="recommended"
							>
								<option key="recommended">Recommended</option>
								<option key="saved">Saved</option>
							</select>
						</div>

						<div className="hidden sm:block">
							<nav className="relative z-0 rounded-lg shadow flex fivide-x divide-gray-200" area-label="Tabs">
								<Link
									key="recommended"
									href="#"
									className={classNames(
										showRecommended ? 'text-gray-900 rounded-l-lg' : 'text-gray-500 hover:text-gray-700 rounded-r-lg',
										'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
									)}
									onClick={() => toggleShowRec()}
								>
									<span>Recommended</span>
									<span
										aria-hidden="true"
										className={classNames(
											showRecommended ? 'bg-purple-500' : 'bg-transparent',
											'absolute inset-x-0 bottom-0 h-0.5'
										)}
									/>
								</Link>

								<Link
									key="saved"
									href="#"
									className={classNames(
										showSaved ? 'text-gray-900 rounded-r-lg' : 'text-gray-500 hover:text-gray-700 rounded-l-lg',
										'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
									)}
									onClick={() => toggleShowSaved()}
								>
									<span>Saved</span>

									<span
										aria-hidden="true"
										className={classNames(
											showSaved ? 'bg-purple-500' : 'bg-transparent',
											'absolute inset-x-0 bottom-0 h-0.5'
										)}
									/>
								</Link>
							</nav>
						</div>
						{showRecommended && (<RecommendedList recommended_homes={client.recommended_homes} />)}
						{!showRecommended && (<RecommendedList recommended_homes={client.saved_homes} />)}
						{/* <ul
							role="list"
							className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0"
						>
							{client && client.recommended_homes.length > 0 && client.recommended_homes.map((home) => (
								<li key={home._id} className="sm:py-8">
									<div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
										<div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
											<img className="object-cover shadow-lg rounded-lg" src={home.thumbnail} alt="" />
										</div>
										<div className="sm:col-span-2">
											<div className="space-y-4">
												<div className="text-md font-medium space-y-1">
													<h3>{home.address}</h3>
													<p>${home.price}</p>
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>*/}

					</div>
				</div>
			</div>
		</section>
	);
};
