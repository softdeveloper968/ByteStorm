import Image from "next/image";

export const metadata = {
	title: "Terms & Conditions - MustWants, Your PCS Partner",
	description: "",
	robots: "index, follow",
};

export default function TermsConditions() {
	return (
		<main className="w-full pt-22 pb-8 md:pb-16 lg:pb-24 overflow-y-scroll no-scrollbar">
			<header className="relative text-center">
				<div className="relative w-full h-64 opacity-50">
					<Image
						className="object-cover"
						src="/images/footer/terms-conditions.png"
						alt="/images/footer/terms-conditions.png"
						placeholder="blur"
						blurDataURL="/images/footer/terms-conditions.png"
						fill
					/>
				</div>

				<div className="absolute bottom-[22%] text-mw_white w-full px-4">
					<h1 className="!text-2xl lg:!text-4xl !mb-2">Terms & Conditions</h1>
					<p className="text-base md:text-[18px] lg:!text-2xl leading-normal font-light">
						MustWants™ Inc. | Effective Date: February 16, 2025
					</p>
				</div>
			</header>

			<div className="container">
				<article className="flex flex-col lg:px-20 text-mw_white text-xl gap-y-8 py-6 md:py-14 lg:py-16">
					<div className="flex flex-col gap-y-4">
						<p className="text-xl md:text-2xl mb-2">Terms and Conditions</p>
						<p className="text-base">Effective Date: February 16, 2025 | Last Updated: February 16, 2025</p>
					</div>

					<div>
						<p className="text-base leading-normal">Table of Contents:</p>
						<div className="ml-6 space-y-2 text-base leading-normal">
							<p className="text-base">General Provisions</p>
							<p className="text-base">Terms for Sellers and Buyers of Real Estate</p>
							<p className="text-base">Privacy Policy</p>
							<p className="text-base">Arbitration</p>
							<p className="text-base">Class Action Waiver / Venue</p>
							<p className="text-base">Modifications to the Website and Terms and Conditions</p>
							<p className="text-base">Prohibited Activity</p>
							<p className="text-base">Accounts</p>
							<p className="text-base">Termination</p>
							<p className="text-base">Communications</p>
							<p className="text-base">Miscellaneous</p>
							<p className="text-base">Contact Us</p>
						</div>
					</div>

					<p className="text-base leading-normal">GENERAL PROVISIONS: MustWants.com</p>

					<p className="text-base leading-normal">
						<strong>Disclaimer to Homeowners and Buyers:</strong> By using this service, you understand and agree that MustWants™, Inc. ("MustWants," "we," "us," or "our") is not acting as a real estate agent, broker, or property manager. Our platform connects users with real estate professionals and third-party service providers. We do not control or supervise these third parties and are not responsible for their actions.
					</p>

					<p className="text-base leading-normal">
						MustWants is a Delaware corporation with a business office located in St. Augustine, FL.
					</p>

					<p className="text-base leading-normal">
						Your access to and use of our website and/or mobile application ("Service") is conditioned upon your acceptance of and compliance with these Terms and Conditions ("Agreement"). This Agreement applies to all visitors, users, and others who access or use the Service. If you do not agree with these terms, please discontinue use of the Service.
					</p>

					<p className="text-base leading-normal">
						You agree not to use the Service for any purpose that is unlawful or prohibited by these terms. You further agree to comply with all applicable laws and regulations related to your use of the Service.
					</p>

					<p className="text-base leading-normal">
						If you provide any information to us, you agree that it is accurate, current, and complete. If you provide information about a third party, you represent that you have authorization to do so and assume all responsibility for the dissemination and use of that information.
					</p>

					<p className="text-base leading-normal">TERMS FOR SELLERS AND BUYERS OF REAL ESTATE:</p>

					<div className="text-base leading-normal">
						When you submit information to our Service, you authorize MustWants to share this information with affiliated real estate professionals to facilitate a connection. You consent to being contacted by MustWants and its partners via email, telephone, mail, or other reasonable means, including autodialed calls and text messages, even if your number is on a Do Not Call list. Consent to such communications is not a condition of using MustWants' services. You may contact us at <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a> if you prefer not to receive such communications.
					</div>

					<p className="text-base leading-normal">
						You are responsible for providing accurate and complete information to ensure appropriate matches with professionals. MustWants reserves the right to terminate services for users who provide false or misleading information.
					</p>

					<p className="text-base leading-normal">
						Payment of any cash back, rebate, or incentive is contingent upon MustWants receiving a service fee related to your use of the platform. If MustWants does not collect this fee, it has no obligation to pay any incentives. If the collected fee is less than the owed incentive, MustWants may reduce the incentive accordingly.
					</p>

					<p className="text-base leading-normal">
						MustWants acts solely as a referral service. All terms between home sellers or buyers and real estate professionals are governed by separate agreements that do not involve MustWants. We do not endorse or recommend any specific agreements or services provided by third parties. Please consult your own attorney for legal advice.
					</p>

					<p className="text-base leading-normal">
						Referrals provided by MustWants are not endorsements. You are responsible for vetting referrals and selecting service providers that meet your needs.
					</p>

					<p className="text-base leading-normal">
						Participation in this service is voluntary and may be terminated by you or MustWants at any time with written notice. However, referrals made prior to termination remain effective.
					</p>

					<p className="text-base leading-normal">
						MustWants may modify these terms and conditions at any time. Significant changes will be communicated to you, providing the option to discontinue use of the Service. Continued use after the notice period indicates acceptance of the new terms.
					</p>

					<p className="text-base leading-normal">
						For quality assurance, MustWants may record telephone calls with you or affiliated professionals.
					</p>

					<p className="text-base leading-normal">
						MustWants complies with the Digital Millennium Copyright Act (DMCA) and will respond to claims of intellectual property infringement. Notifications of claimed copyright infringement should be sent to our designated agent.
					</p>

					<p className="text-base leading-normal">
						Our Service may contain third-party advertisements and links. MustWants does not endorse or assume responsibility for the content or services of these third parties.
					</p>

					<p className="text-base leading-normal">
						While we strive for accuracy, MustWants does not guarantee the reliability of information on our Service. Users should independently verify information before relying on it.
					</p>

					<p className="text-base leading-normal">
						Marketing statements regarding potential benefits are based on internal analyses and may not apply to every situation. Such statements are intended to illustrate possible user benefits and are not guarantees.
					</p>

					<p className="text-[18px] lg:text-xl leading-normal">PRIVACY POLICY:</p>
					<p className="text-base leading-normal">
						MustWants collects, stores, and uses personal information in accordance with our Privacy Policy. For details on information collection and usage, please refer to our Privacy Policy.
					</p>

					<p className="text-base leading-normal">ARBITRATION:</p>
					<p className="text-base leading-normal">
						<strong>PLEASE READ THIS SECTION CAREFULLY — IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS.</strong>
					</p>

					<p className="text-base leading-normal">
						This Agreement and all matters arising from it are governed by the laws of the State of Florida, without regard to its conflict-of-law principles. Any disputes not resolved amicably shall be resolved exclusively by binding arbitration in Jacksonville, Florida, administered by the American Arbitration Association or as otherwise agreed upon.
					</p>

					<p className="text-base leading-normal">
						The party initiating arbitration ("Petitioner") must provide written notice to the other party ("Respondent"). If the dispute is not resolved within 15 days, arbitration commences upon delivery of a petition in accordance with the American Arbitration Association's rules.
					</p>

					<p className="text-base leading-normal">
						The arbitration will be conducted by a single arbitrator. If the parties cannot agree on an arbitrator within 10 days, selection will follow the Association's rules.
					</p>

					<p className="text-base leading-normal">
						The arbitrator will issue a written award with findings of fact and conclusions of law. Judgment on the award may be entered in any court with jurisdiction.
					</p>

					<p className="text-base leading-normal">CLASS ACTION WAIVER / VENUE:</p>
					<p className="text-base leading-normal">
						<strong>PLEASE READ THIS SECTION CAREFULLY — IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS.</strong>
					</p>

					<p className="text-base leading-normal">
						You agree that you will resolve any disputes or claim with MustWants on an individual basis, and that any claims arising out of or in connection with the Website and/or terms and conditions will be brought in an individual capacity, and not on behalf of, or as part of, any purported class, consolidated, or representative proceeding. You further agree not to participate in any consolidated, class or representative proceeding brought by any third party arising out of or in connection with the Website and/or terms and conditions. If any court or arbitrator determines that the preceding waiver is void or unenforceable or that arbitration can proceed on a class basis, then the dispute or claim will not be subject to arbitration.
					</p>

					<p className="text-base leading-normal">
						For any dispute or claim that is not subject to arbitration, you consent to exclusive jurisdiction and venue in the federal courts sitting in the North Eastern District of Florida, unless no federal subject matter jurisdiction exists, in which case you consent to exclusive jurisdiction and venue in the state courts sitting in Jacksonville, Florida. You hereby irrevocably waive, to the fullest extent permitted by applicable law, any objection which you may now or hereafter have to the laying of venue of any such proceeding brought in such a court and any claim that any such proceeding brought in such a court has been brought in an inconvenient forum.
					</p>

					<p className="text-base leading-normal">MODIFICATIONS TO THE WEBSITE AND TERMS AND CONDITIONS:</p>
					<p className="text-base leading-normal">
						We are entitled to terminate or modify all or part of any of the Website at any time, without notice to you. We encourage you to check the Website regularly to ensure you are aware of the current terms.
					</p>

					<p className="text-base leading-normal">
						We may modify these terms and conditions at any time by updating this posting. If we do so, we'll also update the effective date at the top of this page.
					</p>

					<p className="text-base leading-normal">PROHIBITED ACTIVITY:</p>
					<div>
						<p className="text-base leading-normal">You agree not to engage in the following prohibited activities:</p>
						<div className="ml-6 space-y-2 text-base leading-normal">
							<p className="text-base">(a) Engaging in activities or submitting materials that could be harmful to minors;</p>
							<p className="text-base">(b) Submitting materials that are patently offensive to the online community, such as content that promotes racism, bigotry, hatred, or physical harm of any kind against any group or individual;</p>
							<p className="text-base">(c) Engaging in activity or submitting materials that harass or advocate harassment of another person;</p>
							<p className="text-base">(d) Engaging in activity, or submitting materials, or promoting information that is false, misleading, or promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory, or libelous;</p>
							<p className="text-base">(e) Engaging in activity that involves the transmission of "junk mail" or unsolicited mass mailing or "spam" or harvesting or otherwise collecting personally identifiable information about Website users, including names, phone numbers, addresses, email addresses, without their consent;</p>
							<p className="text-base">(f) Submitting materials that contain viruses, Trojan horses, worms, or any other similar forms of malware;</p>
							<p className="text-base">(g) Submitting materials that display pornographic or sexually explicit material of any kind;</p>
							<p className="text-base">(h) Submitting materials that provide instructional information about illegal activities such as making or buying illegal weapons, violating someone's privacy, or providing or creating computer viruses;</p>
							<p className="text-base">(i) Engaging in activities or submitting materials that solicit passwords or personally identifiable information for unlawful purposes from other users;</p>
							<p className="text-base">(j) Engaging in unauthorized commercial activities and/or sales without our prior written consent such as advertising, solicitations, contests, sweepstakes, barter, and pyramid schemes;</p>
							<p className="text-base">(k) Using any robot, spider, cancelbot, other automatic device, or manual process to monitor, copy, or "scrape" web pages or the content contained in the Website or for any other unauthorized purpose without our prior written consent;</p>
							<p className="text-base">(l) Decompiling, reverse engineering, or disassembling the software or attempting to do so; or using any device, software, or routine to interfere or attempt to interfere with the proper working of the Website;</p>
							<p className="text-base">(m) Taking any action that imposes an unreasonable or disproportionately large load on the Website or our hardware and software infrastructure or that of any of our licensors or suppliers;</p>
							<p className="text-base">(n) Using any of its trademarks as metatags on other websites;</p>
							<p className="text-base">(o) Using the service in any manner that is illegal or impairs the operation of the service or its availability or usage by others;</p>
							<p className="text-base">(p) Displaying any part of the service in frames (or any content via in-line links); and/or</p>
							<p className="text-base">(q) Decompiling, reverse engineering, or disassembling the software or attempting to do so.</p>
						</div>
					</div>

					<p className="text-base leading-normal">ACCOUNTS:</p>
					<p className="text-base leading-normal">
						You have no obligation to work with MustWants to buy or sell any product, and you can terminate your account at any time.
					</p>

					<p className="text-base leading-normal">
						When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the agreement, which may result in immediate termination of your account on our service.
					</p>

					<p className="text-base leading-normal">
						You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password, whether your password is with our service or a third-party service.
					</p>

					<p className="text-base leading-normal">
						You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
					</p>

					<p className="text-base leading-normal">TERMINATION:</p>
					<p className="text-base leading-normal">
						We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the agreement.
					</p>

					<p className="text-base leading-normal">
						All provisions of the agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
					</p>

					<p className="text-base leading-normal">COMMUNICATIONS:</p>
					<div className="text-base leading-normal">
						By submitting a form to MustWants, you consent to have MustWants or one of its partners contact you via autodialed phone calls and text messages, and prerecorded messages, on the landline or cell number provided, even if you're on any Do Not Call list and even if you are charged for the call or text. Your consent is not a condition of receiving MustWants' services. You can email <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a> to cancel services if you do not consent.
					</div>

					<p className="text-base leading-normal">MISCELLANEOUS:</p>
					<p className="text-base leading-normal">
						If any provision of this agreement is unlawful, void, or unenforceable, then the unlawful, void, or unenforceable provision shall be modified in accordance with the applicable law as nearly as possible to reflect the original intention of the applicable provision, and the remaining sections of the terms and conditions shall remain in full force and effect.
					</p>

					<p className="text-base leading-normal">CONTACT US:</p>
					<div className="text-base leading-normal">
						Any feedback, comments, requests for technical support, and other communications should be directed to customer service at <a href="mailto:MustWants@MustWants.com" className="text-blue-500">MustWants@MustWants.com</a>.
					</div>
				</article>
			</div>
		</main>
	);
}