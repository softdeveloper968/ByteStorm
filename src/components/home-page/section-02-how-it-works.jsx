import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function HowItWorks() {
  return (
    <div className="py-10 md:py-20 bg-white text-dark-secondary">
      <div className="container">
        <div className="justify-center w-full align-center grid xl:grid-cols-2	gap-8 xl:gap-14">
          <div className="flex mx-auto my-auto w-full xl:order-2">
            <div
              className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_0px_10px_-0px_rgba(0,0,0,0.15)]"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1VMeixmbq40?autoplay=1&loop=1&playlist=1VMeixmbq40&controls=0&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              {/* </iframe> */}
            </div>
          </div>
          <div className="flex flex-col justify-content-center xl:pr-14 ">
            <h1 className="mb-2 xl:mb-4 !text-2xl lg:!text-4xl !mt-0 leading-none">
              How MustWants simplifies your home search
            </h1>

            <div className="space-y-4">
              <p className="text:md xl:text-lg">
                Embark on your next PCS move with MustWants, a home search
                platform specifically designed to assist military personnel and
                their families in finding their dream homes. Our platform’s
                unique tools, including access to vetted real-estate agents,
                real-time collaboration with trusted lenders, and customizable
                filters, simplify the intricate process of collaboratively
                searching and purchasing a home.
              </p>

              <p className="text:md xl:text-lg">
                By teaming up with military personnel, veterans, and their mil
                spouses, we designed a collaborative, easy-to-use platform that
                empowers home buyers and real estate professionals. With our
                commitment to transparency, we guarantee your data will never be
                sold, ensuring your privacy is always protected.
              </p>
            </div>

            <Link href="/about-us" className="site-nav_link">
              <div className="btn-2 flex flex-row items-center gap-x-2 py-2 cursor-pointer mt-8 font-medium w-[180px] justify-center secondary-btn">
                Our Journey
                <IoIosArrowForward />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
