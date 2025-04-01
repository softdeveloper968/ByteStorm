import DownloadApp from "@/components/DownloadApp";
import ProfessionalArray from "@/components/professional-array";

export const metadata = {
  title: "Vetted Lenders List - MustWants, Your PCS Partner",
  description:
    "Experience a seamless home-buying journey with our expert lenders. Prioritize your financial well-being and simplify the process of purchasing a home with MustWants.",
  robots: "index, follow",
};


const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function getData() {
    const res = await fetch(`${baseURL}/lender/lenders_map`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    };

    return await res.json();
};

export default async function VettedLenders() {
    const data = await getData();

    return (
        <main className="flex flex-col w-full min-h-screen max-w-screen-xl mx-auto lg:px-12 md:pb-24">
            <div className="flex flex-col w-full pt-16 md:mt-16">
                <ProfessionalArray
                    professional={data.brokers}
                    professionalType={"Lenders"}
                    cardType={"lender"}
                    mapLink={"/find-a-pro/map-lenders"}
                />

                <DownloadApp />
            </div>
        </main>
    );
};
