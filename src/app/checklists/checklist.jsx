"use client";

import PrintPageButton from "@/components/print-page-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

export default function Checklists({ checklistData }) {
  const [checklist, setChecklist] = useState([]);
  const [error, setError] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        if (session) {
          const token = session.user.token;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/checklist/get_checklist`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();

          console.log(data);

          if (data.children_pack) {
            setChecklist(data.children_pack);
          } else {
            console.log("Checklist not created");
          }
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchChecklist();
  }, [session]);

  const handleCheck = async (step) => {
    try {
      if (session) {
        const token = session.user.token;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checklist/complete_task`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ type: "children_pack", step: step }),
          },
        );
        const data = await response.json();

        console.log(data);

        if (data.checklist?.children_pack) {
          setChecklist(data.checklist.children_pack);
        } else {
          setError("Error completing task");
        }
      } else {
        setError("You must be signed in to complete this task");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const isChecked = (step) => {
    const task = checklist.find((item) => item.step === step);
    return task ? task.completed : false;
  };

  return (
    <section>
      <div className="">
        {error && (
          <p className="text-mw_red text-xl text-center py-4">{error}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:justify-between align-center gap-x-6 w-full  px-4 md:px-16">
        <Link
          href={"/checklists/"}
          className="
                            flex text-md md:text-lg items-center bg-mw_olive text-white border-mw_olive border-2 rounded-xl
                            gap-x-2 px-3 py-2 hover:bg-mw_white hover:text-mw_olive cursor-pointer hover-scale-btn
                        "
        >
          <MdArrowBack />
          Back to All Checklists
        </Link>

        <PrintPageButton />
      </div>

      <div className="text-mw_black mx-auto px-4 md:px-16 overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xl">
              <th className="p-4">Step</th>

              <th className="p-4">Task</th>

              <th className="p-4">Details</th>

              <th className="p-4">Webpage</th>

              <th className="p-4">Completed</th>
            </tr>
          </thead>

          <tbody>
            {checklistData.map((item) => (
              <tr key={item.step}>
                <td className="text-center border-2 border-black px-4 py-2">
                  {item.step}.
                </td>

                <td className="border-2 border-black px-4 py-2">{item.task}</td>

                <td className="border-2 border-black px-4 py-2">
                  {item.details}
                </td>

                <td className="border-2 border-black px-4 py-2">
                  <div
                    className="bg-mw_green text_mw-black text-center rounded p-2 hover:bg-mw_olive
                                        transition duration-150 ease-in-out cursor-pointer"
                  >
                    <Link href={item.webpageLink}>Visit Webpage</Link>
                  </div>
                </td>

                <td className="text-center border-2 border-black px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isChecked(item.step)}
                    onChange={() => handleCheck(item.step)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
