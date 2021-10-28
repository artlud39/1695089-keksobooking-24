import {getPageDiactivate, getPageActivate,setAddresValue} from './form.js';
import {getAnnouncement} from './similar-list.js';
import {createAnnouncements} from './data.js';

const map = L.map('map-canvas')
  .on('load', () => {
    getPageActivate();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
const mainPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const TOKYO = {
  lat: 35.6895,
  lng: 139.692,
};

const mainMarker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

mainMarker.addTo(map);


const getAdress = function (address) {
  return `${address.lat.toFixed(5)  },${  address.lng.toFixed(5)}`;
};

mainMarker.on('moveend', (evt) => {
  setAddresValue(getAdress(evt.target.getLatLng()));
});

const resetAddress = () => {
  setAddresValue(getAdress(mainMarker.getLatLng()));
};
resetAddress();

const announcements = createAnnouncements();
announcements.forEach((announcement) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    {
      lat: announcement.location.lat,
      lng: announcement.location.lng,
    },
    {
      icon: icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(getAnnouncement(announcement));
});
