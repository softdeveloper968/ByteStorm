import { getServerSideSitemapLegacy } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const siteUrl = process.env.NEXT_PUBLIC_URL;

  try {
    const response = await fetch(`${baseURL}/post/get_all_posts`);

    if (!response.ok) {
      console.error("Failed to fetch sitemap data", response.status);
      return { notFound: true };
    }

    const blogs = await response.json();
    console.log("Fetched blogs:", JSON.stringify(blogs, null, 2));

    if (!Array.isArray(blogs) || blogs.length === 0) {
      console.error("Unexpected or empty response:", blogs);
      return { notFound: true };
    }

    const fields = blogs.map((blog) => ({
      loc: `${siteUrl}/blogs/${blog.slug}`,
      lastmod: new Date(blog.updated_at).toISOString(),
    }));

    return getServerSideSitemapLegacy(ctx, fields);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return { notFound: true };
  }
};

export default function Sitemap() {}