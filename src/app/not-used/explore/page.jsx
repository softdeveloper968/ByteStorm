import DownloadApp from "@/components/DownloadApp";
import Image from "next/image";

export const metadata = {
  title: "Download App - MustWants, Your PCS Partner",
  description: "",
  robots: "noindex, nofollow",
};


export default function AboutExplore() {
    return (
        <main className="flex flex-col h-screen w-full pt-36 px-24 lg:pb-16 sm:pb-36 overflow-y-scroll no-scrollbar">
            <section className="flex gap-12 mb-24 lg:flex-row lg:justify-normal sm:flex-col sm:items-center">
                <div className="flex flex-col w-2/3">
                    <h1 >
                        Explore More Homes
                    </h1>

                    <h2 className="text-3xl font-bold uppercase text-mw_red mb-6">
                        True Organization
                    </h2>

                    <p className="text-lg mb-4">
                        Other real estate tools eliminate homes by using binary filters that ignore the "gray area."
                    </p>

                    <p className="text-lg mb-4">
                        <span className="text-emerald-300 font-bold">MUST</span>
                        <span className="text-lime-300 font-bold">WANTS</span>

                        , gives you the power to display and organize homes based on how important specific features 
                        are to you, not just whether they are there or not.
                    </p>

                    <p>
                        <span className="text-emerald-300 font-bold">MUST</span>
                        <span className="text-lime-300 font-bold mr-2">WANTS</span>
                        ensures buyers aren’t missing out on
                        any homes.
                    </p>
                </div>

                <div className="flex justify-center lg:w-1/3 sm:w-full">
                    <div className="h-[500px]">
                        <Image
                            className="w-full h-full object-contain"
                            src="/images/mockup-images/ios-mockup-4.png"
                            alt="iOS Mockup 4"
                            placeholder="blur"
                            blurDataURL="/images/mockup-images/ios-mockup-4.png"
                            width="0"
                            height="0"
                            sizes="100vh"
                        />
                    </div>
                </div>
            </section>

            <DownloadApp />
        </main>
    );
};
