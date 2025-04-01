"use client"

import { useSpinner } from "@/context/SpinnerContext";
import { useEffect } from "react";

const Spinner = () => {
    const { loading } = useSpinner();
    useEffect(() => {
        if (loading) {
          document.body.style.overflow = "hidden"; 
        } else {
          document.body.style.overflow = ""; 
        }
        return () => {
          document.body.style.overflow = ""; 
        };

      }, [loading]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[9991]">
            <div className="w-16 h-16 border-t-4 border-[#74e4b8] border-solid rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;