import DownloadApp from "@/components/DownloadApp";
import ProfessionalArray from "@/components/professional-array";

export const metadata = {
  title: "Vetted Agents List - MustWants, Your PCS Partner",
  description:
    "Find your dream home with our vetted military real estate professionals. Get customized, real-time support to simplify your home search with MustWants.",
  robots: "index, follow",
};


const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function getData() {
    const res = await fetch(`${baseURL}/realtor/realtors_map`,
        { cache: "no-cache" }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    };

    return res.json();
};

export default async function VettedAgents() {
    const data = await getData();

    return (
        <main className="flex flex-col w-full min-h-screen max-w-screen-xl mx-auto lg:px-12 md:pb-24">
            <div className="flex flex-col w-full pt-16 md:mt-16">
                <ProfessionalArray
                    professional={data.agents}
                    professionalType={"Agents"}
                    cardType={"agent"}
                    mapLink={"/find-a-pro/map-agents"}
                />

                <DownloadApp />
            </div>
        </main>
    );
};
