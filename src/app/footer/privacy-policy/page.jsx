import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "Privacy Policy - MustWants, Your PCS Partner",
	description: "",
	robots: "index, follow",
};

export default function PrivacyPolicy() {
	return (
		<main className="w-full pt-22 pb-8 md:pb-16 lg:pb-24 overflow-y-scroll no-scrollbar">
			<header className="relative text-center">
				<div className="relative w-full h-64 opacity-50">
					<Image
						className="object-cover"
						src="/images/footer/privacy-policy.png"
						alt="/images/footer/privacy-policy.png"
						placeholder="blur"
						blurDataURL="/images/footer/privacy-policy.png"
						fill
					/>
				</div>

				<div className="absolute bottom-[22%] text-mw_white w-full px-4">
					<h1 className="!text-2xl lg:!text-4xl !mb-2">Privacy Policy</h1>
					<p className="text-base md:text-[18px] lg:!text-2xl leading-normal font-light">
						MustWants™ Inc. | Effective Date: February 16, 2025
					</p>
				</div>
			</header>

			<section className="container">
				<article className="flex flex-col lg:px-20 text-mw_white text-xl gap-y-8 py-6 md:py-12 lg:py-14">
					<div className="flex flex-col gap-y-4">
						<p className="text-xl md:text-2xl mb-2 font-bold">Table of Contents:</p>
						<div className="space-y-2 ml-6">
							<p className="text-base">Introduction</p>
							<p className="text-base">Information You Provide to Us</p>
							<p className="text-base">Automatically Collected Information</p>
							<p className="text-base">Use of Information</p>
							<p className="text-base">Sharing Your Information</p>
							<p className="text-base">Security</p>
							<p className="text-base">If Your Information Changes: Contact Us</p>
							<p className="text-base">Your Rights Under State & Federal Laws</p>
							<p className="text-base">California Privacy Rights</p>
							<p className="text-base">Contact Us</p>
						</div>
					</div>

					<div className="flex flex-col gap-y-2">
						<p className="text-xl md:text-2xl font-bold">INTRODUCTION</p>
						<p className="text-base leading-normal">
							MustWants™ Inc. ("MustWants," "we," "us," or "our") respects your privacy and is committed to protecting the personal information of users ("you" or "user"). This Privacy Policy ("Policy") explains how we collect, use, disclose, and protect your personal information when you use our websites, mobile applications, and other online products and services (collectively, "Services").
						</p>
						<p className="text-base">
							By registering for or using our Services, you accept and agree to be bound by this Policy. If you do not agree with this Policy, you must immediately cease using the Services.
						</p>
						<p className="text-base">
							We reserve the right to modify this Policy at any time. Any changes will be effective upon posting on our website. Your continued use of the Services after changes are posted constitutes acceptance of the updated Policy.
						</p>
					</div>

					<div className="flex flex-col gap-y-4 text-base">
						<p className="text-base lg:text-lg">INFORMATION YOU PROVIDE TO US</p>
						<p className="text-base">
							When you use our Services, we may collect personal information that you voluntarily provide, including but not limited to:
						</p>
						<ul className="list-disc ml-6">
							<li>Identity Information: Name, email address, physical address, phone number.</li>
							<li>Real Estate-Related Information: Details about homes you are buying or selling, preferred locations, and price ranges.</li>
							<li>Payment Information: If applicable, financial details related to transactions.</li>
							<li>Third-Party Information: Information you provide about others (e.g., referrals, shared contacts).</li>
						</ul>
						<p className="text-base">
							We may combine this information with data from your interactions with the Services or third-party sources. MustWants may store and use this information for internal purposes, including sharing it with our partners.
						</p>

						<p className="text-base lg:text-lg">AUTOMATICALLY COLLECTED INFORMATION</p>
						<p className="text-base">
							We may collect certain information automatically when you access our Services, including:
						</p>
						<ul className="list-disc ml-6">
							<li>Device and Browser Information: IP address, operating system, device type, browser type, login times, and Internet Service Provider.</li>
							<li>Usage Data: Pages visited, time spent on pages, links clicked, interactions with emails.</li>
							<li>Cookies & Tracking Technologies: Cookies, web beacons, and tracking pixels to personalize your experience.</li>
							<li>Location Data: If enabled, we may collect your device's location to provide location-based content and services.</li>
						</ul>
						<p className="text-base">
							We may also track phone calls and text messages between you and our representatives to improve customer service. This includes storing call details such as date, time, phone number, and message content.
						</p>
						<p className="text-base">
							Our Services may include third-party integrations, such as social media widgets. Your interactions with these features are governed by the privacy policies of the third-party providers.
						</p>

						<p className="text-base lg:text-lg">USE OF INFORMATION</p>
						<p className="text-base">
							We use the information we collect to:
						</p>
						<ul className="list-disc ml-6">
							<li>Provide, improve, and maintain our Services.</li>
							<li>Respond to inquiries and customer service requests.</li>
							<li>Connect you with real estate professionals and partners.</li>
							<li>Send industry updates, newsletters, and promotional content (opt-out available).</li>
							<li>Analyze trends, monitor usage, and improve user experience.</li>
							<li>Personalize content and advertising based on user preferences.</li>
							<li>Enforce our Terms of Use and comply with legal obligations.</li>
						</ul>
						<div className="text-base">
							By using our Services, you consent to receive communications, including autodialed calls, text messages, and prerecorded messages from MustWants and its partners. You may opt out by contacting <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a>.
						</div>

						<p className="text-base lg:text-lg">SHARING YOUR INFORMATION</p>
						<p className="text-base">
							We may share your information with:
						</p>
						<ul className="list-disc ml-6">
							<li>Service Providers: Third parties that assist with hosting, analytics, marketing, and customer support.</li>
							<li>Affiliates and Partners: To provide services or promotions.</li>
							<li>Legal & Compliance: To comply with legal requirements, enforce policies, and respond to legal requests.</li>
							<li>Business Transfers: In case of mergers, sales, or acquisitions.</li>
							<li>With Your Consent: When explicitly authorized by you.</li>
						</ul>
						<p className="text-base">
							We do not sell personal information to third parties. However, we may share aggregated or anonymized data for analytics and business purposes.
						</p>
						<p className="text-base">
							Our Services may contain links to third-party websites. We are not responsible for the privacy practices of external sites, and we encourage you to review their privacy policies.
						</p>

						<p className="text-base lg:text-lg">SECURITY</p>
						<p className="text-base">
							We implement reasonable security measures to protect personal information. However, no data transmission over the Internet can be guaranteed to be 100% secure. Use our Services at your own risk.
						</p>
						<div className="text-base">
							For security-related inquiries, contact <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a>.
						</div>

						<p className="text-base lg:text-lg">YOUR RIGHTS UNDER STATE & FEDERAL LAWS</p>
						<div className="text-base">
							Users in all 50 states may have rights under applicable state and federal privacy laws, including the right to access, correct, delete, or restrict personal data. To exercise your rights, contact us at <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a>.
						</div>

						<p className="text-base lg:text-lg">CALIFORNIA PRIVACY RIGHTS</p>
						<p className="text-base">
							Under the California Consumer Privacy Act (CCPA), California residents have the right to request:
						</p>
						<ul className="list-disc ml-6">
							<li>Categories of personal information collected.</li>
							<li>The sources of data collection.</li>
							<li>The business purposes for data collection and sharing.</li>
							<li>The categories of third parties with whom data is shared.</li>
							<li>Access, deletion, or restriction of personal information.</li>
						</ul>
						<div className="text-base">
							To exercise your rights, contact us at <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a>.
						</div>

						<p className="text-base lg:text-lg">CONTACT US</p>
						<div className="text-base">
							If you have any questions or concerns about this Policy, please contact us at <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a>.
						</div>
					</div>
				</article>
			</section>
		</main>
	);
}