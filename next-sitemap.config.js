const siteUrl = process.env.NEXT_PUBLIC_URL;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ["/server-sitemap.xml"],
    sitemapSize : 5000,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/server-sitemap.xml`,
        ],
    },                                                                                                                                                                                                                                                                                                                  
}