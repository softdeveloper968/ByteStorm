import { Suspense } from "react";
import PostGrid from "./posts-components/post-grid";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const metadata = {
    title: "Home Buying Tips and PCS Resources - MustWants Blog",
    description: "Explore the MustWants Blog for expert home buying tips, PCS moving resources, and insights for military families. Stay informed and make your home search and relocation seamless.",
    robots: "index, follow"
};

const getPosts = async () => {
    try {
        const res = await fetch(
            `${baseURL}/post/get_all_posts`,
            { cache: 'no-store' }
        );

        let allPosts = await res.json();

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        };

        return allPosts;
    } catch (error) {
        console.log(error)
    };
};


export default async function Posts() {
    const posts = await getPosts();

    return (
        <main className="bg-mw_white text-mw_black h-screen overflow-y-scroll pt-16 md:my-16 md:mb-14 md:pb-24">
            <div className="container lg:px-24">
            <h1 className="text-center !text-2xl lg:!text-4xl !mt-0">
                Our Blog Posts
            </h1>
                <Suspense fallback={
                    <p className="text-4xl text-center">
                        Fetching Posts...
                    </p>
                }>
                <PostGrid posts={posts} />
            </Suspense>
            </div>
        </main>
    );
};
