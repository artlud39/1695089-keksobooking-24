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

const getSimilarAnnouncement = function ({ author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } }) {
  const announcementElement = getAnnouncementTamplate();
  if (title) {
    announcementElement.querySelector('.popup__title').textContent = title;
  } else {
    announcementElement.querySelector('.popup__title').remove();
  }
  if (address) {
    announcementElement.querySelector('.popup__text--address').textContent = address;
  } else {
    announcementElement.querySelector('.popup__text--address').remove();
  }
  if (price) {
    announcementElement.querySelector('.popup__text--price').textContent = `${price  } ₽/ночь`;
  } else {
    announcementElement.querySelector('.popup__text--price').remove();
  }
  if (type) {
    announcementElement.querySelector('.popup__type').textContent = getOfferType(type);
  } else {
    announcementElement.querySelector('.popup__type').remove();
  }
  if (rooms && guests) {
    announcementElement.querySelector('.popup__text--capacity').textContent = `${rooms  } комнаты для ${  guests  } гостей`;
  } else {
    announcementElement.querySelector('.popup__text--time').remove();
  }
  if (checkin && checkout) {
    announcementElement.querySelector('.popup__text--time').textContent = `Заезд после ${  checkin  }, выезд до ${  checkout}`;
  } else {
    announcementElement.querySelector('.popup__text--time').remove();
  }
  if (features) {
    const getFeaturesList = function() {
      const featuresContainer = announcementElement.querySelector('.popup__features').cloneNode(true);
      const featuresList = featuresContainer.querySelectorAll('.popup__feature');

      featuresList.forEach((featureItem) => {
        const isNecessary = features.some(
          (userFeature) => featureItem.classList.contains(`popup__feature--${userFeature}`),
        );
        if (!isNecessary) {
          featureItem.remove();
        }
      });
      return featuresContainer;
    };

    announcementElement.replaceChild(getFeaturesList(),announcementElement.querySelector('.popup__features'));
  } else {
    announcementElement.querySelector('.popup__features').remove();
  }
  if (description) {
    announcementElement.querySelector('.popup__description').textContent = description;
  } else {
    announcementElement.querySelector('.popup__description').remove();
  }
  if (photos) {
    const getPhotoList = function() {
      const photoList = announcementElement.querySelector('.popup__photos');
      const photoItem = photoList.querySelector('.popup__photo');
      const photosContainer = photoList.cloneNode(false);
      const photosListFragment = document.createDocumentFragment();

      for (let i = 0; i < photos.length; i++) {
        const photoElement = photoItem.cloneNode(true);
        const element = photos[i];
        photoElement.src = element;
        photosListFragment.append(photoElement);
      }
      photosContainer.append(photosListFragment);
      return photosContainer;
    };

    announcementElement.replaceChild(getPhotoList(),announcementElement.querySelector('.popup__photos'));
  } else {
    announcementElement.querySelector('.popup__photos').remove();
  }
  if (avatar) {
    announcementElement.querySelector('.popup__avatar').src = avatar;
  } else {
    announcementElement.querySelector('.popup__avatar').remove();
  }
  return announcementElement;
};

export  {getSimilarAnnouncement};
