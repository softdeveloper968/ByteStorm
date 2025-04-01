"use client";

import { useFormStatus } from "react-dom";


export default function PostFormSubmit() {
    const { pending } = useFormStatus();

    return (
        <button
            className="
                bg-max_green_yellow-300
                text-xl
                border-olive-900
                border-2
                rounded-xl
                mt-8
                px-3
                py-2
                hover:bg-max_green_yellow-700
                cursor-pointer
            "
            disabled={pending}
        >
            {pending ? "Submitting..." : "Create Post"}
        </button>
    );
};
