import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "DMCA - MustWants, Your PCS Partner",
    description: "",
    robots: "index, follow",
};

export default function DMCA() {
    return (
        <main className="w-full pt-22 pb-8 md:pb-16 lg:pb-24 overflow-y-scroll no-scrollbar">
            <header className="relative text-center">
                <div className="relative w-full h-64 opacity-50">
                    <Image
                        className="object-cover"
                        src="/images/footer/dmca.png"
                        alt="DMCA Notice"
                        placeholder="blur"
                        blurDataURL="/images/footer/dmca.png"
                        fill
                    />
                </div>

                <div className="absolute bottom-[22%] text-mw_white w-full px-4">
                    <h1 className="!text-2xl lg:!text-4xl !mb-2 uppercase font-bold">
                        Digital Millennium Copyright Act (DMCA)
                    </h1>

                    <p className="text-base md:text-[18px] lg:!text-2xl leading-normal font-light">
                        MustWants™ Inc. | Effective Date: February 16, 2025
                    </p>
                </div>
            </header>

            <div className="container">
                <article className="flex flex-col lg:px-20 text-mw_white text-xl gap-y-8 py-6 md:py-14 lg:py-16">
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl md:text-2xl uppercase mb-2">Introduction:</p>
                        <p className="text-base">
                            MustWants respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act ("DMCA"). We will respond promptly to claims of copyright infringement reported in accordance with this policy. Upon receipt of a valid DMCA notice, MustWants will take appropriate action, including removal of infringing content and termination of repeat infringers' access.
                        </p>
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl uppercase mb-4">Submitting a DMCA Notice:</p>
                        <p className="text-base">
                            If you believe that your copyrighted work has been used on the MustWants website without authorization, please submit a notice with the following details to our designated Copyright Agent:
                        </p>
                        <ul className="list-disc list-inside text-base ml-8">
                            <li>Identification of the copyrighted work that you claim has been infringed.</li>
                            <li>Identification of the infringing material and its location on our website (e.g., a URL or other descriptive information).</li>
                            <li>Your contact information, including your full name, mailing address, telephone number, and email address.</li>
                            <li>A statement that you have a good-faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                            <li>A statement under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on behalf of the owner.</li>
                            <li>Your electronic or physical signature.</li>
                        </ul>
                        <p className="text-base mt-4">MustWants may request additional information before taking action. If the allegedly infringing material is removed, we will notify the person responsible and may provide your email address for response.</p>
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl uppercase mb-4">Counter-Notification Process:</p>
                        <p className="text-base">
                            If you believe your content was removed or disabled in error, you may submit a counter-notification containing the following:
                        </p>
                        <ul className="list-disc list-inside text-base ml-8">
                            <li>Identification of the removed material and its location before removal.</li>
                            <li>Your contact information, including your full name, mailing address, telephone number, and email address.</li>
                            <li>A statement under penalty of perjury that you have a good-faith belief that the material was removed due to mistake or misidentification.</li>
                            <li>A statement consenting to jurisdiction in the federal courts where you are located or in Florida (if you reside outside the U.S.).</li>
                            <li>Your electronic or physical signature.</li>
                        </ul>
                        <p className="text-base mt-4">Upon receipt of a valid counter-notice, MustWants may restore the removed material unless the original complainant files a court action within 10 business days.</p>
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl uppercase mb-4">Designated Copyright Agent:</p>
                        <p className="text-base">Pursuant to 17 U.S.C. 512(c), MustWants’ designated Copyright Agent for DMCA notices is:</p>
                        <ul className="list-disc list-inside text-base ml-8">
                            <li>MustWants</li>
                            <li>Phone: 904-501-3795</li>
                            <li>Email: <Link className="!bg-transparent" target="_blank" href="mailto:DMCA@MustWants.com">DMCA@MustWants.com</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl uppercase mb-4">Contact Us:</p>
                        <p className="text-base">
                            For feedback, technical support, or other inquiries, contact:
                        </p>
                        <Link className="bg-cloud_white-100 rounded p-1 cursor-pointer text-base" href="mailto:DMCA@MustWants.com" target="_blank">
                            DMCA@MustWants.com
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}
