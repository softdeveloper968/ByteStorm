import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "Accessibility Statement - MustWants, Your PCS Partner",
	description: "",
	robots: "index, follow",
};

export default function AccessibilityStatement() {
	return (
		<main className="w-full pt-22 pb-8 md:pb-16 lg:pb-24 overflow-y-scroll no-scrollbar">
			<header className="relative text-center">
				<div className="relative w-full h-64 opacity-50">
					<Image
						className="object-cover"
						src="/images/footer/accessibility-statement.png"
						alt="Accessibility Statement"
						placeholder="blur"
						blurDataURL="/images/footer/accessibility-statement.png"
						fill
					/>
				</div>

				<div className="absolute bottom-[22%] text-mw_white w-full px-4">
					<h1 className="!text-2xl lg:!text-4xl !mb-2 uppercase font-bold">
						Accessibility
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
							MustWants is committed to ensuring digital accessibility for all users, including individuals with disabilities. We continuously strive to enhance the user experience and comply with applicable accessibility standards under the Americans with Disabilities Act (ADA), Section 508 of the Rehabilitation Act, and other federal and state laws governing accessibility.
						</p>
					</div>

					<div>
						<p className="text-xl md:text-2xl uppercase mb-4">Efforts to Support Accessibility:</p>
						<div className="ml-6">
							<p className="mb-4 text-base">MustWants has implemented the following measures to improve website accessibility:</p>
							<ul className="list-disc list-inside text-base">
								<li>Organizational Commitment: Accessibility goals and responsibilities are clearly defined within our company.</li>
								<li>Web Compliance Efforts: Our development team follows the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</li>
								<li>Continuous Improvement: We conduct regular audits and user testing to identify and address accessibility barriers.</li>
								<li>Self-Evaluation & Third-Party Assessments: Periodic internal reviews and external accessibility audits.</li>
								<li>Employee Training: Staff involved in website development receive ongoing training on accessibility requirements and best practices.</li>
							</ul>
						</div>
					</div>

					<div>
						<p className="text-xl md:text-2xl uppercase mb-4">Compatibility with Browsers and Assistive Technologies:</p>
						<p className="mb-4 text-base">Our website is designed to function effectively on a variety of browsers and assistive technologies:</p>
						<ul className="list-disc list-inside text-base ml-8">
							<li>Browsers: Google Chrome, Safari, Microsoft Edge, Firefox, and other widely used web browsers.</li>
							<li>Assistive Technologies: Screen readers (e.g., JAWS, NVDA, VoiceOver), keyboard navigation, speech recognition software, and more.</li>
							<li>Mobile Accessibility: Optimized usability across desktop and mobile devices.</li>
						</ul>
					</div>

					<div>
						<p className="text-xl md:text-2xl uppercase mb-4">Ongoing Improvements and User Feedback:</p>
						<p className="text-base">Accessibility is an ongoing effort at MustWants. We welcome feedback from users regarding any accessibility barriers encountered on our website. Your input helps us enhance our digital inclusivity initiatives.</p>
					</div>

					<div>
						<p className="text-xl md:text-2xl uppercase mb-4">Contact Us:</p>
						<p className="text-base">
							If you experience difficulties accessing content, have suggestions for improvements, or require assistance, please contact us:
						</p>
						<ul className="list-disc list-inside text-base ml-8">
							<li>Email: <Link className="!bg-transparent" target="_blank" href="mailto:hello@mustwants.com">hello@mustwants.com</Link></li>
							<li>Phone: 904-501-3795</li>
						</ul>
						<p className="text-base mt-4">We aim to respond to accessibility inquiries within a reasonable timeframe and take necessary actions to resolve any issues.</p>
					</div>
				</article>
			</div>
		</main>
	);
}
