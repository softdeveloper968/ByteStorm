// import Hero from "@/components/home-page/section-01-hero";
// import HowItWorks from "@/components/home-page/section-02-how-it-works";
// import DownloadAppTop from "@/components/home-page/section-03-download-app";
// import Features from "@/components/home-page/section-04-features";
// import PartnersAffiliates from "@/components/home-page/section-05-partners";
// import DownloadAppBottom from "@/components/home-page/section-06-download-app";
// import PageFooter from "@/components/home-page/section-07-page-footer";
import dynamic from 'next/dynamic';

// Client Components:
const Hero = dynamic(() => import('@/components/home-page/section-01-hero'))
const HowItWorks = dynamic(() => import('@/components/home-page/section-02-how-it-works'),)
const DownloadAppTop = dynamic(() => import('@/components/home-page/section-03-download-app'))
const Features = dynamic(() => import('@/components/home-page/section-04-features'))
const PartnersAffiliates = dynamic(() => import('@/components/home-page/section-05-partners'))
const DownloadAppBottom = dynamic(() => import('@/components/home-page/section-06-download-app'))
const PageFooter = dynamic(() => import('@/components/home-page/section-07-page-footer'))


export const metadata = {
	title: 'MustWants - Get Matched With Your Best Home',
	description: 'MustWants is a dedicated home search platform for military families. Find your dream home with vetted real estate agents, trusted lenders, and unique tools designed for seamless PCS moves.',
	robots: 'index, follow'
};


export default function Home() {
	return (
		<main className="w-full mx-auto overflow-y-scroll">
			<div className="flex flex-col mt-10">
				<Hero />

				<HowItWorks />

				<DownloadAppTop />

				<Features />

				<PartnersAffiliates />

				<DownloadAppBottom />

				<PageFooter />
			</div>
		</main>
	);
};
