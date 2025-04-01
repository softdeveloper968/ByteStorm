import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowPointer } from "react-icons/fa6";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getAuthorInfo = async (author) => {
  try {
    let res = {};

    if (author.user_role === "lender") {
      res = await fetch(`${baseURL}/lender/get_post_author`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: author._id }),
      });
    } else if (author.user_role === "realtor") {
      res = await fetch(`${baseURL}/realtor/get_post_author`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: author._id }),
      });
    }

    const authorInfo = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return authorInfo;
  } catch (error) {
    console.log(error);
  }
};

const getMilitaryStatus = (pro) => {
  if (pro.veteranYN) {
    return "Veteran";
  } else if (pro.reserveYN) {
    return "Servicemember";
  } else if (pro.milRetireeYN) {
    return "Retired Servicemember";
  } else if (pro.milSpouseYN) {
    return "Military Spouse";
  } else {
    return false;
  }
};

export default async function PostAuthor({ author }) {
  const authorInfo = await getAuthorInfo(author);

  return (
    <div className="flex items-center bg-mw_white text-mw_black shadow-xl w-full px-6 py-4 md:flex-row sm:flex-col sm:gap-y-12">
      <div className="w-[220px] h-[220px] mr-8">
        <Image
          className="w-auto h-full rounded-xl"
          src={authorInfo.headshot_url}
          alt="Author Profile Image"
          placeholder="blur"
          blurDataURL={authorInfo.headshot_url}
          width="0"
          height="0"
          sizes="100vh"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-xl">
          {authorInfo.name}
          {getMilitaryStatus(authorInfo)
            ? `, ${getMilitaryStatus(authorInfo)}`
            : ""}
        </p>

        <p className="mb-6">{authorInfo.brokerage}</p>

        <p className="flex items-center gap-x-4">
          <FaPhoneAlt />
          {authorInfo.phone}
        </p>

        <p className="flex items-center gap-x-4">
          <MdOutlineEmail />
          {authorInfo.email}
        </p>

        <p className="flex items-center gap-x-4">
          <FaArrowPointer />
          {authorInfo.brokerage_url}
        </p>

        <div className="flex gap-x-8 mt-2">
          {authorInfo.social_media_facebook && (
            <Link href={authorInfo.social_media_facebook} target="blank">
              <div className="h-6 w-6">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/icons-social-media/facebook-color/facebook-96.svg"
                  alt="facebook logo"
                  placeholder="blur"
                  blurDataURL="/images/icons-social-media/facebook-color/facebook-96.svg"
                  width="0"
                  height="0"
                  sizes="100vh"
                />
              </div>
            </Link>
          )}

          {authorInfo.social_media_instagram && (
            <Link href={authorInfo.social_media_instagram} target="blank">
              <div className="h-6 w-6">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/icons-social-media/instagram-color/instagram-96.svg"
                  alt="instagram logo"
                  placeholder="blur"
                  blurDataURL="/images/icons-social-media/instagram-color/instagram-96.svg"
                  width="0"
                  height="0"
                  sizes="100vh"
                />
              </div>
            </Link>
          )}

          {authorInfo.social_media_linkedin && (
            <Link href={authorInfo.social_media_linkedin} target="blank">
              <div className="h-6 w-6">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/icons-social-media/linkedin-color/linkedin-96.svg"
                  alt="facebook logo"
                  placeholder="blur"
                  blurDataURL="/images/icons-social-media/linkedin-color/linkedin-96.svg"
                  width="0"
                  height="0"
                  sizes="100vh"
                />
              </div>
            </Link>
          )}

          {authorInfo.social_media_x && (
            <Link href={authorInfo.social_media_x} target="blank">
              <div className="h-6 w-6">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/icons-social-media/twitterx-color/twitterx-96.svg"
                  alt="facebook logo"
                  placeholder="blur"
                  blurDataURL="/images/icons-social-media/twitterx-color/twitterx-96.svg"
                  width="0"
                  height="0"
                  sizes="100vh"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
