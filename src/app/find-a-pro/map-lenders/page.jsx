import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import LenderMap from "./lender-map";

export const metadata = {
  title: "Vetted Lenders List - MustWants, Your PCS Partner",
  description:
    "Experience a seamless home-buying journey with our expert lenders. Prioritize your financial well-being and simplify the process of purchasing a home with MustWants.",
  robots: "index, follow",
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function LenderMapPage(route) {
  return (
    <main className="flex flex-col min-h-screen  mx-auto pt-16 md:pb-24">
      <div className="px-[15px] lg:px-12 w-full max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center md:flex-row md:mb-0 sm:flex-col sm:mb-8">
          <div className="flex items-center">
            <h1 className="!text-2xl !my-4 lg:!text-4xl md:!my-6">
              MW Vetted Lenders
            </h1>
            <div className="relative group inline-flex ml-4 items-center hover-tooltip">
              <button className="text-mw_green !text-xl lg:!text-2xl">
                <MdInfoOutline />
              </button>
              <span className="hidden hover-content mt-2 absolute right-1/2 md:right-[auto] md:left-1/2 md:-translate-x-1/2 top-full mb-2 px-2 py-1 text-xs text-black bg-mw_green rounded opacity-0 transition-opacity duration-300 min-w-[180px] md:min-w-[300px] text-center z-[99]">
                Find a vetted real estate lender by clicking on the icons below
                or search by location and military base/installation using our
                dropdown menu.
              </span>
            </div>
          </div>

          <Link
            href="/find-a-pro/vetted-lenders"
            className="text-xl text-mw_black text-center font-bold px-3 py-2 cursor-pointer flex items-center justify-center primary-button-hover"
          >
            Look up Lenders List <IoIosArrowForward className="ml-2" />
          </Link>
        </div>
      </div>
      <div className="overflow-hidden min-h-[600px] h-[calc(100vh_-_260px)] md:mb-0 sm:mb-12">
        <LenderMap lender={route ? route.searchParams : undefined} />
      </div>
    </main>
  );
}
