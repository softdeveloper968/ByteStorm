import { useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt, FaEnvelope, FaEdit, FaUndo, FaSave, FaPlus, FaMinus } from "react-icons/fa";

const headerStyle = 'px-6 py-2 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider';
const dataStyle = 'px-6 py-4 whitespace-nowrap text-black overflow-x-auto max-w-sm border-r-2 border-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100';

export default function LenderApplicationsTable({
    applications, role, status, removed, reviewApplication, removeApplication, resendApplication, restoreApplication, editApplication, setMessage
}) {
    const [id, setId] = useState("");
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    const [newState, setNewState] = useState("");
    const [showStateInput, setShowStateInput] = useState(null);

    const handleEditClick = (id, field, currentValue) => {
        setId(id);
        setField(field);
        setValue(currentValue);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSaveClick = () => {
        editApplication(id, role, field, value);
        setId("");
        setField("");
        setValue("");
        setMessage("");
        console.log(id, role, field, value);
    };

    const handleStateAdd = (applicationId) => {
        if (newState.trim() !== "") {
            editApplication(applicationId, role, "states", [...applications.find(app => app._id === applicationId).states, { state: newState }]);
            setNewState("");
            setMessage("");
            setShowStateInput(null);
        }
    };

    const handleStateRemove = (applicationId, stateToRemove) => {
        const updatedStates = applications.find(app => app._id === applicationId).states.filter(state => state.state !== stateToRemove);
        editApplication(applicationId, role, "states", updatedStates);
        setMessage("");
    };

    const lender_application_fields = ["name", "email", "phone", "address", "link", "bio", "brokerage", "position", "nmls_number", "loan_originator_nmls", "loan_originator_url", "major_city", "nearest_installation", "subscriptionLevel", "approvalStatus", "years_experience", "avg_annual_volume", "avg_transaction_value", "percentage_clients_military", "percentage_clients_veteran", "mil_branch", "mil_other", "social_media_facebook", "social_media_linkedin", "social_media_instagram", "social_media_x"];
    const lender_number_fields = ["years_experience", "avg_annual_volume", "avg_transaction_value", "percentage_clients_military", "percentage_clients_veteran"];

    return (
        <div className="w-full h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="table-auto bg-white border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className={headerStyle}>Actions</th>

                        <th className={headerStyle}>Name</th>
                        <th className={headerStyle}>Email</th>
                        <th className={headerStyle}>Phone</th>
                        <th className={headerStyle}>Address</th>
                        <th className={headerStyle}>Link</th>
                        <th className={headerStyle}>Bio</th>
                        <th className={headerStyle}>Brokerage Name</th>
                        <th className={headerStyle}>Position</th>
                        <th className={headerStyle}>NMLS #</th>
                        <th className={headerStyle}>Loan Originator NMLS #</th>
                        <th className={headerStyle}>Loan Originator URL</th>
                        <th className={headerStyle}>Major City</th>
                        <th className={headerStyle}>Nearest Installation</th>
                        <th className={headerStyle}>Subscription Level</th>
                        <th className={headerStyle}>Approval Status</th>
                        <th className={headerStyle}>Years Experience</th>
                        <th className={headerStyle}>Annual Volume</th>
                        <th className={headerStyle}>Annual Transactions</th>
                        <th className={headerStyle}>Clients Military %</th>
                        <th className={headerStyle}>Client Veterans %</th>
                        <th className={headerStyle}>Military Branch</th>
                        <th className={headerStyle}>Military Affilitation (Other)</th>
                        <th className={headerStyle}>Facebook</th>
                        <th className={headerStyle}>Linkedin</th>
                        <th className={headerStyle}>Instagram</th>
                        <th className={headerStyle}>Twitter</th>

                        <th className={headerStyle}>Headshot</th>
                        <th className={headerStyle}>Logo</th>

                        <th className={headerStyle}>States</th>

                        <th className={headerStyle}>Own Brokerage</th>
                        <th className={headerStyle}>Veteran</th>
                        <th className={headerStyle}>Reserve</th>
                        <th className={headerStyle}>Military Retiree</th>
                        <th className={headerStyle}>Military Spouse</th>
                        <th className={headerStyle}>Referred</th>
                        <th className={headerStyle}>Referred By</th>
                        <th className={headerStyle}>Removed</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr key={application._id} className="border-b-2 border-gray-200">
                            <td className={`${dataStyle} flex items-center space-x-3 mt-2`}>
                                {status === "pending" && !removed && (
                                    <>
                                        <button
                                            className="text-green-600 hover:text-green-800"
                                            onClick={() => reviewApplication(application._id, true, role, '')}
                                        >
                                            <FaCheck size={20} />
                                        </button>
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => reviewApplication(application._id, true, role, 'basic')}
                                        >
                                            <FaCheck size={20} />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => reviewApplication(application._id, false, role, '')}
                                        >
                                            <FaTimes size={20} />
                                        </button>
                                    </>
                                )}

                                {status === "approved" && !removed && (
                                    <>
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => resendApplication(application._id, role)}
                                        >
                                            <FaEnvelope size={20} />
                                        </button>
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => removeApplication(application._id, role)}
                                        >
                                            <FaTrashAlt size={20} />
                                        </button>
                                    </>
                                )}

                                {removed && (
                                    <>
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => restoreApplication(application._id, role)}
                                        >
                                            <FaUndo size={20} />
                                        </button>
                                    </>
                                )}
                            </td>

                            {lender_application_fields.map((fieldName) => (
                                <td key={fieldName} className={dataStyle}>
                                    {id === application._id && field === fieldName ? (
                                        <div className="flex items-center">
                                            <input
                                                type={lender_number_fields.includes(fieldName) ? "number" : "text"}
                                                value={value}
                                                onChange={handleChange}
                                                className="border p-1 rounded"
                                                placeholder={application[fieldName]}
                                            />
                                            <button className="text-green-600 hover:text-green-800 ml-2" onClick={handleSaveClick}>
                                                <FaSave size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            {application[fieldName]}
                                            <button className="text-blue-600 hover:text-blue-800 ml-2" onClick={() => handleEditClick(application._id, fieldName, application[fieldName])}>
                                                <FaEdit size={20} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            ))}

                            <td className={`${dataStyle} text-center`}>
                                <img src={application.headshot_url} alt="Lender Headshot" className="h-9 w-9" />
                            </td>
                            <td className={`${dataStyle} text-center`}>
                                <img src={application.brokerage_logo_url} alt="Brokerage Logo" className="h-9 w-9" />
                            </td>

                            <td className={dataStyle}>
                                {application.states.map((state, index) => (
                                    <div key={index} className="flex items-center">
                                        <span>{state.state}</span>
                                        <button className="text-red-600 hover:text-red-800 ml-2" onClick={() => handleStateRemove(application._id, state.state)}><FaMinus size={16} /></button>
                                    </div>
                                ))}
                                <button className="text-green-600 hover:text-green-800 mt-2" onClick={() => setShowStateInput(application._id)}><FaPlus size={16} /></button>
                                {showStateInput === application._id && (
                                    <div className="flex items-center mt-2">
                                        <input type="text" value={newState} onChange={(e) => setNewState(e.target.value)} className="border p-1 rounded" placeholder="Add State" />
                                        <button className="text-green-600 hover:text-green-800 ml-2" onClick={() => handleStateAdd(application._id)}><FaCheck size={16} /></button>
                                    </div>
                                )}
                            </td>

                            <td className={dataStyle}>{application.own_brokerage ? 'Yes' : 'No'}</td>
                            <td className={dataStyle}>{application.veteranYN ? 'Yes' : 'No'}</td>
                            <td className={dataStyle}>{application.reserveYN ? 'Yes' : 'No'}</td>
                            <td className={dataStyle}>{application.milRetireeYN ? 'Yes' : 'No'}</td>
                            <td className={dataStyle}>{application.milSpouseYN ? 'Yes' : 'No'}</td>
                            <td className={dataStyle}>{application.referred ? 'Yes' : 'No'}</td>
                            <td className={dataStyle}>{application.referred_by}</td>
                            <td className={dataStyle}>{application.removed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}