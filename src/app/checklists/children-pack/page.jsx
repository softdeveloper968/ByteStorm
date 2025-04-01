import Checklist from "../checklist";
import { checklistData } from "./children-pack-checklist-data.js";

export const metadata = {
	title: "Children Pack - PCS Move Checklists - MustWants",
	description: "Keep the kids happy by packing easily accessible comfort items.",
    robots: 'index, follow'
};

export default function ChecklistChildrenMove() {
    return (
        <main className="bg-mw_white text-mw_black min-h-screen h-fit w-full pb-24">
            <h1 className="font-bold text-center text-3xl pt-24 pb-8">
                Children Pack Checklist
            </h1>

            <Checklist checklistData={checklistData} />
        </main>
    );
};
