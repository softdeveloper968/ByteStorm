import Link from "next/link";
import { IoCheckboxSharp } from "react-icons/io5";

export const metadata = {
  title: "PCS Move Checklists - MustWants, Your PCS Partner",
  description:
    "Access essential checklists for home buyers, including moving preparation, loan documentation, and packing tips. Ensure a smooth and organized PCS move with MustWants.",
  robots: "index, follow",
};

const checklistLinks = [
	{
		id: 0,
		link: "/checklists/home-buyer",
		text: "Home Buyer Checklist",
		description: "Ready to search for a home? Start here to you prepare for the search."
	},
	{
		id: 1,
		link: "/checklists/loan-document",
		text: "Loan Document Checklist",
		description: "Find a general list of documents and information you will need to process your home loan."
	},
	{
		id: 2,
		link: "/checklists/mover",
		text: "Mover Checklist",
		description: "Get organized as you prepare for your move."
	},
	{
		id: 3,
		link: "/checklists/last-pack",
		text: "Last Items To Pack Checklist",
		description: "Avoid searching in multiple boxes for needed items once you are in your new home.  Pack these items last and keep them in your car for easy access."
	},
	{
		id: 4,
		link: "/checklists/children-pack",
		text: "Children Pack Checklist",
		description: "Keep the kids happy by packing easily accessible comfort items."
	},
];


export default function Checklists() {
	return (
		<main className="container flex flex-col w-full pt-16 pb-16 md:pb-28">
			<h1 className="text-center !text-2xl lg:!text-4xl">
				Checklists
			</h1>

			<div className="flex flex-row flex-wrap gap-y-8 max-w-[1200px] mx-auto">
				{checklistLinks.map(checklist => (
					<div
						key={checklist.id}
						className="w-full md:w-1/2 px-2"
					>
						<div className="flex mb-2 lg:mb-4">
							{/* <div className="inline-flex items-center mr-2 lg:mr-4">
								<label className="flex items-center cursor-pointer relative custom_checkbox">
									<input type="checkbox" className="checkbox peer !outline-none !shadow-none focus:!shadow-none h-7 w-7 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:!bg-[#d1ee00] checked:!border-[#d1ee00]" id={checklist.text} name={checklist.text} value={checklist.text} />
									<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#28252b" stroke="#28252b" stroke-width="1">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
									</svg>
									</span>
								</label>
								</div> */}

                            <div className="text-mw_green text-3xl mr-2">
								<IoCheckboxSharp />
							</div>

							<Link
								className="text-xl lg:text-2xl font-semibold px-2 pb-1 rounded-lg hover:bg-mw_olive transition duration-150 ease-in-out"
								href={checklist.link}
							>
								{checklist.text}
							</Link>
						</div>

						<p>
							{checklist.description}
						</p>
					</div>
				))}
			</div>
		</main>
	);
};
