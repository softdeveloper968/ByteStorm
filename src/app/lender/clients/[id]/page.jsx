"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClientInfoCard from "./ClientInfoCard";
import { RecommendedList } from "./RecommendedList";

// import ClientHomesCard from "./ClientHomesCard";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const tabs = [
    { name: 'Recommended' },
    { name: 'Saved' }
]

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientInfo({ params }) {
    const { data: session } = useSession();

    const [client, setClient] = useState(null);
    const [showRecommended, setShowRecommended] = useState(true)
    const [showSaved, setShowSaved] = useState(false);
    const [error, setError] = useState("");
    const [response, setResponse] = useState(null);

    function toggleShowRec() {
        console.log('toggling recommended')

        if (!showRecommended) {
            setShowSaved(false)
            setShowRecommended(true)
        }

        // setShowRecommended(!showRecommended)
    }

    function toggleShowSaved() {
        console.log('toggling saved')
        if (!showSaved) {
            setShowRecommended(false)
            setShowSaved(true)
        }

        // setShowSaved(!showSaved);
    };

    useEffect(() => {
        try {
            if (session?.user.userRole === "lender") {
                const token = session.user.token;

                const fetchClientById = async () => {
                    const clientData = await fetch(`${baseURL}/lender/client`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ "_id": params.id })
                    });

                    if (clientData.status === 200) {
                        const json = await clientData.json();
                        setClient(json);
                    } else if (clientData.status === 404) {
                        const json = await clientData.json();
                        setError(json.message);
                    };
                };

                fetchClientById().catch(console.error);
            };
        } catch (error) {
            console.log(error)
        };
    });

    return (
        <main className="flex flex-col bg-mw_gray text-mw_black min-h-screen h-screen w-full
                py-16 mb-8 overflow-y-scroll"
        >
            {client &&
                // <p>Client Data: {JSON.stringify(client)}</p>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-3 gap-4 items-start lg:gap-8">
                        <div className="grid grid-cols-1 gap-4 col-span-2 mt-4">

                            <ClientInfoCard client={client} />

                            {/* <ClientHomesCard client={client} /> */}

                            <section
                                className="overflow-y-scroll"
                                aria-labelledby="homes"
                            >
                                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="homes" className="text-lg font-medium text-gray-900">
                                                {client.name}&#39;s Homes
                                            </h2>
                                        </div>

                                        <div className="lg:col-span-2">
                                            <div className="sm:hidden">
                                                <label htmlFor="tabs" className="sr-only">
                                                    Select a Tab
                                                </label>

                                                <select
                                                    id="tabs"
                                                    name="tabs"
                                                    className="block w-fill focus:ring-teal-500 focus:border-purple-500 border-gray-300 rounded-md"
                                                    defaultValue="recommended"
                                                >
                                                    <option key="recommended">Recommended</option>
                                                    <option key="saved">Saved</option>
                                                </select>
                                            </div>

                                            <div className="hidden sm:block">
                                                <nav className="relative z-0 rounded-lg shadow flex fivide-x divide-gray-200" area-label="Tabs">
                                                    <Link
                                                        key="recommended"
                                                        href="#"
                                                        className={classNames(
                                                            showRecommended ? 'text-gray-900 rounded-l-lg' : 'text-gray-500 hover:text-gray-700 rounded-r-lg',
                                                            'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                                        )}
                                                        onClick={() => toggleShowRec()}
                                                    >
                                                        <span>Recommended</span>

                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                showRecommended ? 'bg-purple-500' : 'bg-transparent',
                                                                'absolute inset-x-0 bottom-0 h-0.5'
                                                            )}
                                                        />
                                                    </Link>

                                                    <Link
                                                        key="saved"
                                                        href="#"
                                                        className={classNames(
                                                            showSaved ? 'text-gray-900 rounded-r-lg' : 'text-gray-500 hover:text-gray-700 rounded-l-lg',
                                                            'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                                        )}
                                                        onClick={() => toggleShowSaved()}
                                                    >
                                                        <span>Saved</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                showSaved ? 'bg-purple-500' : 'bg-transparent',
                                                                'absolute inset-x-0 bottom-0 h-0.5'
                                                            )}
                                                        />
                                                    </Link>
                                                </nav>
                                            </div>
                                            {showRecommended && (<RecommendedList recommended_homes={client.recommended_homes} />)}
                                            {!showRecommended && (<RecommendedList recommended_homes={client.saved_homes} />)}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <section aria-labelledby="activity-title">
                                <div className="rounded-lg bg-mw_white overflow-hidden shadow">
                                    <div className="py-5 sm:px-6">
                                        <h2 className="text-base font-medium text-gray-900" id="activity-title">
                                            Activity
                                        </h2>

                                        {client.activity && client.activity.length > 0 &&
                                            <div className="flow-root mt-6 border-t border-gray-300">
                                                <ul role="list" className="-my-5 divide-y divide-gray-200">
                                                    {client.activity.map((act) => (
                                                        <li key={act._id} className="py-5">
                                                            <div className="relative focus-within:ring-2 focus-within:ring-teal-500">
                                                                <p className="mt-1 text-sm text-gray-800">
                                                                    {act.text}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                        {client.activity && client.activity.length === 0 &&
                                            <div className="flow-root mt-6 border-t border-gray-300">
                                                <ul role="list" className="-my-5 divide-y divide-gray-200">
                                                    <li key="1" className="py-5">
                                                        <div className="relative focus-within:ring-2 focus-within:ring-teal-500">
                                                            <p className="mt-1 text-sm text-gray-800 text-center">
                                                                No Activity
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            }
        </main>
    );
};
