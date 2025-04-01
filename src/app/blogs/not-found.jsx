export default function NotFound() {
    return (
        <main className="flex flex-col bg-mw_white items-center h-screen gap-10 pt-24">
            <h1 className="text-4xl text-mw_red font-bold">
                Post Not Found!
            </h1>

            <p className="text-xl text-center italic">
                Unfortunately, we could not find the requested post data.
            </p>
        </main>
    );
};
