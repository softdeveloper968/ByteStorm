"use client";

import { UserSelectedProContext } from "@/app/user-selected-pro-context/user-selected-pro-context";
import BaseballCard from "@/components/baseball-cards/array-baseball-card";
import { state_data } from "@/static/state-data-dropdown";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";

export default function ProfessionalArray({
  professional,
  professionalType,
  cardType,
  mapLink,
}) {
  const { userSelectedPro, setUserSelectedPro } = useContext(
    UserSelectedProContext
  );
  const [search, setSearch] = useState("");
  const [proData, setProData] = useState();
  const [state, setState] = useState("");

  const options = [{ label: "All States", value: "" }, ...state_data];

  useEffect(() => {
    const result = professional.filter(
      (pro) =>
        pro.name.toLowerCase().includes(search.toLowerCase()) ||
        pro.brokerage.toLowerCase().includes(search.toLowerCase())
    );

    setProData(result);
    setState("");
  }, [search, professional]);

  useEffect(() => {
    const result = state
      ? professional.filter((pro) => pro.address_state === state)
      : professional;

    setProData(result);
  }, [state, professional]);

  // Reset the context value to null when the component mounts
  useEffect(() => {
    setUserSelectedPro(null);
  }, [setUserSelectedPro]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5 md:mb-8 xl:flex-row md:mb-0 sm:flex-col">
        <div className="flex items-center">
          <h1 className="!text-2xl !my-4 md:!my-6 lg:!text-4xl">
            Vetted {professionalType} List
          </h1>
          <div className="relative group inline-flex ml-4 items-center hover-tooltip">
            <button className="text-mw_green !text-xl lg:!text-2xl">
              <MdInfoOutline />
            </button>
            <span className="hidden hover-content top-full md:top-auto absolute right-1/2 md:right-[auto] md:left-1/2 md:-translate-x-1/2 md:bottom-full mb-2 px-2 py-1 text-xs text-black bg-mw_green rounded opacity-0 transition-opacity duration-300 min-w-[180px] md:min-w-[300px] text-center z-[99]">
              Connect with one of our{" "}
              {professionalType === "Agents"
                ? "vetted real estate agents below."
                : "experienced real estate lenders!"}{" "}
              Search them by agency, name, or location using our{" "}
              {professionalType} Map.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-2 lg:flex-row sm:flex-col sm:gap-y-4">
          <Dropdown
            options={options}
            selectedValue={state}
            setSelectedValue={setState}
          />

          <input
            type="text"
            id="search"
            className="w-full h-[40px] text-mw_black border-transparent rounded-xl focus:border-transparent focus:ring-0
                    lg:min-w-[260px] lg:min-h-[44px] sm:w-auto"
            placeholder="Search by Name or Agency"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link
            href={mapLink}
            className="inline-flex items-center justify-center text-mw_black text-center font-bold rounded-xl px-4
                    min-w-[200px] h-[40px] leading-normal lg:min-h-[44px] lg:py-2 md:text-xl cursor-pointer primary-button-hover"
          >
            Look up {professionalType} Map <IoIosArrowForward />
          </Link>
        </div>
      </div>

      <div className="w-full overflow-y-scroll">
        {!proData ? (
          <section className="flex flex-wrap flex-row justify-center text-mw_black mb-16 mx-[-10px]">
            {professional.map((pro) => (
              <div key={pro._id} className="w-full max-w-[350px] m-4">
                <BaseballCard
                  cardType={cardType}
                  professional={pro}
                  mapLink={mapLink}
                />
              </div>
            ))}
          </section>
        ) : (
          <section className="flex flex-wrap flex-row justify-center text-mw_black mb-12 md:mb-14 mt-4 gap-5 md:gap-7 px-3">
            {proData.map((pro) => (
              <div key={pro._id} className="w-full max-w-[350px]">
                <BaseballCard
                  cardType={cardType}
                  professional={pro}
                  mapLink={mapLink}
                />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

const Dropdown = ({ options, selectedValue, setSelectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  ) || { label: "All States", value: "" };

  return (
    <div className="relative inline-block text-mw_black w-[175px]">
      <div
        className="flex bg-white items-center justify-between h-[40px] px-4 rounded-xl cursor-pointer lg:min-h-[44px]"
        onClick={toggleDropdown}
      >
        <span>{selectedOption.label}</span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 bg-white w-full mt-1 max-h-[200px] rounded-xl shadow-lg overflow-auto z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
