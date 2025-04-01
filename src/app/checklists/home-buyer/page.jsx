import Checklist from "../checklist";
import { checklistData } from "./home-buyer-checklist-data.js";

export const metadata = {
	title: "Home Buyer - PCS Move Checklists - MustWants",
	description: "Ready to search for a home? Start here to you prepare for the search.",
    robots: 'index, follow'
};

export default function ChecklistHomeBuyer() {
    return (
        <main className="bg-mw_white text-mw_black min-h-screen h-fit w-full pb-24">
            <h1 className="font-bold text-center text-3xl pt-24 pb-8">
                Home Buyer Checklist
            </h1>

            <Checklist checklistData={checklistData} />
        </main>
    );
};
