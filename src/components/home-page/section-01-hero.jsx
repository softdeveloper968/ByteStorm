'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { data: session } = useSession();
  return (
    <div
      className="relative bg-[url('/images/home-page/home-page-hero.webp')] bg-top bg-no-repeat bg-cover
                after:content-[''] after:absolute after:w-full after:h-full after:bg-[#000000] after:opacity-50
                after:z-0 after:top-0 after:left-0 h-[200px] md:h-[350px] xl:h-[500px] flex items-center"
      loading="lazy"
    >
      <div className="container">
        {/* This is the combined logo and text image placement to match design of hero component. */}
        <div className="relative z-10 text-center">
          <Image
            className="w-full h-full max-w-[250px] md:max-w-[450px] mx-auto"
            src="/images/home-page/must-wants-logo-home-page.webp"
            alt="MustWants Logo large with text"
            placeholder="blur"
            blurDataURL="/images/home-page/must-wants-logo-home-page.webp"
            width={100}
            height={400}
            sizes="100vh"
            loading="lazy"
          />
          <Link
            href={session?.user ? '/dashboard' : '/usignup'}
            className="btn-1 ml-2 site-nav_link flex justify-center gap-x-2 items-center text-black mt-10 py-2 px-5 primary-button-hover md:inline-flex"
          >
            <span style={{ whiteSpace: 'nowrap' }}>
              {session?.user ? 'My Dashboard' : 'Join MustWants Community'}
            </span>
          </Link>
        </div>
        {/* This is the image placement to match design of hero component. */}
        {/* <div className="absolute top-[25%] left-[5%] z-5">
                <Image
                    className="w-[65%] h-[auto]"
                    src="/images/logos-must-wants/must-wants-logo-text-large.png"
                    alt="MustWants Logo large with text"
                    placeholder="blur"
                    blurDataURL="/images/logos-must-wants/must-wants-logo-text-large.png"
                    width={0}
                    height={0}
                    sizes="100vh"
                />
            </div> */}
        {/* This is the original image placement in center of hero image. */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
                <Image
                    src="/images/logos-must-wants/must-wants-logo-text-large.png"
                    alt="MustWants Logo large with text"
                    placeholder="blur"
                    blurDataURL="/images/logos-must-wants/must-wants-logo-text-large.png"
                    width={500}
                    height={100}
                />
            </div> */}
        {/* This is the text placement attempting to match MustWants logo. */}
        {/* <div className="absolute bottom-[35%] left-[25%] z-5">
                <h2 className="sm:text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                    Get matched to your best home
                </h2>
            </div> */}
      </div>
    </div>
  );
}
