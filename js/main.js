import {getRandomNumber, getRandomGeographicalCoordinates} from './random-number.js';

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

const getArray = function(array) {
  return array.slice(0, getRandomNumber(0, array.length));
};

const LOCATION_LAT = getRandomGeographicalCoordinates(35.65000, 35.70000, 5);
const LOCATION_LNG = getRandomGeographicalCoordinates(139.70000, 139.80000, 5);

function getNormalizeNumber(value) {
  return value.toString().length > 1 ? value.toString() : `0${value}`;
}


const createAnnouncement = () => ({
  author: {
    avatar: `img/avatars/user${  getNormalizeNumber(getRandomNumber(0, 100))  }.png`,
  },
  location: {
    lat: LOCATION_LAT,
    lng: LOCATION_LNG,
  },
  offer: {
    title: title[getRandomNumber(0, title.length - 1 )],
    address: `${LOCATION_LAT }, ${  LOCATION_LNG}`,
    price: getRandomNumber(5000, 100000),
    type: type[getRandomNumber(0, type.length - 1 )],
    guests: getRandomNumber(1, 15),
    checkin: checkin[getRandomNumber(0, checkin.length - 1 )],
    checkout: checkout[getRandomNumber(0, checkout.length - 1 )],
    features: getArray(features),
    description: description[getRandomNumber(0, description.length - 1 )],
    photos: getArray(photos),
  },
});

const similarAnnouncement = Array.from({length: 10}, createAnnouncement);

console.log(similarAnnouncement);

