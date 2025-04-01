"use client";


export default function Error({ error }) {
    return (
        <main className="flex flex-col bg-mw_white items-center h-screen gap-10 pt-24">
            <h1 className="text-4xl text-mw_red font-bold">
                An error occured!
            </h1>

            <p className="text-xl text-center italic">
                Failed to fetch posts data.<br/>Please try again later.
            </p>
        </main>
    );
};
