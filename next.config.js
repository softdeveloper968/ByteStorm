/** @type {import('next').NextConfig} */
//const nextConfig = {}

//module.exports = nextConfig

// module.exports = {

// 	reactStrictMode: true,
// 	images: {
// 		//   domains: ['mustwants-profile-pictures.s3.amazonaws.com'],
// 		remotePatterns: [
// 			{
// 				protocol: 'https',
// 				hostname: 'mustwants-profile-pictures.s3.amazonaws.com',
// 				pathname: '**',
// 			},
// 			{
// 				protocol: 'https',
// 				hostname: 'cdnparap80.paragonrels.com',
// 				pathname: '**',
// 			},
// 		],
// 	},
// }

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    nextScriptWorkers: true,
    optimizePackageImports: ["react-icons"],
  },
  images: {
    //   domains: ['mustwants-profile-pictures.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mustwants-profile-pictures.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdnparap80.paragonrels.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "mwblogimages.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.loom.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "mustwants-listing-images.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "mustwants-general.s3.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};
module.exports = withBundleAnalyzer(nextConfig);
