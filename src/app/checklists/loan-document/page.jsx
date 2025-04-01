import Checklist from "../checklist";
import { checklistData } from "./loan-document-checklist-data.js";

export const metadata = {
  title: "Loan Document - PCS Move Checklists - MustWants",
  description:
    "Find a general list of documents and information you will need to process your home loan.",
  robots: "index, follow",
};

export default function ChecklistLoanDocuments() {
    return (
        <div className="bg-mw_white text-mw_black min-h-screen h-fit w-full pt-16 pb-24">
            <h1 className="font-bold text-center !text-xl md:text-3xl pt-24 pb-8">
                Loan Document Checklist
            </h1>

            <Checklist checklistData={checklistData} />
        </div>
    );
};
