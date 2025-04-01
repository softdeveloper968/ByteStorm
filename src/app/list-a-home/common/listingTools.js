export function dtoToListing(dto) {
  return {
    _id: dto._id,
    status: dto.status,
    propertyStatus: dto.propertyStatus,
    photos: dto.photos,
    price: {
      forRent: dto.forRent,
      price: dto.price,
      details: {
        beds: dto.beds,
        fullBaths: dto.fullBaths,
        smallBaths: dto.smallBaths,
        halfBaths: dto.halfBaths,
        tqBaths: dto.tqBaths,
        squareFootage: dto.squareFootage,
        squareFootageUnit: dto.squareFootageUnit,
      },
    },
    isGlobalHouse: true,
    general: {
      nickname: dto.nickname,
      address: dto.address,
      number: "",
      zipcode: "",
      state: "",
      country: "",
    },
  };
}
