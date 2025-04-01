import Image from "next/image";


export const metadata = {
	title: "Coming Soon - MustWants, Your PCS Partner",
	description: "",
	robots: "noindex, nofollow",
}


export default function comingsoon() {
	return (
		<main className="csoon-section flex flex-column items-center justify-center relative bg-[#1b181f] md:p-20">
			<div className="w-full h-full">
				<Image
					className="w-full h-full object-contain"
					src="/images/coming-soon-bg.jpg"
					alt="Coming Soon Image"
					placeholder="blur"
					blurDataURL="/images/coming-soon-bg.jpg"
					width={0}
					height={0}
					sizes="100vh"
				/>
			</div>

			<div className="container text-center hidden">
				<p className="text-3xl md:text-6xl text-center font-bold text-emerald-300 inline outline-double px-10 py-3 outline-[#707070]" data-text="Coming soon...">Coming <span className="text-lime-300">Soon...</span></p>
			</div>
		</main>
	)
}
