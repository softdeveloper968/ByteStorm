"use client";

import Benefits from "@/app/list-a-home/common/no-houses/Benefits"
import Pricing from "@/app/list-a-home/common/no-houses/Pricing"
import RightForYou from "@/app/list-a-home/common/no-houses/RightForYou"
import SellingProcess from "@/app/list-a-home/common/no-houses/SellingProcess"
const NoHouses = ({ benefits, rightForYou, sellingProcess, isRent }) => {
  return (
    <div className={"px-0"}>
      <Benefits content={benefits} isRent={isRent} />
      <RightForYou content={rightForYou} />
      <SellingProcess content={sellingProcess} isRent={isRent} />
      <Pricing />
    </div>
  );
};
export const SectionTitle = ({title, className}) => (<h2 className={className}>
	{title}
</h2>);

export const Container = (props) => (
  <div className={props.className + " p-4 md:p-12"} style={props.style}>
		{props.children}
	</div>
);

export default NoHouses;
