"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import PostShare from "@/app/blogs/posts-components/post-share";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function PostHeader({ post }) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };

    const { data: session } = useSession();
    const router = useRouter()

    const formatTimeStamp = (timestamp) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };

        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    };

    const approvePost = async () => {
        try {
            const res = await fetch(
                `${baseURL}/post/approve_post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "id": post._id }),
            });

            let update = await res.json();

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            };

            console.log("Response: ", update.message);
            router.push("/blogs");
        } catch (error) {
            console.log(error)
        };
    };

    const deletePost = async () => {
        try {
            const res = await fetch(
                `${baseURL}/post/delete_post`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "id": post._id }),
            });

            let update = await res.json();

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            };

            console.log("Response: ", update.message);
            router.push("/blogs/");
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <header className="flex flex-col bg-white text-mw_black">
            <div className="flex flex-col items-center w-full gap-y-4">
                <p className="text-sm text-mw_red">
                    Published: {formatTimeStamp(post.created_at)}
                </p>

                <p className="text-4xl font-bold">
                    {post.title}
                </p>

                <span className="bg-mw_green text-sm px-2 py-1 rounded-xl">
                    {post.category}
                </span>

                <div className="flex justify-between w-full my-6">
                    <Link
                        href={"/blogs/"}
                        className="
                            flex items-center bg-mw_olive text-white border-mw_olive border-2 rounded-xl
                            gap-x-2 px-3 py-2 hover:bg-mw_white hover:text-mw_olive cursor-pointer hover-scale-btn
                        "
                    >
                        <MdArrowBack />
                        Back to All Posts
                    </Link>

                    <button onClick={openModal} className="inline-flex text-md"><img src="/images/share-icon.svg" className="mr-2"/> Share</button>
                    {modalOpen &&  <PostShare title={post.title} slug={post.slug} setModalOpen={setModalOpen} /> }

                    {session?.user.isAdmin &&
                        <div className="space-x-12">
                            {!post.approved &&
                                <button
                                    className="bg-mw_olive text-mw_white px-3 py-2 rounded-xl cursor-pointer"
                                    onClick={approvePost}
                                >
                                    Approve Post
                                </button>
                            }

                            <button
                                className="bg-mw_red text-mw_white px-3 py-2 rounded-xl cursor-pointer"
                                onClick={deletePost}
                            >
                                Delete Post
                            </button>
                        </div>
                    }
                </div>

                <div
                    className="
                        bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]
                        from-mw_olive via-mw_green to-mw_turq h-96 w-full
                    "
                >
                    <div className="flex h-96">
                        {post.image_url &&
                            <Image
                                className="w-full h-full object-contain"
                                src={post.image_url}
                                alt={post.title}
                                placeholder="blur"
                                blurDataURL={post.image_url}
                                width={0}
                                height={0}
                                sizes="100vh"
                            />
                        }
                    </div>
                </div>
            </div>

        </header>
    );
};
