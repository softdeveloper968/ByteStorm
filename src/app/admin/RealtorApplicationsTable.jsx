import { useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt, FaEnvelope, FaEdit, FaUndo, FaSave, FaPlus, FaMinus } from "react-icons/fa";

const headerStyle = 'px-6 py-2 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider';
const dataStyle = 'px-6 py-4 whitespace-nowrap text-black overflow-x-auto max-w-sm border-r-2 border-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100';

export default function RealtorApplicationsTable({
    applications, role, status, removed, reviewApplication, removeApplication, resendApplication, restoreApplication, editApplication, setMessage
}) {
    const [id, setId] = useState("");
    const [field, setField] = useState("");
    const [value, setValue] = useState("");

    const [newLicense, setNewLicense] = useState({ license_state: "", license_number: "" });
    const [showLicenseInput, setShowLicenseInput] = useState(null);

    const [newMLS, setNewMLS] = useState({ mls_name: "" });
    const [showMLSInput, setShowMLSInput] = useState(null);

    const [newZipcode, setNewZipcode] = useState("");
    const [showZipInput, setShowZipInput] = useState(null);

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

    const handleLicenseAdd = (id) => {
        if (newLicense.license_state.trim() !== "" && newLicense.license_number.trim() !== "") {
            const updatedLicenses = [
                ...applications.find(app => app._id === id).license_info,
                newLicense
            ];
            editApplication(id, role, "license_info", updatedLicenses);
            setNewLicense({ license_state: "", license_number: "" });
            setMessage("");
            setShowLicenseInput(null);
        }
    };

    const handleLicenseRemove = (id, licenseToRemove) => {
        const updatedLicenses = applications.find(app => app._id === id).license_info.filter(
            license => license.license_state !== licenseToRemove.license_state || license.license_number !== licenseToRemove.license_number
        );
        editApplication(id, role, "license_info", updatedLicenses);
        setMessage("");
    };

    const handleMLSAdd = (id) => {
        if (newMLS.mls_name.trim() !== "") {
            const updatedMLS = [
                ...applications.find(app => app._id === id).mls_info,
                newMLS
            ];
            editApplication(id, role, "mls_info", updatedMLS);
            setNewMLS({ mls_name: "" });
            setMessage("");
            setShowMLSInput(null);
        }
    };

    const handleMLSRemove = (id, mlsToRemove) => {
        const updatedMLS = applications.find(app => app._id === id).mls_info.filter(
            mls => mls.mls_name !== mlsToRemove.mls_name
        );
        editApplication(id, role, "mls_info", updatedMLS);
        setMessage("");
    };

    const handleZipAdd = (id) => {
        if (newZipcode.trim() !== "") {
            const updatedCoverage = [
                ...applications.find(app => app._id === id).coverage,
                { zipcode: newZipcode }
            ];
            editApplication(id, role, "coverage", updatedCoverage);
            setNewZipcode("");
            setMessage("");
            setShowZipInput(null);
        }
    };

    const handleZipRemove = (id, zipToRemove) => {
        const updatedCoverage = applications.find(app => app._id === id).coverage.filter(
            zip => zip.zipcode !== zipToRemove.zipcode
        );
        editApplication(id, role, "coverage", updatedCoverage);
        setMessage("");
    };

    const realtor_application_fields = ["name", "email", "phone", "address", "link", "bio", "brokerage_name", "subscriptionLevel", "approvalStatus", "yearsExperience", "annualVolume", "annualTransactions", "percentClientADMilitary", "percentClientVets", "mil_branch", "mil_other", "social_media_facebook", "social_media_linkedin", "social_media_instagram", "social_media_x"];
    const realtor_number_fields = ["yearsExperience", "annualVolume", "annualTransactions", "percentClientADMilitary", "percentClientVets"];

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

                        <th className={headerStyle}>License Info</th>
                        <th className={headerStyle}>MLS Names</th>
                        <th className={headerStyle}>Coverage</th>

                        <th className={headerStyle}>Headshot</th>
                        <th className={headerStyle}>Logo</th>

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
                            <td className={`${dataStyle} flex items-center space-x-3 mt-12`}>
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

                            {realtor_application_fields.map((fieldName) => (
                                <td key={fieldName} className={dataStyle}>
                                    {id === application._id && field === fieldName ? (
                                        <div className="flex items-center">
                                            <input
                                                type={realtor_number_fields.includes(fieldName) ? "number" : "text"}
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

                            <td className={dataStyle}>
                                {application.license_info.map((license, index) => (
                                    <div key={index} className="flex items-center">
                                        <span>{license.license_state} - {license.license_number}</span>
                                        <button className="text-red-600 hover:text-red-800 ml-2" onClick={() => handleLicenseRemove(application._id, license)}>
                                            <FaMinus size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button className="text-green-600 hover:text-green-800 mt-2" onClick={() => setShowLicenseInput(application._id)}>
                                    <FaPlus size={16} />
                                </button>
                                {showLicenseInput === application._id && (
                                    <div className="flex items-center mt-2">
                                        <input type="text" value={newLicense.license_state} onChange={(e) => setNewLicense({ ...newLicense, license_state: e.target.value })} className="border p-1 rounded" placeholder="State" />
                                        <input type="text" value={newLicense.license_number} onChange={(e) => setNewLicense({ ...newLicense, license_number: e.target.value })} className="border p-1 rounded" placeholder="Number" />
                                        <button className="text-green-600 hover:text-green-800 ml-2" onClick={() => handleLicenseAdd(application._id)}>
                                            <FaCheck size={16} />
                                        </button>
                                    </div>
                                )}
                            </td>

                            <td className={dataStyle}>
                                {application.mls_info.map((mls, index) => (
                                    <div key={index} className="flex items-center">
                                        <span>{mls.mls_name}</span>
                                        <button className="text-red-600 hover:text-red-800 ml-2" onClick={() => handleMLSRemove(application._id, mls)}>
                                            <FaMinus size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button className="text-green-600 hover:text-green-800 mt-2" onClick={() => setShowMLSInput(application._id)}>
                                    <FaPlus size={16} />
                                </button>
                                {showMLSInput === application._id && (
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            value={newMLS.mls_name}
                                            onChange={(e) => setNewMLS({ ...newMLS, mls_name: e.target.value })}
                                            className="border p-1 rounded"
                                            placeholder="MLS Name"
                                        />
                                        <button className="text-green-600 hover:text-green-800 ml-2" onClick={() => handleMLSAdd(application._id)}>
                                            <FaCheck size={16} />
                                        </button>
                                    </div>
                                )}
                            </td>

                            <td className={dataStyle}>
                                <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {application.coverage.map((zip, index) => (
                                        <div key={index} className="flex items-center justify-between border-b py-1">
                                            <span>{zip.zipcode}</span>
                                            <button className="text-red-600 hover:text-red-800 ml-2 mr-2" onClick={() => handleZipRemove(application._id, zip)}>
                                                <FaMinus size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="text-green-600 hover:text-green-800 mt-2" onClick={() => setShowZipInput(application._id)}>
                                    <FaPlus size={16} />
                                </button>
                                {showZipInput === application._id && (
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            value={newZipcode}
                                            onChange={(e) => setNewZipcode(e.target.value)}
                                            className="border p-1 rounded"
                                            placeholder="Zip Code"
                                        />
                                        <button className="text-green-600 hover:text-green-800 ml-2" onClick={() => handleZipAdd(application._id)}>
                                            <FaCheck size={16} />
                                        </button>
                                    </div>
                                )}
                            </td>

                            <td className={`${dataStyle} text-center`}>
                                <img src={application.agentHeadshotUrl} alt="Agent Headshot" className="h-9 w-9" />
                            </td>
                            <td className={`${dataStyle} text-center`}>
                                <img src={application.brokerageLogoUrl} alt="Brokerage Logo" className="h-9 w-9" />
                            </td>

                            <td className={dataStyle}>{application.ownBrokerageYN ? 'Yes' : 'No'}</td>
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