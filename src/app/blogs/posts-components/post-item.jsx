"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import '../../globals.css'
import { backStyle, cardFlipStyle, cardStyle, frontStyle } from "@/components/baseball-cards/card-animation";
import { FaArrowsRotate } from "react-icons/fa6";

const borderColor = [
    {
        key: 'Agent',
        value: 'border-mw_turq'
    },
    {
        key: 'Lender',
        value: 'border-mw_green'
    },
    {
        key: 'Home Buyer',
        value: 'border-mw_black',
    },
    {
        key: 'Home Seller',
        value: 'border-mw_black',
    }
]

export default function PostItem({ author, title, category, slug, image_url, created_at, content, approved }) {
    const [border, setBorder] = useState();
    const [activeCard, setActiveCard] = useState(false);
    const [shortSummary, setShortSummary] = useState('');

    const handleFlip = () => {
        setActiveCard(!activeCard)
    };
    const cardRef = useRef(null);

    useEffect(() => {
        const border = borderColor.find((item) => item.key === category)
        setBorder(border);

        const shortSummary = content.slice(0, 400) + ` ...<a href="/blogs/${slug}" style="background-color: transparent; color: black; font-weight: normal;" className="bg-mw_white text-black">
  <span className="bg-mw_white text-black inline-block no-underline" style="color: black; font-weight: normal;">read more</span>
</a>`;
        setShortSummary(shortSummary);
    }, [])

    const formatTimeStamp = (timestamp) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
        };

        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    };

    return (
        <article className={`p-3 flex flex-col max-w-[480px] rounded-[20px] h-full border-[4px] ${border?.value} ${approved ? "bg-white" : "bg-mw_olive"}  blog-card-column`}
        >
            <div
                className="relative"
                style={{
                    ...cardStyle,
                    ...(activeCard ? cardFlipStyle : {}),
                    transition: 'transform 0.6s ease'  // Smooth transition for flip effect
                }}
            >
                {/* Front blog side */}
                <div className={`flex flex-col h-[540px] ${activeCard ? 'rotate-y-180' : ''}`}
                    style={frontStyle}>

                    {image_url &&
                        <Link href={`/blogs/${slug}`}>
                            <div className="w-full h-[345px]">
                                <Image
                                    className="w-full h-full object-cover rounded-lg"
                                    src={image_url}
                                    alt={image_url}
                                    placeholder="blur"
                                    blurDataURL={image_url}
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>
                        </Link>
                    }

                    {!image_url &&
                        <div className="bg-mw_olive h-48">
                        </div>
                    }

                    <div className="pxx-4">
                        <div className="flex justify-between text-sm text-mw_red mt-4 mb-4">
                            <p>
                                by {author.name}
                            </p>

                            <p>
                                {formatTimeStamp(created_at)}
                            </p>
                        </div>

                        <p className="text-lg mb-4 min-h-12 text-flow-vertical">
                            {title}
                        </p>

                        <div className="flex justify-between mb-6">
                            <span className="bg-mw_green text-sm px-2 py-1 rounded-xl">
                                {category}
                            </span>

                            {!approved &&
                                <span className="bg-mw_red text-sm px-2 py-1 rounded-xl">
                                    Needs Approval
                                </span>
                            }
                        </div>
                    </div>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-center mb-1">
                        <button
                            className="text-mw_black px-2 py-2 rounded-xl hover:bg-mw_green hover:border-mw_green transition duration-150 ease-in-out cursor-pointer"
                            onClick={handleFlip}
                        >
                            <FaArrowsRotate />
                        </button>
                    </div>
                </div>
                <div
                    className={`absolute top-0 flex flex-col h-[540px] ${activeCard ? 'rotate-y-180' : ''}`}
                    style={backStyle}
                >
                    <div className="p-4 h-[540px] blog-back-card flex flex-col justify-center">
                        <span
                            dangerouslySetInnerHTML={{ __html: shortSummary, }} />
                    </div>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <button
                            className="text-mw_black px-2 py-2 rounded-xl hover:bg-mw_green hover:border-mw_green transition duration-150 ease-in-out cursor-pointer"
                            onClick={handleFlip}
                        >
                            <FaArrowsRotate />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};
