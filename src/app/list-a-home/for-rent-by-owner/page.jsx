import {FSBO} from "@/app/list-a-home/for-sale-by-owner/page";
import React from "react";
import {FaUsers} from "react-icons/fa";
import {FaDollarSign, FaShuffle} from "react-icons/fa6";

export default function ForSaleByOwner() {
	return (
		<FSBO route={'For Rent by Owner'}
		      benefits={benefits}
		      rightForYou={rightForYou}
		      sellingProcess={sellingProcess}
		      isRent={true}
		/>
	);
}

const benefits = {
	title: 'For Rent By Owner Perks',
	cards: [
		{
			title: 'Cost Savings',
			icon: <FaDollarSign size={40}/>,
			label: 'Save money and avoid the typical fees',
		},
		{
			title: 'More Flexibility',
			icon: <FaShuffle size={40}/>,
			label: 'Increased flexibility to schedule showings, open houses, and handle inquiries on your own time, without relying on a property manager’s schedule',
		},
		{
			title: 'Increased engagement',
			icon: <FaUsers size={40}/>,
			label: 'Renting FRBO gives landlord full control over the process. Set the price, negotiate directly with renters, and manage the entire transaction yourself',
		},
	],
};
const rightForYou = {
	title: 'Which Renting Method is Right for You?',
	tooltip: [
		{
			title: 'Using an Agent',
			content: [
				{
					label: 'Save time.',
					text: 'Agents free up a lot of your time, so you’re not responsible for tasks like coordinating showings, listing your home, marketing, etc.',
				},
				{
					label: 'Professional expertise.',
					text: 'MustWants Pro Agents understand your experience and can help reduce the stress related to the renting process, understanding the market, and answering renter questions.',
				},
				{
					label: 'Valuable resource.',
					text: 'Fees are negotiable and the right agent can bring great value.',

				},
			],
		},
		{
			title: 'For Rent by Owner',
			content: [
				{
					label: 'Save money.',
					text: 'Avoid the typical fee that real estate agents charge.',
				},
				{
					label: 'Increased flexibility.',
					text: 'Schedule home tours and handle inquiries on your own time.',
				},
				{
					label: 'Increased engagement.',
					text: 'Set the price, negotiate directly with renters, and manage the entire process yourself.',
				},
			],
		},
	],
};

const sellingProcess = {
	title: 'Renting Process',
	content: [
		{
			title: 'Prepare your property',
			content: 'Ensure your property is in excellent condition. Clean thoroughly, make necessary repairs, and consider upgrades that can make the property more attractive to potential tenants.',
		},
		{
			title: 'Set the right rent price',
			content: 'Attract potential buyers by creating listings on MustWants, social media platforms, and signage in your neighborhood. Professional photos and detailed descriptions can help showcase your home effectively.',
		},
		{
			title: 'Market your property',
			content: 'Advertise your property through various channels like online listings, social media, and local newspapers. High-quality photos and detailed descriptions can significantly increase interest from potential tenants.',
		},
		{
			title: 'Screen potential tenants',
			content: 'Thoroughly screen applicants to find reliable tenants. This includes conducting background checks, verifying employment and income, and checking rental history and references.',
		},
		{
			title: 'Draft a lease agreement',
			content: 'Create a comprehensive lease agreement that outlines the terms of the tenancy, including rent amount, due dates, security deposit, and maintenance responsibilities. Ensure it complies with local laws and regulations.',
		},
		{
			title: 'Manage the property',
			content: 'Once the tenant moves in, maintain regular communication and address any maintenance issues promptly. Keep detailed records of all transactions and interactions to ensure a smooth landlord-tenant relationship.',
		},
	],

};
