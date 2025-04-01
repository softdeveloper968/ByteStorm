"use client";
import { Container, SectionTitle } from "@/app/list-a-home/common/NoHouses";
import Link from "next/link";

const ProcessCard = ({ title, content, number, borderColor }) => (
  <div
    style={{
      borderColor: borderColor,
    }}
    className={`border-[${borderColor}] relative shadow-lg rounded-lg p-5 md:p-8 ps-10 md:ps-12 mb-6 md:mb-8 md:w-[515px] md:h-[236px] border-[3px]`}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        borderWidth: "3px",
        borderColor: borderColor,
        backgroundColor: "white",
		top: "50%",
        transform: "translateY(-50%)",
		left: "-25px",
      }}
      className={"p-1 flex items-center justify-center absolute"}
    >
      <span className={"font-bold text-xl"} style={{ color: borderColor }}>
        {number}
      </span>
    </div>
    <h3 className={"mb-2"}>{title}</h3>
    <p>{content}</p>
  </div>
);

const SellingProcess = (props) => {
	return (
		<Container className="px-4 py-5 md:p-10 xl:p-12"
			style={{
				backgroundColor: 'white',
				color: '#29262c',
			}}>
			<SectionTitle className={"text-center md:text-left text-2xl md:text-3xl font-roboto"} title={props.content.title}/>
			<div className={'flex flex-wrap p-3 ps-5 md:p-8 justify-around'}>
				{props.content.content.map((item, index) => (
					<ProcessCard key={item.title + index} number={index + 1}
					             borderColor={getColorByIndex(index + 1)}
					             title={item.title}
					             content={item.content}
					/>
				))}
			</div>
			{/* <div className={'flex max-w-full my-2 me-20 justify-end'}>
				<ListHomeButton isRent={props.isRent}/>
			</div> */}
		</Container>
	);
};

function getColorByIndex(index) {
	switch (index) {
		case 1:
			return '#c5c3c3';
		case 2:
			return '#928d8d';
		case 3:
			return '#515151';
		case 4:
			return '#DF6F97';
		case 5:
			return '#F20359';
		case 6:
			return '#BF084A';
	}
}

export const ListHomeButton = (props) => (
	// should navigate to listing home
	<Link href={props.isRent ? "/list-a-home/for-rent-by-owner/list-your-home" : "/list-a-home/for-sale-by-owner/list-your-home"}>
		<button className="inline-block btn-3 site-nav_link md:max-w-[auto] md:w-auto   text-xl text-center px-5 py-2 primary-button-hover cursor-pointer rounded-full">
			List your home
		</button>
	</Link>
);

export default SellingProcess;