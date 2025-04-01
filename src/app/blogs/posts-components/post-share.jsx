import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_URL;

export default function PostShare({ title, slug, setModalOpen }) {
    const [copied, setCopied] = useState(false);
    const blogUrl = `${baseURL}/blogs/${slug}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(blogUrl);
            setCopied(true);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#00000080',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 5,
                boxShadow: '0 0 10 #0000001a',
                maxWidth: '50%',
                maxHeight: '80%',
                overflow: 'auto',
                position: 'relative'
            }}
            >
                <div className="relative bg-[#fff] py-4 px-2 max-w-[500px] rounded-[5px] share-modal mx-auto">
                    <div className="pl-2 pt-2 justify-between flex text-center">
                        <p className="w-full text-center font-semibold">Share the blog {title}</p>
                        <button onClick={() => setModalOpen(false)} className="bg-[#000] text-[#fff] w-8 p-2 cursor-pointer h-8 absolute flex items-center justify-center rounded-full right-[-10px] top-[-10px]">x</button>
                    </div>
                    <div className="flex gap-x-8 mt-2 text-center justify-center my-4">
                        <Link
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
                            target="blank"
                        >
                            <div className="h-14 w-14">
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

                        <Link
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
                            target="blank"
                        >
                            <div className="h-14 w-14">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/icons-social-media/linkedin-color/linkedin-96.svg"
                                    alt="linkedin logo"
                                    placeholder="blur"
                                    blurDataURL="/images/icons-social-media/linkedin-color/linkedin-96.svg"
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>
                        </Link>

                        <Link
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`}
                            target="blank"
                        >
                            <div className="h-14 w-14">
                                <Image
                                    className="w-full h-full object-contain"
                                    src="/images/icons-social-media/twitterx-color/twitterx-96.svg"
                                    alt="twitter logo"
                                    placeholder="blur"
                                    blurDataURL="/images/icons-social-media/twitterx-color/twitterx-96.svg"
                                    width="0"
                                    height="0"
                                    sizes="100vh"
                                />
                            </div>
                        </Link>
                    </div>
                    <div style={{ borderWidth: 3, borderRadius: 5 }} className="flex h-15 justify-between items-center">
                        <p className="truncate px-2">{blogUrl}</p>
                        <button className="bg-mw_olive text-mw_black rounded-[5px] w-20 p-2 cursor-pointer h-8 flex items-center justify-center" onClick={copyToClipboard}>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
