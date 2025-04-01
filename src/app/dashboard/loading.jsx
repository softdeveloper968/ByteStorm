export default function Loading() {
    return (
        <main
            className="
                flex 
                flex-col
                bg-cloud_white-500
                text-galaxy_black-900
                h-screen
                w-full
                pt-36
                px-24
                lg:pb-16
                sm:pb-36
                overflow-y-scroll
                no-scrollbar
            "
        >
            <p className="font-bold text-center text-3xl mt-12 mb-16">
                Loading . . .
            </p>
        </main>
    );
};
