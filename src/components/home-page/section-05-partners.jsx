// import Carousel from "@/components/carousel";
import dynamic from "next/dynamic";
import { partners } from "./partners.js";

const Carousel = dynamic(() => import("@/components/carousel"));

export default function PartnersAffiliates() {
    return (
        <div className="bg-secondary py-10 xl:py-12">
            <div className="container">
                <div className="flex flex-col ">
                    <h2 className="text-mw_black mb-3 xl:mb-8 !text-2xl xl:!text-4xl">
                        Partners and Affiliates
                    </h2>

                    <Carousel images={partners} />
                </div>
            </div>
        </div>
    );
};
