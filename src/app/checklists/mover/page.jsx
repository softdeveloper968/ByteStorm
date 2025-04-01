import Checklist from "../checklist";
import { checklistData } from "./mover-checklist-data.js";

export const metadata = {
	title: "Mover - PCS Move Checklists - MustWants",
	description: "Get organized as you prepare for your move.",
    robots: 'index, follow'
};

export default function ChecklistMover() {
    return (
        <main className="bg-mw_white text-mw_black min-h-screen h-fit w-full pb-24">
            <h1 className="font-bold text-center text-3xl pt-24 pb-8">
                Mover Checklist
            </h1>

            <Checklist checklistData={checklistData} />
        </main>
    );
};
