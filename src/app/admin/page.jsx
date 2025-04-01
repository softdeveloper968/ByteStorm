"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RealtorApplicationsTable from "./RealtorApplicationsTable";
import LenderApplicationsTable from "./LenderApplicationsTable";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPage() {
    const [realtorApplications, setRealtorApplications] = useState([]);
    const [lenderApplications, setLenderApplications] = useState([]);
    const [role, setRole] = useState('Realtor');
    const [status, setStatus] = useState('pending');
    const [removed, setRemoved] = useState(false);
    const [sort, setSort] = useState('Newest');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    const { data: session } = useSession();
    const admin = session?.user.isAdmin;

    useEffect(() => {
        const fetchRealtorApplications = async () => {
            try {
                const response = await fetch(`${baseURL}/realtor/get_selected_applications`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status, removed }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (sort === 'Newest') {
                        setRealtorApplications(data?.reverse());
                    } else if (sort === 'Oldest') {
                        setRealtorApplications(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching realtor applications: ", error);
            }
        };

        const fetchLenderApplications = async () => {
            try {
                const response = await fetch(`${baseURL}/lender/get_selected_applications`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status, removed }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (sort === 'Newest') {
                        setLenderApplications(data?.reverse());
                    } else if (sort === 'Oldest') {
                        setLenderApplications(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching lender applications: ", error);
            }
        };

        if (!admin) {
            console.log("User not authorized to access applications")
            return;
        }

        fetchRealtorApplications();
        fetchLenderApplications();
    }, [status, removed, sort, message, admin]);

    const filterApplications = (applications, search) => {
        if (!search) {
            return applications;
        }

        return applications.filter(application =>
            application.name.toLowerCase().includes(search.toLowerCase()) ||
            application.email.toLowerCase().includes(search.toLowerCase())
        );
    };

    const filteredRealtorApplications = filterApplications(realtorApplications, search);
    const filteredLenderApplications = filterApplications(lenderApplications, search);

    const reviewApplication = async (id, approved, role, access_level) => {
        try {
            const response = await fetch(`${baseURL}/review/application_respond`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    application_id: id,
                    approved: approved,
                    isLender: role === 'Lender',
                    access_level: access_level || '',
                }),
            });

            if (response.ok) {
                setMessage(`${role} application ${approved ? 'approved' : 'denied'} successfully`);
            }
        } catch (error) {
            console.error("Error reviewing application: ", error);
        }
    };

    const removeApplication = async (id, role) => {
        try {
            const response = await fetch(`${baseURL}/review/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    role: role === 'Realtor' ? 'realtor_application' : 'lender_application',
                }),
            });

            if (response.ok) {
                setMessage(`${role} application removed successfully`);
            }
        } catch (error) {
            console.error("Error removing application: ", error);
        }
    };

    const resendApplication = async (id, role) => {
        try {
            const response = await fetch(`${baseURL}/review/resend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    application_id: id,
                    isLender: role === 'Lender',
                }),
            });

            if (response.ok) {
                setMessage(`${role} application resent successfully`);
            }
        } catch (error) {
            console.error("Error resending application: ", error);
        }
    };

    const restoreApplication = async (id, role) => {
        try {
            const response = await fetch(`${baseURL}/review/restore`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    role: role === 'Realtor' ? 'realtor_application' : 'lender_application',
                }),
            });

            if (response.ok) {
                setMessage(`${role} application restore successfully`);
            }
        } catch (error) {
            console.error("Error restoring application: ", error);
        }
    };

    const editApplication = async (id, role, field_name, new_field) => {
        try {
            const response = await fetch(`${baseURL}/review/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    role: role,
                    field_name: field_name,
                    new_field: new_field,
                }),
            });

            if (response.ok) {
                setMessage(`${role} application edited successfully`);
            }
        } catch (error) {
            console.error("Error editing application: ", error);
        }
    };

    const statusText = status?.charAt(0).toUpperCase() + status?.slice(1);

    const removedText = removed ? 'Removed ' : '';

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {admin ? (
                <div className="bg-white shadow-md rounded-lg p-7">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-black">{removedText}{statusText} {role} Applicant Management</h1>
                        <div className="flex items-center">
                            <button
                                className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded mr-2"
                                onClick={() => setRole('Realtor')}
                            >
                                Realtor
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
                                onClick={() => setRole('Lender')}
                            >
                                Lender
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="">
                            <select
                                value={status}
                                placeholder={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-white border rounded p-2 pr-7 text-black text-sm focus:ring-1 focus:ring-gray-300 outline-none"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                            </select>
                        </div>
                        <div className="">
                            <select
                                value={removed}
                                placeholder={removed}
                                onChange={(e) => setRemoved(e.target.value === 'true')}
                                className="w-full bg-white border rounded p-2 pr-7 text-black text-sm focus:ring-1 focus:ring-gray-300 outline-none"
                            >
                                <option value={false}>Active</option>
                                <option value={true}>Removed</option>
                            </select>
                        </div>
                        <div className="">
                            <select
                                value={sort}
                                placeholder={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full bg-white border rounded p-2 pr-7 text-black text-sm focus:ring-1 focus:ring-gray-300 outline-none"
                            >
                                <option value="Newest">Newest</option>
                                <option value="Oldest">Oldest</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-half bg-white border rounded p-2 pr-7 text-black text-sm focus:ring-1 focus:ring-gray-300 outline-none"
                        />
                    </div>
                    {message && (
                        <div className="flex items-center justify-between bg-green-100 text-green-700 p-3 rounded my-4">
                            <span>{message}</span>
                            <button
                                className="ml-3 text-green-900 hover:text-green-700 font-bold"
                                onClick={() => setMessage('')}
                            >
                                ✖
                            </button>
                        </div>
                    )}
                    {role === 'Realtor' ? (
                        <RealtorApplicationsTable
                            applications={filteredRealtorApplications}
                            role={role}
                            status={status}
                            removed={removed}
                            reviewApplication={reviewApplication}
                            removeApplication={removeApplication}
                            resendApplication={resendApplication}
                            restoreApplication={restoreApplication}
                            editApplication={editApplication}
                            setMessage={setMessage}
                        />
                    ) : (
                        <LenderApplicationsTable
                            applications={filteredLenderApplications}
                            role={role}
                            status={status}
                            removed={removed}
                            reviewApplication={reviewApplication}
                            removeApplication={removeApplication}
                            resendApplication={resendApplication}
                            restoreApplication={restoreApplication}
                            editApplication={editApplication}
                            setMessage={setMessage}
                        />
                    )}
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg text-center p-7">
                    <h1 className="text-2xl font-bold text-red-700">You are not authorized to access this page</h1>
                </div>
            )}
        </div>
    );
}