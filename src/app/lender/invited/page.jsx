"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function InvitedClients() {
    const { data: session, update: updateSession } = useSession();

    const [activeClients, setActiveClients] = useState(null);
    const [lender, setLender] = useState({});

	useEffect(() => {
		const fetchLender = async () => {
			try {
				const response = await fetch(`${baseURL}/lender/get_lender`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ _id: session.user._id }),
				});

				if (response.ok) {
					const data = await response.json();
					setLender(data);
				}
			} catch (error) {
				console.log(error)
			};
		}

		if (session?.user) {
			fetchLender();
		};
	}, [session]);

    let invited;
    if (session?.user && lender.invited) {
        invited = lender.invited;
    } else {
        invited = [];
    };

    useEffect(() => {
        const checkClients = async (invited) => {
            try {
                const emails = invited.map(client => client.email);

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check_users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ emails }),
                });

                const data = await response.json();

                setActiveClients(data);
            } catch (error) {
                console.log(error)
            };
        };

        checkClients(invited);
    }, [invited]);

    const isActive = (email) => {
        return activeClients?.some(client => client.email === email);
    };

    return (
        <main className="bg-mw_white text-mw_black w-full py-24">
            <div className="text-3xl text-center font-bold mb-16">
                Invited Clients
            </div>

            <div className="flex flex-col">
                {invited && invited.map(client => (
                    <div
                        key={client._id}
                        className="flex justify-center"
                    >
                        <div className="flex justify-evenly items-center w-[80%] border-b-4 border-mw_olive h-24">
                            <div className="text-center text-lg">
                                {client.email}
                            </div>

                            <div className="text-center text-lg w-36">
                                {client.send_date.split('T')[0] || client.send_date}
                            </div>

                            <div className={`text-mw_white text-center text-lg w-32 rounded-lg
                                ${isActive(client.email) ? `bg-mw_olive` : `bg-mw_red`}`}
                            >
                                {isActive(client.email) ? 'Active' : 'Not Active'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
