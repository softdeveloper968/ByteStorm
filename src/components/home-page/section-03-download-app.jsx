import Image from "next/image";
import Link from "next/link";


export default function DownloadAppTop() {
    return (
        <div className="pt-10 md:pt-20 bg-secondary text-dark-secondary">
            <div className="container">
                <div className="w-full gap-x-12 xl:flex gap-14">
                    <div className="xl:w-2/5 text-mw_black pb-8 xl:pr-14 mb-3 xl:mb-0">
                        <h2 className="!mb-2 xl:mb-8 !text-2xl xl:!text-3xl">
                            Download our mobile app to find your next home.
                        </h2>

                        <p className="mb-4 xl:mb-10 text:md xl:text-lg">
                            Tailor your home buying experience on the go by downloading our mobile app.
                        </p>

                        <div className="flex gap-x-6 flex-row">
                        <Link
                        href="https://play.google.com/store/apps/details?id=com.voyagersw.MustWants"
                        className="site-nav_link hover-scale-btn"
                        target="blank"
                    >
                                <div className="h-12 md:h-14 mb-4 cursor-pointer download-button-style">
                                    <Image
                                        className="w-auto h-full object-contain"
                                        src="/images/logos-app-store/google-store.png"
                                        alt="Google store logo"
                                        placeholder="blur"
                                        blurDataURL="images/logos-app-store/google-store.png"
                                        width="0"
                                        height="0"
                                        sizes="100vh"
                                        loading="lazy"
                                    />
                                </div>
                            </Link>

                            <Link
                        href="https://apps.apple.com/us/app/mustwants/id1523392681"
                        target="blank"
                        className="site-nav_link hover-scale-btn"
                    >
                                <div className="h-12 md:h-14 mb-4 cursor-pointer download-button-style">
                                    <Image
                                        className="w-auto h-full object-contain"
                                        src="/images/logos-app-store/apple-store.png"
                                        alt="Apple Store logo"
                                        placeholder="blur"
                                        blurDataURL="images/logos-app-store/apple-store.png"
                                        width="0"
                                        height="0"
                                        sizes="100vh"
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="xl:w-3/5 flex gap-x-8 w-full px-5 md:px-0">
                        <div className="flex items-end w-auto h-auto">
                            <Image
                                src="/images/home-page/mobile-app-02.webp"
                                alt="iOS Mockup 2"
                                placeholder="blur"
                                blurDataURL="/images/home-page/mobile-app-02.webp"
                                width={590}
                                height={910}
                                loading="lazy"
                            />
                        </div>

                        <div className="flex items-end w-auto h-auto">
                            <Image
                                src="/images/home-page/mobile-app-01.webp"
                                alt="iOS Mockup 2"
                                placeholder="blur"
                                blurDataURL="/images/home-page/mobile-app-01.webp"
                                width={590}
                                height={910}
                                loading="lazy"
                            />
                        </div>

                        <div className="flex items-end w-auto h-auto">
                            <Image
                                src="/images/home-page/mobile-app-03.webp"
                                alt="iOS Mockup 2"
                                placeholder="blur"
                                blurDataURL="/images/home-page/mobile-app-03.webp"
                                width={590}
                                height={910}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
