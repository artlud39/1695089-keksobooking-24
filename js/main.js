function getRandomNumber(min, max) {
  if (min < max && min >= 0 && max > 0 ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new RangeError('Ошибочные значения диапозона: первое значение должно быть меньше второго, а также диапозон может быть только положительный, включая ноль');
}
getRandomNumber(3, 19);

function getRandomGeographicalCoordinates(min, max, simbolsAfterComma) {
  if (min < max && min >= 0 && max > 0 && simbolsAfterComma >= 0 && Number.isInteger(simbolsAfterComma)) {
    return ((Math.random() * (max - min)) + min).toFixed(simbolsAfterComma);
  }
  throw new RangeError('Ошибочные значения диапозона или количества цифр после запятой: первое значение должно быть меньше второго, а также диапозон может быть только положительный, включая нолью, также диапазон может быть в десятых, сотых, тысячных и т. д. долях. Количество цифр после десятичной запятой может быть целое число между 0 и 20 включительно');
}
getRandomGeographicalCoordinates(1.1, 1.2, 3);

const AUTHOR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const title = [
  'Заголовок 1',
  'Заголовок 2',
  'Заголовок 3',
  'Заголовок 4',
  'Заголовок 5',
  'Заголовок 6',
  'Заголовок 7',
  'Заголовок 8',
  'Заголовок 9',
  'Заголовок 10',
];

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const checkin = [
  '12:00',
  '13:00',
  '14:00',
];
const checkout = [
  '12:00',
  '13:00',
  '14:00',
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const description = [
  'Опсиание 1',
  'Опсиание 2',
  'Опсиание 3',
  'Опсиание 4',
  'Опсиание 5',
  'Опсиание 6',
  'Опсиание 7',
  'Опсиание 8',
  'Опсиание 9',
];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

  let getArrayfeatures = function(features) {
    const array = [];
      while (array.length < getRandomNumber(1, features.length)) {
        const el = features[getRandomNumber(0, features.length - 1)];
        if(!array.includes(el)) {
          array.push(el);
        }
    }
    return array;
  };

  let getArrayphotos = function(photos) {
    const array = [];
      while (array.length < getRandomNumber(1, photos.length)) {
        const el = photos[getRandomNumber(0, photos.length - 1)];
        if(!array.includes(el)) {
          array.push(el);
        }
    }
    return array;
  };
  const createWizard = () => {
    return {
      avatar: AUTHOR[getRandomNumber(0, AUTHOR.length - 1 )],
      offer: {
        title: title[getRandomNumber(0, title.length - 1 )],
        address: '{{location.lat}}, {{location.lng}}',
        price: getRandomNumber(0, Infinity),
        type: type[getRandomNumber(0, type.length - 1 )],
        guests: getRandomNumber(0, Infinity),
        checkin: checkin[getRandomNumber(0, checkin.length - 1 )],
        checkout: checkout[getRandomNumber(0, checkout.length - 1 )],
        features: getArrayfeatures(features),
        description: description[getRandomNumber(0, description.length - 1 )],
        photos: getArrayphotos(photos)
      }
    }
  };
  console.log(
    createWizard()
  );
