import Download from "@/components/DownloadApp";

export const metadata = {
	title: "Mustwants - Download the app",
	description: "",
	robots: "index, follow",
  };  

export default function DownloadApp() {
	return (
		<main className={"container h-screen flex justify-center items-center"}>
			<div className="flex flex-col">
			<h1 className="!text-2xl lg:!text-4xl !mb-2 text-center">
					Search and Get Matched To Your Best Home
				</h1>
				
				<Download />
			</div>
		</main>
	);
};
