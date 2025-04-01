"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Contact({ agent }) {
    const router = useRouter();

    try {
        return (
            <div className="flex mb-1">
                <p className="font-medium w-16">
                    Email:
                </p>

                <Link
                    className="bg-mw_green text_mw-black truncate rounded px-1 hover:bg-mw_olive
                        transition duration-150 ease-in-out cursor-pointer"
                    href={`mailto:${agent?.email}?subject=Seeking Information`}
                    onClick={() => console.log(agent.email)}
                >
                    {agent?.email}
                </Link>
            </div>
        );
    } catch (error) {
        console.error("Error occurred:", error);
        return null;
    }
};
