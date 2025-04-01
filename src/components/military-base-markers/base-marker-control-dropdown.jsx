import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const militaryOptions = [
  { id: 0, label: "No Selection", stateKey: "none", disabled: false },
  { id: 1, label: "Air Force", stateKey: "air-force", disabled: false },
  { id: 2, label: "Army", stateKey: "army", disabled: false },
  { id: 3, label: "Coast Guard", stateKey: "coast-guard", disabled: false },
  { id: 4, label: "Department of Defense", stateKey: "dod", disabled: false },
  { id: 5, label: "Marine Corps", stateKey: "marine-corps", disabled: false },
  {
    id: 6,
    label: "National Guard Bureau",
    stateKey: "national-guard",
    disabled: true,
  },
  { id: 7, label: "Navy", stateKey: "navy", disabled: false },
  { id: 8, label: "Space Force", stateKey: "space-force", disabled: false },
];


export default function BaseMarkerControlDropdown({ markerVisibility, setMarkerVisibility }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (id, stateKey) => {
        setMarkerVisibility(prevState => {
            const newVisibility = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === stateKey;

                return acc;
            }, {});

            return newVisibility;
        });
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative bg-white text-base text-black border-2 border-black w-64 rounded-lg"
            ref={dropdownRef}
            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
        >
            <div
                className="flex justify-between items-center rounded-lg p-2 cursor-pointer"
                onClick={toggleDropdown}
            >
                <span>Select Military Service</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {isOpen && (
                <div
                    className="absolute bg-white border-2 border-black w-full rounded-lg mt-1 z-10"
                    style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                >
                    {militaryOptions
                        .filter((option) => !option.disabled)
                        .map((option) => (
                            <label htmlFor={`base-${option.id}`}
                                key={option.id}
                                className="flex items-center text-sm rounded pl-2 py-1 hover:bg-slate-300 cursor-pointer"
                                onClick={() => handleOptionClick(option.id, option.stateKey)}
                            >
                                <input
                                    type="radio"
                                    id={`base-${option.id}`}
                                    name="base-marker"
                                    className="bg-slate-500 text-black rounded mr-2 focus:ring-0 focus:ring-offset-0"
                                    checked={markerVisibility[option.stateKey]}
                                    readOnly
                                />

                                {option.label}
                            </label>
                        ))}
                </div>
            )}
        </div>
    );
};
