'use client';
import {Container, SectionTitle} from "@/app/list-a-home/common/NoHouses";
import React from "react";
import {FaHouseChimney} from "react-icons/fa6";

const Pricing = () => (
	<Container style={{backgroundColor: '#F3F3F3', color: '#29262C'}}>
		<SectionTitle className="text-2xl md:text-3xl font-roboto" title="Pricing"/>
		<div className={'flex justify-center mt-4 flex-wrap'}>
			<PricingCard label={'1st home for rent or sale - Free'}
			             icons={
				             <FaHouseChimney size={160}/>
			             }/>
			<PricingCard label={'2+ homes - $10/ month / home'}
			             icons={
				             <div className={'flex items-center'}>
					             <FaHouseChimney size={160}/>
					             <FaHouseChimney size={80}/>
				             </div>
			             }
			/>
			<PricingCard label={'2+ homes for veterans / military / spouses - $5/ month / home'}
			             icons={
				             <div className={'flex items-center relative'}>
					             <FaHouseChimney size={160}/>
					             <div
						             className={'flex justify-center absolute items-center'} style={{width: '100%'}}>
						             <img src={'/images/logos-partner-affiliate/star.png'}
						                  alt={'star'}
						                  style={{
							                  width: '80px',
							                  transform: 'translate(50%, 50%)',
						                  }}
						             />
					             </div>
					             <FaHouseChimney size={80}/>
				             </div>
			             }
			/>
		</div>
	</Container>
);

const PricingCard = ({label, icons}) => (
	<div className={'flex flex-col items-center'} style={{width: '450px'}}>
		{icons}
		<h5>{label}</h5>
	</div>
);

export default Pricing;