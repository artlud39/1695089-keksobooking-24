const DEFAULT_VALUE = 'any';

const HOUSING_PRICE = {
  min: 10000,
  middle: 50000,
};


const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomFilter = document.querySelector('#housing-rooms');
const guestFilter = document.querySelector('#housing-guests');
const checkboxFeatures = document.querySelectorAll('.map__checkbox');

const filterType = function (announcement) {
  return (typeFilter.value === announcement.offer.type) || (typeFilter.value === DEFAULT_VALUE);
};

const filterPrice = function (announcement) {
  switch (priceFilter.value) {
    case 'low':
      return announcement.offer.price < HOUSING_PRICE.min;
    case 'middle':
      return announcement.offer.price >= HOUSING_PRICE.min && announcement.offer.price <= HOUSING_PRICE.middle;
    case 'high':
      return announcement.offer.price > HOUSING_PRICE.middle;
    default:
      return true;
  }
};

const filterRoomNumber = function (announcement) {
  return (roomFilter.value === announcement.offer.rooms.toString()) || (roomFilter.value === DEFAULT_VALUE);
};

const filterGuestNumber = function (announcement) {
  return (guestFilter.value === announcement.offer.guests.toString()) || (guestFilter.value === DEFAULT_VALUE);
};

const filterFeatures = (announcement) => Array.from(checkboxFeatures)
  .every((checkbox) => {
    if (!checkbox.checked) {
      return true;
    }
    if (!announcement.offer.features) {
      return false;
    }
    return announcement.offer.features.includes(checkbox.value);
  });

const getFilteredAds = (ads) => {
  const filteredAds = [];
  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      filterType(ad) &&
      filterPrice(ad) &&
      filterRoomNumber(ad) &&
      filterGuestNumber(ad) &&
      filterFeatures(ad)
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};


export {getFilteredAds};
