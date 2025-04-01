"use client";

import { cardStyle } from "@/components/baseball-cards/card-animation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CategoryButtons from "./category-buttons";
import PostItem from "./post-item";

export default function PostGrid({ posts }) {
  // Check is a user is logged in and isAdmin.
  const { data: session } = useSession();
  const admin = session?.user.isAdmin;
  // console.log(session);

  // Set posts available for viewing based on admin status.
  const [allPosts] = useState(posts);
  const [approvedPosts] = useState(posts?.filter((post) => post.approved));

  const [category, setCategory] = useState("allPosts");
  const [selected, setSelected] = useState(posts);
  const [approved, setApproved] = useState(
    posts.filter((post) => post.approved),
  );

  useEffect(() => {
    if (category !== "allPosts") {
      const filtered = allPosts.filter((item) => {
        return item.category == category;
      });
      setSelected(filtered);
    } else {
      setSelected(allPosts);
    }

    if (category !== "allPosts") {
      const filtered = approvedPosts.filter((item) => {
        return item.category == category;
      });
      setApproved(filtered);
    } else {
      setApproved(approvedPosts);
    }
  }, [category, allPosts, approvedPosts]);

  return (
    <main className="flex flex-col">
      <div className="flex justify-between items-center mb-4 md:mb-6 lg:flex-row lg:h-12 sm:flex-col sm:gap-y-8 sm:h-auto">
        <CategoryButtons setCategory={setCategory} />

        {session?.user && (
          <Link
            href="/blogs/post-editor"
            className="flex items-center bg-mw_olive text-white border-2 border-mw_olive gap-x-4
                            px-3 py-2 rounded-lg hover:bg-white hover:text-mw_olive cursor-pointer"
          >
            Submit Article
            <FaPlus className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
        {admin
          ? selected.map((post) => (
              <div
                key={post._id}
                style={{
                  ...cardStyle,
                  transition: "transform 0.6s ease", // Smooth transition for flip effect
                }}
              >
                <PostItem {...post} />
              </div>
            ))
          : approved.map((post) => (
              <div key={post._id}>
                <PostItem {...post} />
              </div>
            ))}
      </div>
    </main>
  );
};
