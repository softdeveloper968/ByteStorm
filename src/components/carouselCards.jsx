import {
  backStyle,
  cardFlipStyle,
  cardStyle,
  frontStyle,
} from "@/components/baseball-cards/card-animation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowsRotate } from "react-icons/fa6";

const CarouselCards = ({ image, isFlipped, onFlip }) => {
  return (
    <main className="flex flex-row justify-center mt-5 rounded-xl card-custom w-full">
      <div
        className="relative w-full h-60"
        style={{
          ...cardStyle,
          ...(isFlipped ? cardFlipStyle : {}),
          transition: "transform 0.6s ease",
        }}
      >
        {/* Front of card */}
        <div
          className={`flex flex-col bg-mw_white w-full h-full rounded-xl transition-transform duration-300 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}
          style={frontStyle}
        >
          <Link
            key={image.id}
            className="flex md:w-full h-full mb-[40px]"
            href={image.href}
            target="_blank"
          >
            <Image
              className="w-4/5 object-contain h-[100px] mx-auto"
              src={image.image}
              alt={image.alt}
              placeholder="blur"
              blurDataURL={image.image}
              width={0}
              height={0}
              sizes="100vh"
            />
          </Link>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <button
              className="text-mw_black w-[30px] h-[30px] flex justify-center items-center px-2 rounded-xl hover:bg-mw_green hover:border-mw_green transition duration-150 ease-in-out cursor-pointer"
              onClick={onFlip}
            >
              <FaArrowsRotate />
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute top-0 flex flex-col w-full rounded-xl h-full pb-10 ${isFlipped ? "rotate-y-180" : ""} bg-white`}
          style={backStyle}
        >
          <div className="px-3.5 md:px-4 pt-4 md:pt-5 pb-3.5 blog-back-card">
            <p className="text-black !text-center !text-sm">
              {image.shortSummary.slice(0, 100)}
            </p>
          </div>

          <div className="px-3.5 md:px-4">
            <p className="flex flex-wrap gap-1 flex-row text-black text-sm justify-center text-center">
              Visit their website to learn more
              <Link
                href={image.href}
                target="_blank"
                style={{ backgroundColor: "#d1ee00" }}
                className="bg-mw_green !text-black truncate rounded px-1 hover:bg-mw_olive transition duration-150 ease-in-out cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap text-sm"
              >
                {image.href}
              </Link>
            </p>
          </div>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <button
              className="text-mw_black px-2 py-1 rounded-xl hover:bg-mw_green hover:border-mw_green transition duration-150 ease-in-out cursor-pointer"
              onClick={onFlip}
            >
              <FaArrowsRotate />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarouselCards;
