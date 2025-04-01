import { notFound } from "next/navigation";
import PostAuthor from "../posts-components/post-author";
import PostHeader from "../posts-components/post-header";

export async function generateMetadata({ params }) {
  const post = await getSlug(params.postSlug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const ogImageUrl = `${siteUrl}/api/og-image?title=${encodeURIComponent(post.title)}&image=${post.image_url}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${post.title} - MustWants Blog`,
    description: post.summary,
    robots: "index, follow",
    openGraph: {
      title: `${post.title} - MustWants Blog`,
      description: post.summary,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
      url: `${siteUrl}/blog/${params.postSlug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - MustWants Blog`,
      description: post.summary,
      images: [ogImageUrl],
      url: `${siteUrl}/blog/${params.postSlug}`,
    },
  };
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getSlug = async (slug) => {
  try {
    const res = await fetch(
      `${baseURL}/post/get_post_slug?slug=${slug}`,
      { cache: 'no-store' }
    );

    let post = await res.json();

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    };

    return post;
  } catch (error) {
    console.log(error)
  };
};

export default async function PostDetails({ params }) {
  const post = await getSlug(params.postSlug);

  if (!post) {
    notFound();
  };

  return (
    <main className="flex flex-col bg-white text-mw_black min-h-screen h-screen my-8 lg:px-8 py-24 overflow-y-scroll no-scrollbar"
    >
      <div className="container">
        <PostHeader post={post} />

        <section className="flex justify-center width-full mb-16">
          <p className="bg-white rounded-xl py-6"
            dangerouslySetInnerHTML={{ __html: post.content, }}
          />
        </section>

        <PostAuthor author={post.author} />

      </div>
    </main>
  );
};
