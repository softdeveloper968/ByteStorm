import DownloadApp from "@/components/DownloadApp";
import Image from "next/image";

export const metadata = {
  title: "Home Buyer - MustWants, Your PCS Partner",
  description: "",
  robots: "index, follow",
};


export default function Buyers() {
    return (
        <main className="flex flex-col h-screen w-full pt-24 px-24 lg:pb-16 sm:pb-36 overflow-y-scroll no-scrollbar">
            <section className="flex gap-12 mb-12 lg:flex-row lg:justify-normal sm:flex-col sm:items-center">
                <div className="flex flex-col mb-12 lg:w-2/3 sm:w-full">
                    <h1 >
                        Finding A Home
                    </h1>

                    <h2 className="text-3xl text-bold uppercase text-mw_red mb-6">
                        It's Complicated
                    </h2>

                    <div className="flex flex-col gap-y-8">
                        <p className="text-lg mb-4">
                            Whether it's your first move, fifth, or nineteenth (like our founders!), discovering the right home is a challenge!
                        </p>

                        <p className="text-lg mb-4">
                            We know. We've been there.
                        </p>

                        <p className="text-lg mb-4">
                            By researching thoroughly, applying life's lessons, and partnering with experts,

                            <span className="text-emerald-300 font-bold ml-2">MUST</span>
                            <span className="text-lime-300 font-bold mr-2">WANTS</span>

                            built a tool to simplify the process for you.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center lg:w-1/3 sm:w-full">
                    <div className="h-[500px]">
                        <Image
                            className="w-full h-full object-contain"
                            src="/images/mockup-images/ios-mockup-2.png"
                            alt="iOS Mockup 2"
                            placeholder="blur"
                            blurDataURL="/images/mockup-images/ios-mockup-2.png"
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
