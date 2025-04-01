import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const mapStyles = [
  { id: 0, label: "Streets", value: "streets-v12" },
  { id: 1, label: "Satellite Streets", value: "satellite-streets-v12" },
  { id: 2, label: "Light", value: "light-v11" },
  { id: 3, label: "Dark", value: "dark-v11" },
  { id: 4, label: "Outdoors", value: "outdoors-v12" },
];

const shadowStyle = {
    boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)`
};

export default function MapStyleDropdown({ mapRef }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(mapStyles[0].label);
	const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionClick = (option) => {
		const selectedStyle = `mapbox://styles/mapbox/${option.value}`;

		setMapStyle(selectedStyle);
		setSelectedOption(option.label);
		setIsOpen(false);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (mapRef.current) {
			const mapInstance = mapRef.current.getMap();
			mapInstance.setStyle(mapStyle);
		}
	}, [mapStyle, mapRef]);

	return (
		<div
			className="relative bg-white text-black text-base w-48 border-2 border-black rounded-lg"
			ref={dropdownRef}
			style={{ ...shadowStyle }}
		>
			<h2 className="text-base text-center border-b-2 border-black mx-2 py-2">
				Select Map Style
			</h2>

			<div
				className="flex bg-white justify-between items-center rounded-lg px-4 py-2 cursor-pointer"
				onClick={toggleDropdown}
			>
				<span>{selectedOption || 'Select an option'}</span>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</div>

			{isOpen && (
				<div
					className="absolute bg-white w-full border-2 border-black rounded-lg mt-1 z-10"
					style={{ ...shadowStyle }}
				>
					{mapStyles.map(option => (
						<p
							key={option.id}
							className="rounded-lg pl-4 py-1 hover:bg-slate-300 cursor-pointer"
							onClick={() => handleOptionClick(option)}
						>
							{option.label}
						</p>
					))}
				</div>
			)}
		</div>
	);
};
