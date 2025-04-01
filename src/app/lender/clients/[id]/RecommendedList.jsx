import Image from "next/image";
import { useRouter } from "next/router";


export { RecommendedList };

function RecommendedList(props) {
    const recommended_homes = props?.recommended_homes;
    // const router = useRouter();

    return (
        <main
            className="bg-white
                space-y-12
                lg:gap-x-8
                lg:space-y-0
                sm:divide-y
                sm:divide-gray-200
                sm:space-y-0
            "
        >
            {recommended_homes.map((home) => (
                <div key={home._id} className="sm:py-8">
                    <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                        <div className="aspect-w-1 aspect-h-1 sm:aspect-w-1 sm:aspect-h-1">
                            {/* <Image
                                className="w-full h-full object-contain"
                                src={home.thumbnail}
                                alt={home.thumbnail}
                                width={0}
                                height={0}
                                sizes="100vh"
                            /> */}
                            <picture>
                                <Image
                                    className="w-full h-full object-contain"
                                    src={home.thumbnail}
                                    alt={home.thumbnail}
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                />
                            </picture>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="space-y-4">
                                <div className="text-sm font-medium space-y-1 text-gray-600">
                                    <h3>{home.address}</h3>
                                    <p>${home.price}</p>
                                    <p> MLS# {home.listingId}</p>
                                </div>
                                <div className="text-xs space-y-1 text-gray-600">
                                    <p>{home.bedrooms} Bedrooms, {home.bathrooms} Bathrooms</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    {home.compatibility.top_priorities.map((compatibility) => (
                                        <div
                                            key={compatibility._id}
                                            className="relative bg-white flex items-center"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <span className="absolute inset-o" aria-hidden="true" />
                                                <p className="text-xs text-gray-600">
                                                    {compatibility.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
};
