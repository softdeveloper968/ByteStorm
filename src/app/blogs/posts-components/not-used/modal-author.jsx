import Image from "next/image";
import { AiOutlineClose } from 'react-icons/ai';


export default function ModalAuthor({ isOpen, onDismiss, post }) {
    if (!isOpen) {
        return null;
    };

    return (
        <div
            className="
                fixed
                flex
                flex-col
                justify-center
                items-center
                bg-black
                bg-opacity-75
                w-screen
                h-screen
                top-0
                left-0
                right-0
                bottom-0
                z-50
            "
            onClick={onDismiss}
        >
            <div
                className="
                    flex
                    relative
                    bg-cloud_white-900
					text-galaxy_black-700
                    rounded-xl
                    border-t-8
                    border-olive-900
                    w-[50%]
                    h-[50%]
                    p-2
                "
                onClick={(event) => event.stopPropagation()}
            >
                <AiOutlineClose
                    className="
                        absolute
                        right-4
                        top-3
                        text-2xl
                        text-paradise_pink-900
                        border-paradise_pink-500
                        border-2
                        cursor-pointer
                    "
                    onClick={onDismiss}
                />

                <div
                    className="
                        flex
                        w-full
                        mb-3
                        border-b-2
                        border-olive-900
                        pt-8
                    "
                >
                    <div className="flex flex-col justify-evenly w-[50%] pl-8">
                        <div className="w-36 h-36">
                            <Image
                                className="w-auto h-full rounded-xl"
                                src="/images/BugsBunny.png"
                                alt="/images/BugsBunny.png"
                                placeholder="blur"
                                blurDataURL="/images/BugsBunny.png"
                                width="0"
                                height="0"
                                sizes="100vh"
                            />
                        </div>

                        <div className="w-36 h-36">
                            <Image
                                className="w-auto h-full rounded-xl"
                                src="/images/ACMELogo.png"
                                alt="/images/ACMELogo.png"
                                placeholder="blur"
                                blurDataURL="/images/ACMELogo.png"
                                width="0"
                                height="0"
                                sizes="100vh"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-evenly w-[50%]">
                        <div className="flex flex-col">
                            <p className="text-sm italic">
                                Author
                            </p>

                            <p className="text-xl italic">
                                {post.author}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm italic">
                                Brokerage Name
                            </p>

                            <p className="text-xl italic">
                                brokerage name
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm italic">
                                Brokerage URL
                            </p>

                            <p className="text-xl italic">
                                brokerage url
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm italic">
                                Email
                            </p>

                            <p className="text-xl italic">
                                author email
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm italic">
                                Phone
                            </p>

                            <p className="text-xl italic">
                                author phone number
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
