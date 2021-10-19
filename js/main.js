import {createAnnouncements} from './data.js';

const announcementDialog = document.querySelector('#map-canvas');
const similarAnnouncementTemplate = document.querySelector('#card').content.querySelector('.popup');


const similarAnnouncements = createAnnouncements();

const TYPE_OFFERS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getOfferType = function(type) {
  return TYPE_OFFERS[type];
};

similarAnnouncements.forEach( (announcement) => {
  const announcementElement = similarAnnouncementTemplate.cloneNode(true);
  announcementElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = `${announcement.offer.price  } ₽/ночь`;
  announcementElement.querySelector('.popup__type').textContent = getOfferType(announcement.offer.type);
  announcementElement.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms  }комнаты для${  announcement.offer.guests  }гостей`;
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после${  announcement.offer.checkin  }, выезд до${  announcement.offer.checkout}`;
  announcementElement.querySelector('.popup__features').textContent = ;
  announcementElement.querySelector('.popup__description') = announcement.offer.description;

  announcementElement.querySelector('.popup__photos').textContent = announcement.offer.photos; // Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

  announcementDialog.appendChild(announcementElement);
});


