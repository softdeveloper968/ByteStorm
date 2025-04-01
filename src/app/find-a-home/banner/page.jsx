import Download from "@/app/find-a-home/banner/download"
import PageFooter from "@/app/find-a-home/banner/page-footer"
import Image from "next/image"

export const metadata = {
  title: "Find a Home - MustWants, Your PCS Partner",
  description:
    "Start your home search with MustWants. Connect with vetted real estate agents and lenders, utilize customizable filters, and collaborate in real-time to find the perfect home.",
  robots: "index, follow"
}

export default function FindAHome() {
  return (
    <main className="flex flex-col pt-10 w-full h-screen overflow-y-scroll no-scrollbar">
      <section className="flex flex-col bg-mw_white text-mw_black pt-12 lg:pt-20">
        <div className="container flex lg:px-24 gap-12 lg:flex-row sm:flex-col ">
          <div className="flex flex-col justify-start h-full lg:w-1/2 sm:w-full pb-2">
            <h1 className="mb-2 xl:mb-4 !text-2xl xl:!text-4xl font-semibold !mt-0">
              Get matched to your perfect home
            </h1>
            <div className="flex flex-col gap-y-4 mb-10">
              <div className="flex items-center">
                <div className="rounded-full bg-mw_red w-2 h-2 mr-2"/>
                Organize Your desires and rank Your ‘Must and Wants.’
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-mw_red w-2 h-2 mr-2"/>
                Visually Collaborate in real-time with partners and agents.
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-mw_red w-2 h-2 mr-2"/>
                Customize your desires and home search.
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-mw_red w-2 h-2 mr-2"/>
                Organized home match-making for your next PCS move.
              </div>
            </div>
            <Download/>
          </div>
          <div className="flex lg:mt-0 gap-x-8 lg:w-1/2 sm:w-full">
            <div className="flex items-end w-auto h-auto">
              <Image
                src="/images/home-page/mobile-app-02.png"
                alt="iOS Mockup 2"
                placeholder="blur"
                blurDataURL="/images/home-page/mobile-app-02.png"
                width={590}
                height={910}
              />
            </div>
            <div className="flex items-end w-auto h-auto">
              <Image
                src="/images/home-page/mobile-app-03.png"
                alt="iOS Mockup 2"
                placeholder="blur"
                blurDataURL="/images/home-page/mobile-app-03.png"
                width={590}
                height={910}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <div className="relative left-0 bottom-0 w-full"> */}
      <PageFooter/>
      {/* </div> */}
    </main>
  )
}