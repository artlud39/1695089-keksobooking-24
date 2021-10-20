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


similarAnnouncements.forEach((announcement) => {
  const announcementElement = similarAnnouncementTemplate.cloneNode(true);
  announcementElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = `${announcement.offer.price  } ₽/ночь`;
  announcementElement.querySelector('.popup__type').textContent = getOfferType(announcement.offer.type);
  announcementElement.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms  }комнаты для${  announcement.offer.guests  }гостей`;
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после${  announcement.offer.checkin  }, выезд до${  announcement.offer.checkout}`;

  const featuresContainer = announcementElement.querySelector('.popup__features').cloneNode(true);
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((featureItem) => {
    const isNecessary = announcement.offer.features.some(
      (userFeature) => featureItem.classList.contains(`popup__feature--${userFeature}`),
    );
    if (!isNecessary) {
      featureItem.remove();
    }
  });
  announcementElement.replaceChild(featuresContainer,announcementElement.querySelector('.popup__features'));

  announcementElement.querySelector('.popup__description').textContent = announcement.offer.description;

  const photoList = announcementElement.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');
  const photosContainer = photoList.cloneNode(false);
  const photosListFragment = document.createDocumentFragment();

  for (let i = 0; i < announcement.offer.photos.length; i++) {
    const photoElement = photoItem.cloneNode(true);
    const element = announcement.offer.photos[i];
    photoElement.src = element;
    photosListFragment.append(photoElement);
  }
  photosContainer.append(photosListFragment);
  announcementElement.replaceChild(photosContainer,announcementElement.querySelector('.popup__photos'));

  announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  announcementDialog.appendChild(announcementElement);
});


