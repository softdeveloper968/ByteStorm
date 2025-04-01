import React from "react"

const OptionComponent = (props) => {
  return <option value={props.option}>{enumTraductor(props.option)}</option>;
};

export function enumTraductor(word) {
	return (
		word.charAt(0).toUpperCase() +
		word.slice(1).toLowerCase().split("_").join(" ")
	)
}

export function addressConverter({general}) {
	const {address, number, zipcode, city, state, country} = general
	const noAddressMessage = "No Address Specified"
	return address && city && country
		? `${address} ${number} ${zipcode} ${city} ${state} ${country}`
			.replace(/\s+/g, " ")
			.trim()
		: address
			? address
			: noAddressMessage
}

export function detailsConverter({price}) {
	const rentPrice = price.forRent && price.rent.lease.monthlyRent ? price.rent.lease.monthlyRent.toLocaleString() : 0
	const salePrice = price?.price
		? commaParser(price.price)
		: "No Price yet"
	const squareFootage = price?.details?.squareFootage
		? `| ${commaParser(price.details.squareFootage)}${price.details.squareFootageUnit} `
		: ""
	const beds = price.details.beds ? `| ${price.details.beds} bds ` : ""
	const totalBaths =
		Number(price?.details?.fullBaths) +
		Number(price?.details?.smallBaths) +
		Number(price?.details?.halfBaths) +
		Number(price?.details?.tqBaths)
	const baths = totalBaths ? `| ${totalBaths} ba ` : ""
	const combinedPrice = price.price && price.forRent ? `$${salePrice}/$${rentPrice}`
		: price.forRent ? rentPrice : salePrice

	return `${combinedPrice} ${beds} ${baths} ${squareFootage}`
		.replace(/\s+/g, " ")
		.trim()
}

function commaParser(number) {
	return Number(number).toLocaleString()
}
export default OptionComponent