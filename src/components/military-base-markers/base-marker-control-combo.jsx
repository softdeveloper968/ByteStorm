const militaryOptions = [
    { id: 0, label: "No Selection", stateKey: "none", disabled: false },
    { id: 1, label: "Air Force", stateKey: "air-force", disabled: false },
    { id: 2, label: "Army", stateKey: "army", disabled: false },
    { id: 3, label: "Coast Guard", stateKey: "coast-guard", disabled: false },
    { id: 4, label: "Department of Defense", stateKey: "dod", disabled: false },
    { id: 5, label: "Marine Corps", stateKey: "marine-corps", disabled: false },
    { id: 6, label: "National Guard Bureau", stateKey: "national-guard", disabled: true },
    { id: 7, label: "Navy", stateKey: 'navy', disabled: false },
    { id: 8, label: "Space Force", stateKey: "space-force", disabled: false },
];


export default function BaseMarkerControlCombo({ baseMarkerVisibility, setBaseMarkerVisibility }) {
    const handleOptionClick = (id, stateKey) => {
        setBaseMarkerVisibility(prevState => {
            const newVisibility = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === stateKey;

                return acc;
            }, {});

            return newVisibility;
        });
    };

    return (
        <div className="bg-white text-black rounded-lg px-4 py-1">
            <h2 className="text-base mb-2">
                Select Military Service
            </h2>

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
                            checked={baseMarkerVisibility[option.stateKey]}
                            readOnly
                        />

                        {option.label}
                    </label>
                ))}
        </div>
    );
};
