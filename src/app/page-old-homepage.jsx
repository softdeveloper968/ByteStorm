import Image from "next/image";
import Link from "next/link";
import Download from "@/components/DownloadApp";


export const metadata = {
	title: '',
	description: '',
	robots: 'noindex, nofollow'
};

export default function Home() {
	return (
		<main className="flex flex-col lg:h-screen sm:h-full overflow-y-scroll">
			<div className="flex flex-col">
				<div className="flex flex-col justify-center items-center mt-20 mb-16 md:flex-row sm:flex-col">
					<div className="flex items-center text-xl md:mr-8">
						<p>
							<span className="text-emerald-300 font-bold"> MUST</span>
							<span className="text-lime-300 font-bold pr-1">WANTS </span>
							Map Coverages:
						</p>
					</div>

					<div className="flex flex-row items-center gap-x-8">
						<Link href="/maps/coverage-map" classeName="site-nav_link">
							<div
								className="flex flex-col items-center w-16 h-16 bg-black border-2 border-mw_green
									rounded-full hover:bg-mw_gray"
							>
								<Image
									className="w-full h-full object-contain"
									src="/images/logos-must-wants/must-wants-logo.png"
									alt="Coverage Map"
									placeholder="blur"
									blurDataURL="/images/logos-must-wants/must-wants-logo.png"
									width="0"
									height="0"
									sizes="100vh"
								/>

								<p className="relative bottom-4 text-[8px]">
									Coverage
								</p>
							</div>
						</Link>

						<Link href="/maps/agent-map" classeName="site-nav_link">
							<div
								className="flex flex-col items-center w-16 h-16 bg-black border-2 border-mw_red
									rounded-full hover:bg-mw_gray"
							>
								<Image
									className="w-full h-full object-contain"
									src="/images/logos-must-wants/must-wants-logo.png"
									alt="Agent Map"
									placeholder="blur"
									blurDataURL="/images/logos-must-wants/must-wants-logo.png"
									width="0"
									height="0"
									sizes="100vh"
								/>

								<p className="relative bottom-4 text-[8px]">
									Agent
								</p>
							</div>
						</Link>

						<Link href="/maps/lender-map" classeName="site-nav_link">
							<div
								className="flex flex-col items-center w-16 h-16 bg-black border-2 border-mw_olive
									rounded-full hover:bg-mw_gray"
							>
								<Image
									className="w-full h-full object-contain"
									src="/images/logos-must-wants/must-wants-logo.png"
									alt="Lender Map"
									placeholder="blur"
									blurDataURL="/images/logos-must-wants/must-wants-logo.png"
									width="0"
									height="0"
									sizes="100vh"
								/>

								<p className="relative bottom-4 text-[8px]">
									Lender
								</p>
							</div>
						</Link>
					</div>
				</div>

				<div className="flex justify-center text-xl text-black gap-x-16 w-full">
					<Link
						className="bg-mw_green px-4 py-2 site-nav_link rounded-lg hover:bg-mw_olive cursor-pointer"
						href="/find-agent/recommended"
					>
						Find Agent
					</Link>

					<Link
						className="bg-mw_green px-4 py-2 site-nav_link rounded-lg hover:bg-mw_olive cursor-pointer"
						href="/find-lender/recommended"
					>
						Find Lender
					</Link>
				</div>
			</div>

			<div className="flex mb-8 p-12 lg:flex-row sm:flex-col">
				<div className="xl:w-1/2 lg:w-1/3 sm:w-full text-white">
					<div className="flex flex-col items-center mb-8">
						<p className="text-4xl text-center font-bold mb-8">
							Search and Get Matched To Your Best Home
						</p>

						<Download />

						<div className="text-lg text-white">
							<div className="flex items-center gap-x-2">
								<span className="font-semibold text-mw_red text-3xl mr-2">
									+
								</span>
								<p >
									Truly Organize your desires and home search
								</p>
							</div>

							<div className="flex items-center gap-x-2">
								<span className="font-semibold text-mw_red text-3xl mr-2">
									+
								</span>
								<p >
									Personalized Criteria allowing visual rankings with 'Must' and 'Wants'
								</p>
							</div>

							<div className="flex items-center gap-x-2">
								<span className="font-semibold text-mw_red text-3xl mr-2">
									+
								</span>
								<p >
									Real-Time Collaboration with Partner, Agent, Lender
								</p>
							</div>

							<div className="flex items-center gap-x-2">
								<span className="font-semibold text-mw_red text-3xl mr-2">
									+
								</span>
								<p >
									Efficient Home Matching
								</p>
							</div>
						</div>

						<div className="flex flex-1 flex-wrap justify-center items-center gap-x-12">
							<div className="h-36 mt-8">
								<Image
									className="w-full h-full object-contain"
									src="/images/miltary-spouse.png"
									alt="miltary spouse icon"
									placeholder="blur"
									blurDataURL="/images/miltary-spouse.png"
									width="0"
									height="0"
									sizes="100vh"
								/>
							</div>

							<div className="h-36 mt-8">
								<Image
									className="w-full h-full object-contain"
									src="/images/sdvosb.png"
									alt="sdvosb icon"
									placeholder="blur"
									blurDataURL="/images/sdvosb.png"
									width="0"
									height="0"
									sizes="100vh"
								/>
							</div>

							<div className="h-36 mt-8">
								<Image
									className="w-full h-full object-contain"
									src="/images/veteran-owned-white.png"
									alt="veteran owned icon"
									placeholder="blur"
									blurDataURL="/images/veteran-owned-white.png"
									width="0"
									height="0"
									sizes="100vh"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-1 flex-wrap justify-center items-center gap-y-6
					xl:w-1/2 lg:w-2/3 md:pb-0 sm:w-full sm:justify-center sm:pb-20"
				>
					<div className="h-96">
						<Image
							className="w-full h-full object-contain"
							src="/images/mockup-images/ios-mockup-1.png"
							alt="iOS Mockup 1"
							placeholder="blur"
							blurDataURL="/images/mockup-images/ios-mockup-1.png"
							width="0"
							height="0"
							sizes="100vh"
						/>
					</div>

					<div className="h-96">
						<Image
							className="w-full h-full object-contain"
							src="/images/mockup-images/ios-mockup-2.png"
							alt="iOS Mockup 2"
							placeholder="blur"
							blurDataURL="/images/mockup-images/ios-mockup-2.png"
							width="0"
							height="0"
							sizes="100vh"
						/>
					</div>

					<div className="h-96">
						<Image
							className="w-full h-full object-contain"
							src="/images/mockup-images/ios-mockup-3.png"
							alt="iOS Mockup 3"
							placeholder="blur"
							blurDataURL="/images/mockup-images/ios-mockup-3.png"
							width="0"
							height="0"
							sizes="100vh"
						/>
					</div>
				</div>
			</div>
		</main>
	);
};