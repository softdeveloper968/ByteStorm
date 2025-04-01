import {streamToString} from "next/dist/server/stream-utils/node-web-streams-helper"

/**
 * This is intended to be the automatic checkout, redirection included.
 * @param userId user._id
 * @param listingId the listingId to be attached (not the ._id)
 * @param token the endpoint is secure, the jwt is needed
 * @param isRenting this is required for the redirection after the checkout
 * @param router this is required for the redirection to the checkout page.
 */
export function submitWithCheckout(
	userId,
	listingId,
	token,
	isRenting,
	router,
) {
	const body = {
		type: "MLS_LICENSE",
		userID: userId,
		property: listingId,
		isRent: isRenting,
	};
	fetch(process.env.NEXT_PUBLIC_API_URL + "/user/checkout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	}).then((res) => {
		streamToString(res.body)
			.then((res) => JSON.parse(res))
			.then((res) => router.push(res.url));
	});
}


export async function handleSubscription(subscription, token, router) {
	if (subscription.status === "canceled") {
		submitWithCheckout(
			subscription.userId,
			subscription.attachedTo,
			token,
			false,
			router,
		);
	}
	const url =
		process.env.NEXT_PUBLIC_API_URL +
		"/user/checkout/" +
		subscription.subscriptionId;
	const params = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const shouldDelete =
		subscription.currentPeriodEnd - Date.now() / 1000 > 0 &&
		subscription.status === "active" &&
		!subscription.cancelAtPeriodEnd;
	if (shouldDelete) {
		params.method = "DELETE";
	} else {
		params.method = "PUT";
	}

	await fetch(url, params)
		.then((res) => res.json())
}

