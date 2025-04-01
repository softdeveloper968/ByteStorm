import Checklist from "../checklist";
import { checklistData } from "./last-pack-checklist-data.js";

export const metadata = {
	title: "Last Items To Pack - PCS Move Checklists - MustWants",
	description: "Avoid searching in multiple boxes for needed items once you are in your new home. Pack these items last and keep them in your car for easy access.",
    robots: 'index, follow'
};

export default function ChecklistLastPack() {
    return (
        <main className="bg-mw_white text-mw_black min-h-screen h-fit w-full pb-24">
            <h1 className="font-bold text-center text-3xl pt-24 pb-8">
                Last To Pack Checklist
            </h1>

            <Checklist checklistData={checklistData} />
        </main>
    );
};
