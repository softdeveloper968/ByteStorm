export default function SelectUserRole({ roles, role, setRole }) {

	const roleDiv = "border-mw_olive border-2 rounded-lg text-center p-2 cursor-pointer";
	const roleDivSelected = "bg-mw_olive text-white";

	return (
		<div>
			<div className="flex justify-center mb-6 gap-2">
				{roles.map(userRole => (
					<div
						key={userRole}
						className={`w-full ${roleDiv} ` + (role === userRole ? `${roleDivSelected}` : "")}
						onClick={() => setRole(userRole.toLowerCase())}
					>
						{userRole.charAt(0).toUpperCase() + userRole.slice(1)}
					</div>
				))}
			</div>
		</div>
	);
};
