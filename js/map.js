import {getPageActivate,setAddresValue} from './form.js';
import {getSimilarAnnouncement} from './similar-list.js';
import {getData} from './api.js';

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

const markerGroup = L.layerGroup().addTo(map);

const renderAnnouncement =  (announcements) => {
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
      .addTo(markerGroup)
      .bindPopup(getSimilarAnnouncement(announcement));
  });
};

const resetMap = () => {
  mainMarker.setLatLng({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  });
  map.setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, 10);
};

const removeAdMarkers = () => {
  markerGroup.clearLayers();
};

const SIMILAR_ANN_COUNT = 20;

const renderAdMarkers = () => {
  getData((data) => {
    renderAnnouncement(data.slice(0, SIMILAR_ANN_COUNT));
  });
};
renderAdMarkers();

export {getAdress,renderAnnouncement,resetAddress,resetMap,removeAdMarkers,renderAdMarkers};

