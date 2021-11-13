const TYPE_OFFERS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getOfferType = (type) => TYPE_OFFERS[type];

const getAnnouncementTemplate = () => {
  const similarAnnouncementTemplate = document.querySelector('#card').content.querySelector('.popup');
  return similarAnnouncementTemplate.cloneNode(true);
};

const removeElement = (element,offerElement) => {
  if (element) {
    offerElement.textContent = element;
  } else {
    offerElement.remove();
  }
};

const getSimilarAnnouncement = ({ author: { avatar }, offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } }) => {
  const announcementElement = getAnnouncementTemplate();
  const avatarImg = announcementElement.querySelector('.popup__avatar');
  const offerTitle = announcementElement.querySelector('.popup__title');
  const offerLocation = announcementElement.querySelector('.popup__text--address');
  const offerPrice = announcementElement.querySelector('.popup__text--price');
  const offerType = announcementElement.querySelector('.popup__type');
  const offerCapacity = announcementElement.querySelector('.popup__text--capacity');
  const offerTime = announcementElement.querySelector('.popup__text--time');
  const offerFeatures = announcementElement.querySelector('.popup__features');
  const offerDescription = announcementElement.querySelector('.popup__description');
  const offerPhotos = announcementElement.querySelector('.popup__photos');

  removeElement(title,offerTitle);
  removeElement(address,offerLocation);
  removeElement(description,offerDescription);

  if (price) {
    offerPrice.textContent = `${price  } ₽/ночь`;
  } else {
    offerPrice.remove();
  }
  if (type) {
    offerType.textContent = getOfferType(type);
  } else {
    offerType.remove();
  }
  if (rooms && guests) {
    offerCapacity.textContent = `${rooms  } комнаты для ${  guests  } гостей`;
  } else {
    offerTime.remove();
  }
  if (checkin && checkout) {
    offerTime.textContent = `Заезд после ${  checkin  }, выезд до ${  checkout}`;
  } else {
    offerTime.remove();
  }
  if (features) {
    const getFeaturesList = () => {
      const featuresContainer = offerFeatures.cloneNode(true);
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

  if (photos) {
    const getPhotoList = () => {
      const photoItem = offerPhotos.querySelector('.popup__photo');
      const photosContainer = offerPhotos.cloneNode(false);
      const photosListFragment = document.createDocumentFragment();

      for (let el = 0; el < photos.length; el++) {
        const photoElement = photoItem.cloneNode(true);
        const element = photos[el];
        photoElement.src = element;
        photosListFragment.append(photoElement);
      }
      photosContainer.append(photosListFragment);
      return photosContainer;
    };

    announcementElement.replaceChild(getPhotoList(),offerPhotos);
  } else {
    offerPhotos.remove();
  }
  if (avatar) {
    avatarImg.src = avatar;
  } else {
    avatarImg.remove();
  }
  return announcementElement;
};

export  {getSimilarAnnouncement};
