export default function ConfirmationModal({ setIsModalOpened, setResponse, response }) {

	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#00000080',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<div className={{
				backgroundColor: 'white',
				padding: 20,
				borderRadius: 5,
				boxShadow: '0 0 10 #0000001a',
				maxWidth: '50%',
				maxHeight: '80%',
				overflow: 'auto',
				position: 'relative'
			}}
			>
				<div className="relative bg-[#fff] py-4 px-2 max-w-[500px] rounded-[5px] share-modal mx-auto">
					{response === 'Yes' ?
						<div className="p-5 text-center flex justify-center flex-col items-center">
							<p className="w-full text-center font-semibold mb-[5px] text-[24px]">
								Thank you!
							</p>

							<p className="w-full text-center font-medium mb-[30px] text-[18px]">
								Post submitted successfully for review.
							</p>

							<button
								href={'/blogs'}
								className="bg-mw_green md:text-xl text-mw_black text-center font-bold rounded-xl px-4 lg:py-2  max-w-[200px] hover-scale-btn hover:bg-mw_olive cursor-pointer h-[40px] lg:min-h-[44px] min-w-[150px] leading-normal inline-flex items-center justify-center"
								onClick={() => setIsModalOpened(false)}
							>
								Done
							</button>
						</div>
						: (
							<div className="p-5">
								<div className="pl-2 pt-2 justify-between flex text-center">
									<p className="w-full text-center font-semibold mb-[30px] text-[24px]">
										Are you sure you want to submit this article?
									</p>
								</div>

								<div className="flex h-15 justify-center items-center gap-3">
									<button
										className="bg-mw_green hover-scale-btn md:text-xl text-mw_black text-center font-bold rounded-xl px-4 lg:py-2   hover:bg-mw_olive cursor-pointer h-[40px] lg:min-h-[44px] min-w-[150px] leading-normal inline-flex items-center justify-center"
										onClick={() => setResponse("Yes")}
									>
										Yes
									</button>

									<button
										className="bg-mw_green md:text-xl text-mw_black text-center font-bold rounded-xl px-4 lg:py-2   hover:bg-mw_olive cursor-pointer h-[40px] lg:min-h-[44px] min-w-[150px] leading-normal inline-flex items-center hover-scale-btn justify-center"
										onClick={() => { setResponse("No"); setIsModalOpened(false) }}
									>
										No
									</button>
								</div>
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
};
