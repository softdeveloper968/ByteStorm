import DownloadApp from "@/components/DownloadApp";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Lender Subscription - MustWants, Your PCS Partner",
  description:
    "Become a MustWants vetted lender. Subscribe to connect with military families, gain access to exclusive leads, and streamline the home financing process with our trusted platform.",
  robots: "index, follow",
};

export default function LenderSubscription() {
  return (
    <main className="container flex flex-col items-center h-fit w-full gap-y-4 lg:gap-y-6 pt-20 lg:pb-36 pb-10 md:pb-16">
      <section className="flex lg:px-10 lg:flex-row sm:flex-col mb-12">
        <div className="flex flex-col lg:w-2/3 sm:w-full">
          <h1 className="!text-2xl lg:!text-4xl font-bold mb-8 !mt-4">
            Lender Subscription
          </h1>

          <div className="mb-12">
            <h2 className="text-3xl text-mw_red font-bold uppercase mb-2">
              Welcome Loan Originators!
            </h2>

            <p className="text-base lg:text-lg leading-normal">
              <span className="text-emerald-300 font-black">MUST</span>
              <span className="text-lime-300 font-black mr-2">WANTS</span>
              is designed to truly assist Real Estate Professionals by first and
              foremost enhancing the collaboration and communication with your
              Home Buyers.
            </p>
          </div>

          <div className="mb-12">
            <p className="text-2xl uppercase mb-2">Low Cost</p>

            <p className="text-base lg:text-lg leading-normal mb-2">
              We are determined to create a product that empowers you as Real
              Estate Agents to help support your clients.
              <span className="text-mwm_red mx-2">No Lead</span>or
              <span className="text-mwm_red ml-2">Referral Fees</span>.
            </p>

            <p className="text-base lg:text-lg leading-normal mb-2">
              We understand the challenges and costs associated with the quality
              of the leads you are given. Sometimes those home buyers may spend
              days, months, and even years looking for the right home.
            </p>

            <p className="text-base lg:text-lg leading-normal mb-2">
              There is a true cost burden with the level of service so many
              dedicated Real Estate Professionals provide to their clients.
              Especially for our military community, if we can help lower that
              cost on you, the Loan Originator, we are confident you will pass
              those savings onto your clients.
            </p>
          </div>

          <div className="mb-12">
            <p className="text-2xl uppercase mb-2">Subscribe:</p>

            <div className="flex flex-wrap text-base lg:text-lg leading-normal">
              If you wish to help in building
              <span className="text-emerald-300 font-black ml-2">MUST</span>
              <span className="text-lime-300 font-black mr-2">WANTS</span>
              and our eco-system please
              <Link
                className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
                                    transition duration-150 ease-in-out"
                href="/signup?role=lender"
              >
                subscribe.
              </Link>
            </div>
          </div>

          <div>
            <p className="text-2xl uppercase mb-2">Contact Us:</p>

            <div className="flex flex-wrap text-base lg:text-lg leading-normal">
              If you wish to see a demo of
              <span className="text-emerald-300 font-black ml-2">MUST</span>
              <span className="text-lime-300 font-black">WANTS</span>, please
              reach out
              <span className="text-mw_green font-bold mx-2">
                Hello@MustWants.com
              </span>
              or
              <Link
                className="bg-mw_green text-mw_black px-1.5 py-0.5 rounded-lg ml-2 hover:bg-mw_olive
                                    transition duration-150 ease-in-out"
                href="https://calendly.com/mustwants"
                target="blank"
              >
                schedule time
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[500px] lg:w-1/3 sm:w-full lg:mt-48 sm:mt-8">
          <div className="h-[500px]">
            <Image
              className="w-full h-full object-contain"
              src="/images/mockup-images/ios-mockup-5.png"
              alt="iOS Mockup 5"
              placeholder="blur"
              blurDataURL="/images/mockup-images/ios-mockup-5.png"
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
}
