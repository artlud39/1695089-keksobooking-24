import {sendData} from './api.js';
import {showSuccessMessage,showErrorMessage} from './user-modal.js';
import {resetAddress,resetMap,removeAdMarkers,renderAnnouncement} from './map.js';

const typeOfPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const titleAnnouncementInput = document.querySelector('#title');
const priceAnnouncementInput = document.querySelector('#price');
const adForm = document.querySelector('.ad-form');
const roomNumberAnnouncementSelect = adForm.querySelector('#room_number');
const capacityRoomAnnouncementSelect = adForm.querySelector('#capacity');
const allFormFieldset = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilter = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');
const addressAnnouncementInput = document.querySelector('#address');
const typeAnnouncementSelect = document.querySelector('#type');
const timeInAnnouncementSelect = document.querySelector('#timein');
const timeOutAnnouncementSelect = document.querySelector('#timeout');
const resetButton = document.querySelector('.ad-form__reset');

const setAddresValue = (value) => {
  addressAnnouncementInput.value = value;
};

addressAnnouncementInput.readOnly = true;

titleAnnouncementInput.addEventListener('input', () => {
  const valueLength = titleAnnouncementInput.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleAnnouncementInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleAnnouncementInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    titleAnnouncementInput.setCustomValidity('');
  }
  titleAnnouncementInput.reportValidity();
});


priceAnnouncementInput.addEventListener('input', () => {
  const value = priceAnnouncementInput.value;
  if (value > MAX_PRICE_VALUE) {
    priceAnnouncementInput.setCustomValidity('Максимальное значение — 1 000 000');
  }  else {
    priceAnnouncementInput.setCustomValidity('');
  }
  priceAnnouncementInput.reportValidity();
});


typeAnnouncementSelect.addEventListener('change', () => {
  priceAnnouncementInput.placeholder = typeOfPrice[typeAnnouncementSelect.value];
  priceAnnouncementInput.min = typeOfPrice[typeAnnouncementSelect.value];
});

timeInAnnouncementSelect.addEventListener('change', () => {
  timeOutAnnouncementSelect.value = timeInAnnouncementSelect.value;
});

timeOutAnnouncementSelect.addEventListener('change', () => {
  timeInAnnouncementSelect.value = timeOutAnnouncementSelect.value;
});

const getCompareRoomsAndGuests = function () {
  const valueRooms = roomNumberAnnouncementSelect.value;
  const valueGuests = capacityRoomAnnouncementSelect.value;
  if (valueRooms === '1' && valueGuests !== '1') {
    roomNumberAnnouncementSelect.setCustomValidity('1 комната — «для 1 гостя»');
  } else if (valueRooms === '2' && (valueGuests === '0' || valueGuests === '3')) {
    roomNumberAnnouncementSelect.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
  } else if (valueRooms === '3' && valueGuests === '0') {
    roomNumberAnnouncementSelect.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (valueRooms === '100' && valueGuests !== '0') {
    roomNumberAnnouncementSelect.setCustomValidity('100 комнат — «не для гостей»');
  } else {
    roomNumberAnnouncementSelect.setCustomValidity('');
  }
  roomNumberAnnouncementSelect.reportValidity();
};

getCompareRoomsAndGuests();

roomNumberAnnouncementSelect.addEventListener('input', () => {
  getCompareRoomsAndGuests();
});

capacityRoomAnnouncementSelect.addEventListener('input', () => {
  getCompareRoomsAndGuests();
});

const getPageDiactivate = function () {
  adForm.classList.add('ad-form--disabled');
  allFormFieldset.forEach((element) => {
    element.disabled = true;
  });
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFilter.forEach((element) => {
    element.disabled = true;
  });
  mapFeatures.disabled = true;
};

const getPageActivate = function () {
  adForm.classList.remove('ad-form--disabled');
  allFormFieldset.forEach((element) => {
    element.disabled = false;
  });
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFilter.forEach((element) => {
    element.disabled = false;
  });
  mapFeatures.disabled = false;
};

const setUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  adForm.reset();
  resetAddress();
  mapFiltersForm.reset();
  resetMap();
  removeAdMarkers();
  renderAnnouncement();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

setUserFormSubmit(() => {
  showSuccessMessage();
  resetForm();
}, showErrorMessage);


export {getPageDiactivate,getPageActivate,setAddresValue};
