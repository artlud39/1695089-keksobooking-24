import {createAnnouncements} from './data.js';

const announcementDialog = document.querySelector('#map-canvas');
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

const getAnnouncementTamplate = function () {
  const similarAnnouncementTemplate = document.querySelector('#card').content.querySelector('.popup');
  const announcementElement = similarAnnouncementTemplate.cloneNode(true);
  return announcementElement;
};

const getAnnouncement = function (announcement) {
  const announcementElement = getAnnouncementTamplate();
  announcementElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = `${announcement.offer.price  } ₽/ночь`;
  announcementElement.querySelector('.popup__type').textContent = getOfferType(announcement.offer.type);
  announcementElement.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms  }комнаты для${  announcement.offer.guests  }гостей`;
  announcementElement.querySelector('.popup__text--time').textContent = `Заезд после${  announcement.offer.checkin  }, выезд до${  announcement.offer.checkout}`;

  const getFeaturesList = function() {
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
    return featuresContainer;
  };

  announcementElement.replaceChild(getFeaturesList(),announcementElement.querySelector('.popup__features'));

  announcementElement.querySelector('.popup__description').textContent = announcement.offer.description;

  const getPhotoList = function() {
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
    return photosContainer;
  };

  announcementElement.replaceChild(getPhotoList(),announcementElement.querySelector('.popup__photos'));
  announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  announcementDialog.appendChild(announcementElement);
};


const getSimilarAnnouncements = function (announcementDatas) {
  announcementDatas.forEach((announcementData) => {
    getAnnouncement(announcementData);
  });
};

getSimilarAnnouncements(similarAnnouncements);

export  {getSimilarAnnouncements};
