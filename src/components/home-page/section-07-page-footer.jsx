import Image from "next/image";
import Link from "next/link";

const links = [
  {
    id: 0,
    title: "About Us",
    href: "/about-us",
  },
  {
    id: 1,
    title: "FAQ",
    href: "/help/frequent-questions",
  },
  {
    id: 2,
    title: "Contact Us",
    href: "/contact-us",
  },
  {
    id: 3,
    title: "Blog",
    href: "/blogs",
  },
  {
    id: 4,
    title: "Agents",
    href: "/find-a-pro/vetted-agents",
  },
  {
    id: 5,
    title: "Checklists",
    href: "/checklists",
  },
  {
    id: 6,
    title: "Lenders",
    href: "/find-a-pro/vetted-lenders",
  },
  {
    id: 7,
    title: "Login",
    href: "/login",
  },
];

export default function PageFooter() {
    return (
        <main className=" bg-[#181818] md:mb-16 w-full py-8 xl:py-12">
            <div className="container">
                <div className="flex md:flex-row sm:flex-col">
                    <div className="flex flex-col justify-center items-start lg:w-1/3 sm:w-full sm:mb-12">
                        <Link href="/" className="site-nav_link">
                            <div className="h-10 mb-6">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/logos-must-wants/must-wants-logo-wtext.png"
                                    alt="mustwants logo"
                                    placeholder="blur"
                                    blurDataURL="/images/logos-must-wants/must-wants-logo-wtext.png"
                                    width="0"
                                    height="0"
                                    sizes="120vh"
                                    loading="lazy"
                                />
                            </div>
                        </Link>

                        <div className="grid grid-cols-2 text-mw_gray text-m w-55 gap-x-16 xl:gap-x-[120px] gap-y-3">
                            {links.map(link => (
                                <div key={link.id}>
                                    <Link href={link.href} className="hover:text-[#d1ee00] text-link-underline-hover">
                                        {link.title}
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="flex justify-around items-center lg:w-2/3 sm:w-full">
                        <div className="md:h-48 w-[33.333%] md-w-[auto]">
                            <Image
                                className="w-full h-full object-contain"
                                src="/images/sdvosb.webp"
                                alt="sdvosb icon"
                                placeholder="blur"
                                blurDataURL="/images/sdvosb.webp"
                                width="0"
                                height="0"
                                sizes="100vh"
                                loading="lazy"
                            />
                        </div>

                        <div className="md:h-48 w-[33.333%] md-w-[auto]">
                            <Image
                                className="w-full h-full object-contain"
                                src="/images/veteran-owned-white.png"
                                alt="veteran owned icon"
                                placeholder="blur"
                                blurDataURL="/images/veteran-owned-white.png"
                                width="0"
                                height="0"
                                sizes="100vh"
                                loading="lazy"
                            />
                        </div>

                        <div className="md:h-48 w-[33.333%] md-w-[auto]">
                            <Image
                                className="w-full h-full object-contain"
                                src="/images/miltary-spouse.png"
                                alt="miltary spouse icon"
                                placeholder="blur"
                                blurDataURL="/images/miltary-spouse.png"
                                width="0"
                                height="0"
                                sizes="100vh"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
