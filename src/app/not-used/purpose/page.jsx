import DownloadApp from "@/components/DownloadApp";
import Link from "next/link";

export const metadata = {
  title: "Download App - MustWants, Your PCS Partner",
  description: "",
  robots: "noindex, nofollow",
};


export default function AboutPurpose() {
    return (
        <main className="flex flex-col w-full min-h-screen h-screen pt-36 px-24 gap-y-16
            xl:pb-12 sm:pb-24 overflow-y-scroll no-scrollbar"
        >
            <section
                className="flex flex-col flex-3 xl:mb-0 sm:mb-16"
            >
                <h1 >
                    Streamlining Home Buying Experience
                </h1>

                <div className="flex flex-wrap mb-4">
                    <p className="text-lg">
                        Rooted in the personal military journey of 19 home moves,

                        <span className="text-emerald-300 font-bold ml-2">MUST</span>
                        <span className="text-lime-300 font-bold mr-2">WANTS</span>

                        encapsulates the aspiration to reshape the home search process.
                    </p>
                </div>

                <div className="flex flex-wrap">
                    <p className="text-lg">
                        <span className="italic mr-2">
                            Our mission
                        </span>

                        is to cultivate a seamless, truly collaborative platform for the home search.
                    </p>
                </div>

                <p className="text-3xl font-bold mb-4 mt-16">
                    Your Empowerment, Our Priority
                </p>

                <div className="mb-16">
                    <p className="text-lg mb-2">
                        At
                        <span className="text-emerald-300 font-bold ml-2">MUST</span>
                        <span className="text-lime-300 font-bold">WANTS</span>
                        , we recognize the importance of a stress-free home buying experience. That's why we've designed a platform specifically tailored to empower both home buyers and real estate professionals.
                    </p>

                    <p className="text-lg">
                        Our tools facilitate optimal organization, streamlined communication, and enriched collaboration, simplifying the complex home buying process.
                    </p>
                </div>


                <p className="text-3xl font-bold mb-4">
                    CONTACT US:
                </p>

                <p className="mb-4">
                    If you wish to see a demo of
                    <span className="text-emerald-300 font-bold ml-2">MUST</span>
                    <span className="text-lime-300 font-bold mr-2">WANTS</span>
                    and our eco-system, please reach out at MustWants@MustWants.com
                </p>

                <div>
                    Did we miss anything? Submit your thoughts or more ideas about
                    <span className="text-emerald-300 font-bold ml-2">MUST</span>
                    <span className="text-lime-300 font-bold mr-2">WANTS</span>

                    to us on our

                    <Link
                        className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
                                transition duration-150 ease-in-out"
                        href="https://www.facebook.com/MustWants/"
                        target="blank"
                    >
                        Facebook page!
                    </Link>
                </div>
            </section>
            <DownloadApp />
        </main>
    );
};
