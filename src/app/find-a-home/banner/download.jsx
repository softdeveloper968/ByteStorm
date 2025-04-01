import Link from "next/link"
import {FaLongArrowAltRight} from "react-icons/fa"

export default function Download() {
  const links = [
    {
      url: "https://apps.apple.com/us/app/mustwants/id1523392681",
      label: "Download MustWants on iOS/iPhone",
      icon: <FaLongArrowAltRight className="mt-1" />,
    },
    {
      url: "https://play.google.com/store/apps/details?id=com.voyagersw.MustWants",
      label: "Download MustWants on Android",
      icon: <FaLongArrowAltRight className="mt-1" />,
    },
  ];
  return (
    <section className="flex flex-col">
      <div className="flex text-xl pb-4 md:flex-row sm:flex-col sm:items-center">
        <span className="mb-2 xl:mb-4 !text-xl !xl:text-4xl font-semibold !mt-0">
          Find your dream home today!
        </span>
      </div>

      <div className="flex flex-col gap-y-4 mb-10 items-start">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            className="flex hover:text-mw_turq hover:font-bold hover:text-extrabold text-link-underline-hover text-underline-secondary"
          >
            {link.icon}
            <div className="flex pl-1 items-center">{link.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};
