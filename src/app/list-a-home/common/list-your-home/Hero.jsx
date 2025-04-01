import Image from "next/image";
import Link from "next/link";

export default function Hero({label}) {
    return (
        <section className="relative flex flex-col md:flex-row items-center w-full min-h-[300px] bg-white mt-4">
            <h6 className={`absolute ${label === "For Sale by Owner" ? "text-white" : "text-black"} left-4 lg:left-5 top-4 lg:top-5 mt-1 text-sm md:text-base`}>{`List a Home > ${label}`}</h6>
            
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 h-[300px] lg:h-auto">
                <Image
                    className="w-full h-full object-cover"
                    src={label === "For Sale by Owner" ? "/images/fsbo_hero-image.jpg" : "/images/frbo_hero-image.jpg"}
                    alt="MustWants Logo large with text"
                    placeholder="blur"
                    blurDataURL="/images/home-page/must-wants-logo-home-page.webp"
                    width={100}
                    height={400}
                    sizes="100vh"
                    loading="lazy"
                />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-6 py-8 lg:px-20">
                <h1 className="!mt-0 !font-semibold  !text-[#29262C] !text-3xl md:!text-[32px] !mb-3 md:!mb-8 lg:!mb-12 font-roboto">{label}</h1>
                <div className="mb-6 lg:mb-8 xl:mb-10">
                    <h2 className="font-normal text-xl text-[#28252B] md:text-2xl max-w-[420px] font-roboto">
                        Your home, your rules. Reduce cost and {label !== "For Sale by Owner" ? "rent" : "sell"} on your own terms.
                    </h2>
                </div>
                <Link href={label !== "For Sale by Owner" ? `/list-a-home/for-rent-by-owner/list-your-home` : `/list-a-home/for-sale-by-owner/list-your-home`} className="inline-block btn-3 site-nav_link h-[42px] max-w-[250px] w-full text-center px-4 lg:px-5 py-2 primary-button-hover cursor-pointer rounded-full">
                    Join To List Your Home
                </Link>
            </div>
        </section>
    );
}
