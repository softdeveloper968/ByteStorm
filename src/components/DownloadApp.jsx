import Image from "next/image";
import Link from "next/link";

export default function Download() {
  return (
    <section className="flex flex-col flex-1 items-center md:m-5">
      <div className="flex text-2xl pb-6 md:flex-row sm:flex-col sm:items-center">
        Find your dream home with
        <div>
          <span className="text-emerald-300 font-bold ml-2">Must</span>
          <span className="text-lime-300 font-bold mr-2">Wants</span>
        </div>
      </div>

      <div className="flex gap-x-6 md:flex-row sm:flex-col">
        <Link
          href="https://apps.apple.com/us/app/mustwants/id1523392681"
          target="blank"
          className="hover-scale-btn"
        >
          <div className="h-16 mb-4 cursor-pointer">
            <Image
              className="w-full h-full object-contain"
              src="/images/logos-app-store/apple-store.png"
              alt="Apple Store logo"
              placeholder="blur"
              blurDataURL="images/logos-app-store/apple-store.png"
              width="0"
              height="0"
              sizes="100vh"
            />
          </div>
        </Link>

        <Link
          href="https://play.google.com/store/apps/details?id=com.voyagersw.MustWants"
          target="blank"
          className="hover-scale-btn"
        >
          <div className="h-16 mb-4 cursor-pointer">
            <Image
              className="w-full h-full object-contain"
              src="/images/logos-app-store/google-store.png"
              alt="Google store logo"
              placeholder="blur"
              blurDataURL="images/logos-app-store/google-store.png"
              width="0"
              height="0"
              sizes="100vh"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};
