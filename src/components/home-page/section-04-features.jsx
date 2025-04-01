import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Features() {
  const features = [
    {
      id: 0,
      title: "Home Buying Checklists",
      image: "/images/home-page/home-page-checklists.jpg",
      alt: "MustWants feature checklists",
      description:
        "Don't forget a thing about our home buying and moving digital checklists",
      link: "/checklists",
    },
    {
      id: 1,
      title: "Find a Lender",
      image: "/images/home-page/home-page-find-lender.jpg",
      alt: "MustWants feature find a lender",
      description:
        "Browse and choose a lender from the vetted lenders in your area",
      link: "/find-a-pro/vetted-lenders",
    },
    {
      id: 2,
      title: "MustWants Blog",
      image: "/images/home-page/home-page-blog.jpg",
      alt: "MustWants feature blog",
      description: "Keep up to date with all things MustWants and real estate",
      link: "/blogs",
    },
    {
      id: 3,
      title: "FAQ",
      image: "/images/home-page/home-page-faq.jpg",
      alt: "MustWants feature FAQ",
      description:
        "Find additional information and answers to common questions here",
      link: "/help/frequent-questions",
    },
  ];

  const testimonials = [
    {
      id: 0,
      title: "Awesome!!!!!",
      stars: 5,
      text: "Totally amazing to be able to search and collaborate and organize my home desires and search for homes with my partner! Very exciting to also know my personal info isn't being sold to agents and lenders to bombard me...",
      author: "Grunt2011",
    },
    {
      id: 1,
      title: "Needed this!",
      stars: 5,
      text: "This app was a game changer for being able to look for an investment property with my wife while I was away for work and didn't have the ability to communicate every day! MustWants allowed us to link together and see what she really wanted in our new property.",
      author: "Kenny98!",
    },
    {
      id: 2,
      title: "WHOAH!!!",
      stars: 5,
      text: "This app has helped us tremendously!! My spouse is away for training and this allowed us to link together and our agent at the same time so all three of us were able to see the market options and what both of us wanted in a property while being apart from from each other.",
      author: "HBJ00",
    },
    {
      id: 3,
      title: "GAME CHANGER!",
      stars: 5,
      text: "This app made the decision between my girlfriend and I on which house to buy in a breeze. Saved us countless hours of debating!",
      author: "YMT$$$",
    },
  ];

  return (
    <div className="text-mw_black">
      <div className="bg-white ">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8 py-10 md:py-20 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature) => (
              <Link
                href={feature.link}
                key={feature.id}
                className="site-nav_link"
              >
                <div className="flex flex-col justify-left white-border-box max-w-[400px] mx-auto p-3 pb-6 hover-scale-image rounded-[20px] h-full">
                  <div className="max-h-[260px] overflow-hidden mb-5 rounded-[20px]">
                    <Image
                      className="w-full h-full object-contain"
                      src={feature.image}
                      alt={feature.alt}
                      quality={100}
                      placeholder="blur"
                      blurDataURL={feature.image}
                      width={0}
                      height={0}
                      loading="lazy"
                      sizes="100vh"
                    />
                  </div>

                  <div className="px-2">
                    <h2 className="text-xl lg:text-2xl font-bold mb-2">
                      {feature.title}
                    </h2>

                    <p className="text-s leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-[150px] md:h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Link
            href="/find-a-pro/map-agents"
            className="inline-block	btn-3 site-nav_link md:max-w-[auto] md:w-auto
                        text-xl text-center px-5 py-2 primary-button-hover cursor-pointer rounded-full"
          >
            <p className="flex items-center gap-x-2 font-medium">
              Find an agent in Your Area <IoIosArrowForward />
            </p>
          </Link>
        </div>

        <Image
          className="w-full h-full md:object-contain opacity-60"
          src="/images/home-page/home-page-map.webp"
          alt="MustWants agent locations map"
          placeholder="blur"
          blurDataURL="/images/home-page/home-page-map.webp"
          width="0"
          height="0"
          sizes="100vh"
          loading="lazy"
        />
      </div>

      <div className="bg-[#222222] text-mw_white py-10 xl:py-20">
        <div className="container">
          <h2 className="!my-0 !text-2xl xl:!text-4xl">
            What MustWants Users Are Saying
          </h2>

          <div className="justify-start gap-6 xl:gap-8 pt-5 xl:pt-10 grid md:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white hover-scale-btn px-4 py-4 md:py-8 rounded-xl text-[#222]"
              >
                <h2 className="font-semibold !text-xl xl:!text-2xl mb-2">
                  {item.title}
                </h2>

                <div className="flex mb-6">
                  {Array.from({ length: item.stars }).map((_, index) => (
                    <div key={index} className="w-4 h-4 mr-1">
                      <Image
                        className="w-auto max-w-[15px]"
                        src="/images/home-page/testimonial-star.png"
                        alt="star"
                        width={0}
                        height={0}
                        loading="lazy"
                        sizes="100vh"
                      />
                    </div>
                  ))}
                </div>

                <p className="mb-3">{item.text}</p>

                <p className="italic font-semibold">- {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
