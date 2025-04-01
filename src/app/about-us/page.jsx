import DownloadApp from "@/components/DownloadApp";
import Image from "next/image";

export const metadata = {
  title: "Our Journey - MustWants, Your PCS Partner",
  description:
    "Discover the story of MustWants, founded by veterans Scott and Jessica. Learn how their experiences inspired the creation of a platform that simplifies home searches for military families.",
  robots: "index, follow",
};


export default function OurJourney() {

	return (
		<main className="container flex flex-col items-center h-fit w-full gap-y-2 lg:gap-y-4 pt-20 pb-10 md:pb-16 lg:pb-24">
			<section className="flex lg:flex-row sm:flex-col">
				<h1 className="!text-2xl lg:!text-4xl !my-4 md:!my-6">
					Our Journey
				</h1>
			</section>

			<section className="flex lg:px-10 lg:flex-row sm:flex-col mb-7">
				<div className="flex flex-col lg:w-2/3 sm:w-full">

					<p className="text-left text-base">
						<span className="text-emerald-300 font-bold"> MUST</span>
						<span className="text-lime-300 font-bold">WANTS </span>
						founders Scott and Jessica personally experienced the challenges of military life, moving 19 TIMES during their military careers. Throughout their journey, they juggled the stresses of their deployments while struggling to find the right home for their family.
					</p>

					<p className="text-left text-base mt-4 lg:mt-8">
					However, Scott and Jessica soon realized they were not alone.
					</p>

					<p className="text-left text-base mt-4 lg:mt-8">
					Finding the right home is agonizing for countless military families in the U.S. From picking the right real estate agent to choosing an area of town that works for your family, the ideal home—especially for military families during their PCS move—requires compromise and has never been more challenging.
					</p>

					<p className="text-left text-base mt-4">
					Empathizing with the struggles of military families like theirs, Scott and Jessica took the initiative
 to make it easier to find the right home by gathering fellow veterans, their spouses, home
 buyers, and real estate professionals to build <span className="font-bold"> MustWants </span>.—an innovative home search platform.
					</p>

					<p className="text-left text-base mt-4">
					<i>“Having a tool for military families, designed by veterans and their spouses, is significant for them because military members move so often,”</i> Jessica said. <i>“The <span className="font-bold">MustWants</span> team can understand their needs since we lived the military life of frequent PCS moves and wanted to design a platform that would reduce the unnecessary stresses from moving.”</i>
					</p>
					<p className="text-left text-base mt-4">
					Using its unique tools, including access to vetted real estate agents and lenders, real-time collaboration with partners, and filters for customization, MustWants’s digital platform simplifies and organizes the intricate process of purchasing a home.
					</p>
					<p className="text-left text-base mt-4">
					Since its founding in 2020, the <span className="font-bold"> MustWants </span> team has facilitated military moves and continues its mission of being a go-to home search platform for military families.
					</p>
					<p className="text-left text-base mt-4">
					<i>“We emphasize military families because we recognize the real challenges they face when moving every two to four years,”</i> Scott said. <i>“In the end, it is about compromising the desires of a home. Being able to improve their experience over ours is the central passion in building <span className="font-bold"> MustWants</span>. It's a source of pride to help military families find the right home."</i>
					</p>
					
				</div>

				<div className="h-[400px] lg:w-1/3 sm:w-full lg:mt-28 sm:mt-8">
					<Image
						className="w-full h-full object-contain"
						src="/images/scott-mover.png"
						alt="Scott mover image"
						placeholder="blur"
						blurDataURL="/images/scott-mover.png"
						width="0"
						height="0"
						sizes="100vh"
					/>
				</div>
			</section>
			<DownloadApp />
		</main >
	);
};
