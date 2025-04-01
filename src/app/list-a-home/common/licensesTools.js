/**
 * Check if the license is active and not expired.
 * @param license
 * @return {boolean}
 */
export function validLicense(license) {
  const now = Date.now() / 1000;
  return license.status === "active" && license.currentPeriodEnd > now;
}

export function sortLicenses(b, a) {
  if (b.status < a.status) return -1;
  else if (b.status === "canceled" && a.status === "canceled") {
    return a.canceledAt - b.canceledAt;
  } else return 1;
}

/**
 * Should check if the user has an active listing without a license attached
 * @param licenses
 * @param listings
 * @param draft the new listing to check
 * @return {boolean} true if there is already an active listing without a license attached
 */
export function needsLicense(licenses, listings, draft) {
  const draftId = draft.listingId ? draft.listingId : draft._id;
  let activeListingsId = listings
    .filter(
      (listing) =>
        (listing.isGlobalHouse === true
          || listing.status === "in_review"
        ),
    )
    .map((listing) => listing._id);
  activeListingsId.push(draftId);
  activeListingsId = activeListingsId.filter(onlyUnique);
  if (activeListingsId.filter((listing) => listing !== draftId).length === 0)
    return false;

  if (activeListingsId.length === 1 && draftId === activeListingsId[0]) {
    return false;
  }
  const licenseForDraft =
    licenses.filter(
      (license) => validLicense(license) && license.attachedTo === draftId,
    ).length > 0;
  if (licenseForDraft === true) return false;
  if (
    activeListingsId.length > 0 &&
    licenses.filter((license) => validLicense(license)).length === 0
  )
    return true;
  // INFO: for listing that are already published, the subscription is tied to the 'listingId' property
  const attachedLicenses = licenses
    .filter((license) => validLicense(license))
    .map((license) => license.attachedTo);
  const listingsWithLicenses = activeListingsId.filter((listing) =>
    attachedLicenses.includes(listing),
  );
  const numberOfListingWithoutLicense =
    activeListingsId.length - listingsWithLicenses.length;
  // TODO: should consider the draft in the length
  if (
    numberOfListingWithoutLicense === 1 &&
    !listingsWithLicenses.includes(draftId)
  ) {
    return false;
  }

  return numberOfListingWithoutLicense >= 1;
}

export function secondsToDays(seconds) {
  return (seconds / (60 * 60 * 24)).toFixed(0);
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

/**
 * This is the logic for the small dialog for every license.
 * Aims to give feedback to the user, and one action.
 * @param license the full object.
 * @return {{feedback: string, clickLabel: string}} feedback is the text, and the click label the text to click
 */
export function feedbackLicense(license) {
  let feedback = "";
  let clickLabel = "";
  if (license.status.toLowerCase() === "canceled") {
    const canceledAt = new Date(license.canceledAt * 1000);
    feedback = `Your license is canceled ${canceledAt.toLocaleDateString()}`;
    clickLabel = "Renew Subscription";
  }
  if (license.status.toLowerCase() === "active") {
    const willRenew = !license.cancelAtPeriodEnd;
    const activeUntil = new Date(license.currentPeriodEnd * 1000);
    feedback = "License is active";

    if (willRenew) {
      feedback += `, will renew on ${activeUntil.toLocaleDateString()}`;
    } else {
      feedback += ` until ${activeUntil.toLocaleDateString()} and will not renew`;
    }
    clickLabel = willRenew ? "Don't renew" : "Resume the subscription";
  } else clickLabel = "Buy a license";

  return { feedback, clickLabel };
}
