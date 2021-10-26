const titleAnnouncementInput = document.querySelector('#title');
const priceAnnouncementInput = document.querySelector('#price');
const adForm = document.querySelector('.ad-form');
const roomNumberAnnouncementSelect = adForm.querySelector('#room_number');
const capacityRoomAnnouncementSelect = adForm.querySelector('#capacity');

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;


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


const getCompareRoomsAndGuests = function () {
  const valueRooms = roomNumberAnnouncementSelect.value;
  const valueGuests = capacityRoomAnnouncementSelect.value;
  if (valueRooms === '1' && valueGuests !== '1') {
    roomNumberAnnouncementSelect.setCustomValidity('1 комната — «для 1 гостя»');
  } else if (valueRooms === '2' && valueGuests === '0' || valueGuests === '3') {
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


roomNumberAnnouncementSelect.addEventListener('input', () => {
  getCompareRoomsAndGuests();
});

capacityRoomAnnouncementSelect.addEventListener('input', () => {
  getCompareRoomsAndGuests();
});
