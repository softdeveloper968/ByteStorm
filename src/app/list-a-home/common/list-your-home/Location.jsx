"use client";

import { BottomNavigationBar } from "@/app/list-a-home/common/BottomNavigationBar";
import { BreakLine } from "@/app/list-a-home/common/BreakLine";
import { editEnum } from "@/app/list-a-home/common/list-your-home/Review";
import {
  cityValidator,
  emailValidator,
  ensureNumberInEvent,
  phoneTranslator,
  phoneValidator,
  twoCharValidator,
  zipcodeTranslator,
  zipCodeValidator,
} from "@/app/list-a-home/common/validators";
import React, { useState } from "react";

export const countries = [
  "United States",
  "American Samoa",
  "Baker Island",
  "Guam",
  "Northern Mariana Islands",
  "Puerto Rico",
  "U.S. Virgin Islands",
  "Wake Island",
];
export const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

export const labelInputStyleDiv = {
	width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', margin: '1rem 0',
};

export const editStyle = {
	borderRadius: '5px', borderColor: '#ececec',
};
export const inputStyleDiv = {
	borderRadius: '5px', borderColor: '#ececec',
};

const Location = ({data, setListingState, setListingData, editSection}) => {
	// have two classes, one that check if the field is required and other that set the style
	const [usState, setUsState] = useState(data.general.state ? data.general.state : states[0]);
	const [country, setCountry] = useState(data.general.country ? data.general.country : countries[0]);
	let inputStyle = editSection ? {...editStyle} : {...inputStyleDiv};
	const generalUpdater = (e, field) => {
		let newState = {...data};
		newState.general[field] = e.target.value;
		setListingData(newState);
	};
	const contactUpdater = (e, field) => {
		let newState = {...data};
		newState.contact[field] = e.target.value;
		setListingData(newState);
	};
	return (
		<div className={'flex justify-center flex-col items-center'}>
			{(editSection === editEnum.GENERAL || !editSection) && <>
				<h2>Home Location</h2>
				<div style={labelInputStyleDiv}>
					<h4>Home Nickname</h4>
					<RequiredContainer>
						<input
							required={true}
							className={'lg:w-[35%] w-full'}
							onChange={e => {generalUpdater(e, 'nickname'); }}
							style={inputStyle} placeholder={'eg. Beach Bungalo'}
							value={data.general.nickname}
							data-valid={twoCharValidator(data.general.nickname)}/>
						<RequiredField/>
					</RequiredContainer>
				</div>
				<div style={labelInputStyleDiv}>
					<h4>Address*</h4>
					<RequiredContainer>
						<input
							required={true}
							className={'red-placeholder lg:w-[35%] w-full'}
							style={inputStyle}
							value={data.general.address}
							data-valid={twoCharValidator(data.general.address)}
							onChange={e => generalUpdater(e, 'address')}/>
						<RequiredField/>
					</RequiredContainer>
				</div>
				<div style={labelInputStyleDiv}>
					<h4>Apartment, Suite, etc.</h4>
						<input style={inputStyle} // required
						       className={'lg:w-[35%]'}
						       value={data.general.number}
						       onChange={e => generalUpdater(e, 'number')}/>
						<RequiredField/>
				</div>
				<div style={{...labelInputStyleDiv, flexDirection: 'row', justifyContent: 'start', margin: '0'}}>
					<div
						className={editSection ? 'w-full' : 'lg:w-[35%]'}
						style={{display: "flex", justifyContent: 'space-between'}}>
						<div style={{...labelInputStyleDiv, width: '90%', marginRight: '1rem'}}>
							<h4>Zip Code*</h4>
							<RequiredContainer className={'[&>small]:w-full'}>
								<input style={{...inputStyle, width: '100%'}}
								       value={zipcodeTranslator(data.general.zipcode)}
								       required
								       data-valid={zipCodeValidator(data.general.zipcode)}
								       type={"text"}
								       onChange={e => {
												 generalUpdater(ensureNumberInEvent(e), 'zipcode')
											 }}/>
								<RequiredField/>
							</RequiredContainer>
						</div>
						<div style={{...labelInputStyleDiv, width: '90%', justifyContent: 'end', marginLeft: '1rem'}}>
							<h4>City*</h4>
							<RequiredContainer className={'[&>small]:w-full'}>
								<input style={{...inputStyle, width: '100%'}} value={data.general.city} required
								       data-valid={cityValidator(data.general.city)}
								       onChange={e => {
												 generalUpdater(e, 'city')}}
								/>
								<RequiredField/>
							</RequiredContainer>
						</div>
					</div>
				</div>
				<div style={{...labelInputStyleDiv, flexDirection: 'row', justifyContent: 'start', margin: "0"}}>
					<div
						className={editSection ? 'w-full' : 'lg:w-[35%]'}
						style={{display: "flex", justifyContent: 'space-between'}}>
						<div style={{
							...labelInputStyleDiv, width: '90%',
							marginRight: '1rem',
							display: country === countries[0] ? 'flex' : 'none',
						}}>
							<h4>State*</h4>
							<select style={{...inputStyleDiv, width: '100%'}}
							        disabled={country !== countries[0]}
							        value={usState}
							        onChange={e => {
								        setUsState(e.target.value);
								        generalUpdater(e, 'state');
							        }
							        }
							>
								{states.map(state => (<option key={state} value={state}>{state}</option>))}
							</select>
						</div>
						<div style={{...labelInputStyleDiv, width: '90%', justifyContent: 'end', marginLeft: '1rem'}}>
							<h4>Country</h4>
							<select style={{...inputStyleDiv, width: '100%'}}
							        onChange={(e) => {
								        setCountry(e.target.value);
								        generalUpdater(e, 'country');
								        if (e.target.value !== countries[0]) {
									        setUsState('');
									        generalUpdater(e, 'state');
								        } else {
									        let newState = {...data};
									        newState.general.state = states[0];
									        setListingData(newState);
								        }
							        }
							        }
							>
								{countries.map(country => (<option key={country} value={country}>{country}</option>))}
							</select>
						</div>
					</div>
				</div>
			</>}
			{![editEnum.CONTACT, editEnum.GENERAL].includes(editSection) && <BreakLine/>}
			{(editSection !== editEnum.GENERAL || !editSection) && <>
				<h2>Contact Information</h2>
				<div style={labelInputStyleDiv}>
					<h4>Select your preferred method of contact</h4>
					<div className={'my-2 flex items-center'}>
						<input type={'radio'} className={'me-2'}
						       checked={data.contact.preferred === 'email'}
						       onChange={() => {
							       document.querySelector('#phone').removeAttribute('required');
							       document.querySelector('#email').setAttribute('required', true);
							       let newData = {...data};
							       newData.contact.preferred = "email";
							       setListingData(newData);
						       }}/>
						<span className={'font-bold'}>Email</span>
					</div>
					<RequiredContainer className={'w-96 relative'}>
						<input placeholder={'email@mustwants.com'}
						       id={'email'} required
						       value={data.contact.email}
						       data-valid={emailValidator(data.contact.email)}
						       style={editStyle} onChange={e => contactUpdater(e, 'email')}/>
						<RequiredField/>
					</RequiredContainer>
					<div className={'my-2 flex items-center relative mt-8'}>
						<input type={'radio'} className={'me-2'}
						       checked={data.contact.preferred === 'phone'}
						       onChange={() => {
							       document.querySelector('#email').removeAttribute('required');
							       document.querySelector('#phone').setAttribute('required', true);
							       let newData = {...data};
							       newData.contact.preferred = "phone";
							       setListingData(newData);
						       }}/>
						<span className={'font-bold'}>Phone</span>
					</div>
					<RequiredContainer className={'w-96'}>
						<input placeholder={'000-000-0000'}
						       id={'phone'} required={false}
						       value={phoneTranslator(data.contact.phone)}
						       // value={data.contact.phone}
						       data-valid={phoneValidator(data.contact.phone)}
						       inputMode={"tel"}
						       style={editStyle} onChange={e => contactUpdater(ensureNumberInEvent(e), 'phone')}/>
						<RequiredField/>
					</RequiredContainer>
				</div>
			</>}
			{!editSection && <BottomNavigationBar setListingState={setListingState}
			                                      data={data}
			                                      setListingData={setListingData}
			/>}
		</div>);
};

export default Location;

export const RequiredField = (props) => (
	<small
		className={'hide absolute lg:translate-x-[-100%] translate-y-[3rem] left-0 lg:left-[auto]'}
		style={{color: 'red', whiteSpace:"nowrap", ...props.style}}>
		This is a required field.</small>
);

export const RequiredContainer = (props) => (
	<div className={`required-container relative ${props.className ?? ''}`}>{props.children}</div>);