"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdArticle,
  MdDownload,
  MdEditNote,
  MdInsertInvitation,
  MdPersonAddAlt1,
} from "react-icons/md";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Lender() {
  const { data: session } = useSession();
  const [lender, setLender] = useState({});

  useEffect(() => {
    const fetchLender = async () => {
      try {
        const response = await fetch(`${baseURL}/lender/get_lender`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: session.user._id }),
        });

        if (response.ok) {
          const data = await response.json();
          setLender(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user) {
      fetchLender();
    }
  }, [session]);

  const buttonsList = [
    {
      name: "Edit Profile",
      href: "/lender/profile",
      icon: <MdEditNote className="text-[40px] mb-2" />,
    },
    {
      name: "Invite Clients",
      href: "/lender/clients",
      icon: <MdPersonAddAlt1 className="text-[40px] mb-2" />,
    },
    {
      name: "Invited Clients",
      href: "/lender/invited",
      icon: <MdInsertInvitation className="text-[40px] mb-2" />,
    },
    {
      name: "Submit Article",
      href: "/blogs/post-editor",
      icon: <MdArticle className="text-[40px] mb-2" />,
    },
    {
      name: "Download the app",
      href: "/download-app",
      icon: <MdDownload className="text-[40px] mb-2" />,
    },
  ];

  return (
    <main className="flex flex-col bg-mw_white text-mw_black w-full pt-16 px-[15px] lg:px-12 pb-4 md:pb-24">
      <h1 className="text-center">Lender Dashboard</h1>

      {session?.user.userRole !== "lender" && (
        <p className="text-mw_red text-center text-3xl">
          Must be logged in as Lender to view.
        </p>
      )}

      {session?.user.userRole === "lender" && lender._id && (
        <div className="flex flex-col items-center">
          <p>{lender.name}</p>
          <p>{lender.email}</p>
          <p>{lender.phone}</p>
          <p>{lender.address}</p>
          <p>{lender.brokerage}</p>
        </div>
      )}

      <div className="flex justify-center gap-[20px] mt-14 flex-wrap">
        {buttonsList.map((item) => (
          <Link key={item.name} href={item.href}>
            <div className="w-[170px] h-[160px] flex flex-col items-center justify-center bg-white text-mw_black rounded-lg  px-4 py-4 agent-cards">
              {item.icon}
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm mt-5">
        Don’t forget to share www.MustWants.com on social media and to your
        network. Thank you!
      </p>
    </main>
  );
}
