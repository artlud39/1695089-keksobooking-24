import {getData} from './api.js';
import {showErrorMessage} from './user-modal.js';
import {getSimilarAnnouncement} from './similar-list.js';
import {getPageActivate,setAddresValue} from './form.js';
import {getFilteredAds} from './filter.js';
import {debounce} from './util.js';

const SIMILAR_ADD_MARKER = 10;
const MAP_ZOOM = 10;
const TOKYO = {
  lat: 35.6895,
  lng: 139.692,
};

const filterForm = document.querySelector('.map__filters');
const message = 'При загрузке данных с сервера произошла ошибка';

const map = L.map('map-canvas')
  .on('load', () => {
    getPageActivate();
  })
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, MAP_ZOOM);

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

const resetMap = () => {
  mainMarker.setLatLng({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  });
  map.setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, MAP_ZOOM);
};

const getAdress =  (address) => `${address.lat.toFixed(5)  },${  address.lng.toFixed(5)}`;

mainMarker.on('moveend', (evt) => {
  setAddresValue(getAdress(evt.target.getLatLng()));
});

const resetAddress = () => {
  setAddresValue(getAdress(mainMarker.getLatLng()));
};

resetAddress();

const markerGroup = L.layerGroup().addTo(map);

const renderAdMarkers =  (announcements) => {
  announcements
    .slice(0,SIMILAR_ADD_MARKER)
    .forEach((announcement) => {
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

const removeAdMarkers = () => {
  markerGroup.clearLayers();
};

const onFilterChange = debounce((announcement) => {
  const newAds = getFilteredAds(announcement);
  removeAdMarkers();
  renderAdMarkers(newAds);
});

const onError = () => {
  showErrorMessage(message);
};

const renderAnnouncement = () => {
  getData((data) => {
    const announcements = data.slice();
    renderAdMarkers(announcements);
    filterForm.addEventListener('change', () => {
      onFilterChange(announcements);
    });
  },onError);
};

renderAnnouncement();

export {getAdress,renderAnnouncement,resetAddress,resetMap,removeAdMarkers,renderAdMarkers};

