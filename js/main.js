'use strict';

var ENTER_KEY = 'Enter';
var KEY_LEFT_MOUSE_BUTTON = 0;
var MAP_WIDTH = 1200;
var LOCATION_MINY = 130;
var LOCATION_MAXY = 630;

var MainPin = {
  WIDTH: 65,
  HEIGHT: 65,
  POINTER_HEIGHT: 20
};

var Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

var QUANTITY_OBJECTS = 8;
var MIN_AMOUNT = 1;
var MAX_AMOUNT = 5;

var AD_TITLE = [
  'Уютное гнездышко для молодоженов',
  'Уютное гнездышко для тюленей',
  'Уютное гнездышко для котов',
  'Уютное гнездышко для дикарей',
  'Уютное гнездышко для кротов',
  'Уютное гнездышко для айтишников',
  'Уютное гнездышко для студентов',
  'Уютное гнездышко для академиков'
];
var AdPrice = {
  MIN: 0,
  MAX: 1000000
};

// var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_TIME = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTION = [
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'
];
var AD_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OffersType = {
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};

/**
 * Функция создает рандомное число из диапозона min, max
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number} Рандомное число
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Функция возвращяет рандомный элемент массива от 0 до длинны массива
 * @param {Array} arr Массив данных
 * @return {Array} Рандомный элемент массива
 *
 */
var getRandomElementArr = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

/**
 * Функция возвращяет рандомный массив элементов от 1 до длинны массива
 * @param {Array} arr Массив данных
 * @return {Array} Новый рандомный массив
 */
var getRAndomElementsArr = function (arr) {
  var minElements = 1;
  var newArr = [];
  for (var i = 0; i < getRandomInt(minElements, arr.length); i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

/**
 * Функция устанавливает disabled true/false на элеметы массива
 * @param {Array} htmlElements Массив html элеметов
 * @param {boolean} switching Включает/Отключает disabled
 * @description true - disabled включен, false - disabled отключен
 */
var switchDisabled = function (htmlElements, switching) {
  // htmlElements.forEach(function (htmlElement) {
  //   htmlElement.disabled = switching;
  // }); Не работает, узнать почему
  for (var i = 0; i < htmlElements.length; i++) {
    htmlElements[i].disabled = switching;
  }
};

var getCoordinatePinMain = function (state) {
  var isActivePin = state || false;

  var currentMapPinMain = mainPin.getBoundingClientRect();

  var currentMapPinMainX;
  var currentMapPinMainY;
  var result;

  if (isActivePin) {
    var currentMapPinMainHeight = MainPin.HEIGHT + MainPin.POINTER_HEIGHT;
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + currentMapPinMainHeight;
  } else {
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + (MainPin.HEIGHT / 2);
  }
  currentMapPinMainX = currentMapPinMain.left + (MainPin.WIDTH / 2);
  result = Math.floor(currentMapPinMainX) + ', ' + Math.floor(currentMapPinMainY);

  return result;
};

var onPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateInterface();
  }
};

var onPinLeftClick = function (evt) {
  if (evt.button === KEY_LEFT_MOUSE_BUTTON) {
    activateInterface();
  }
};

var createListAds = function (count) {
  var listAds = [];

  for (var i = 0; i < count; i++) {
    var locationX = getRandomInt(0, MAP_WIDTH);
    var locationY = getRandomInt(LOCATION_MINY, LOCATION_MAXY);
    listAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: AD_TITLE[i],
        address: locationX + ', ' + locationY,
        price: getRandomInt(AdPrice.MIN, AdPrice.MAX),
        type: getRandomElementArr(Object.keys(OffersType)),
        rooms: getRandomInt(MIN_AMOUNT, MAX_AMOUNT),
        guests: getRandomInt(MIN_AMOUNT, MAX_AMOUNT),
        checkin: getRandomElementArr(AD_TIME),
        checkout: getRandomElementArr(AD_TIME),
        features: getRAndomElementsArr(AD_FEATURES),
        description: getRandomElementArr(AD_DESCRIPTION),
        photos: getRAndomElementsArr(AD_PHOTOS)
      },

      location: {
        x: locationX, // случайное число, координата x метки на карте.
        // Значение ограничено размерами блока, в котором перетаскивается метка = 1200
        y: locationY // случайное число, координата y метки на карте от 130 до 630
      }
    };
  }
  return listAds;
};

var ads = createListAds(QUANTITY_OBJECTS);

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var userPinList = document.querySelector('.map__pins');
var createPinElement = function (pinData) {
  var userPinElement = userPinTemplate.cloneNode(true);
  userPinElement.querySelector('img').src = pinData.author.avatar;
  userPinElement.querySelector('img').alt = pinData.offer.title;

  userPinElement.style.left = pinData.location.x - Pin.WIDTH / 2 + 'px';
  userPinElement.style.top = pinData.location.y - Pin.HEIGHT + 'px';

  userPinElement.addEventListener('click', function () {
    createCardPopup(pinData);
    userPinElement.classList.add('map__pin--active');
  });
  return userPinElement;
};
// Переписать цикл на forEach
var createPinElements = function (dataAds) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataAds.length; i++) {
    fragment.appendChild(createPinElement(dataAds[i]));
  }
  userPinList.appendChild(fragment);
};

var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');

var fieldsetForm = form.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
switchDisabled(fieldsetForm, true);
switchDisabled(mapFilters.children, true);

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', onPinLeftClick);
mainPin.addEventListener('keydown', onPinEnterPress);

var addrInput = form.querySelector('#address');
addrInput.value = getCoordinatePinMain();

var mapFiltersContainer = document.querySelector('.map__filters-container');

var formPriceElement = form.querySelector('[name="price"]');
var formApartmentTypeElement = form.querySelector('[name="type"]');
var formTimeinElement = form.querySelector('[name="timein"]');
var formTimeoutElement = form.querySelector('[name="timeout"]');
var formTRoomsElement = form.querySelector('[name="rooms"]');
var formGuestsElement = form.querySelector('[name="capacity"]');

var onApartmentTypeChange = function () {
  var minAppartmentPrice;
  switch (formApartmentTypeElement.value) {
    case 'bungalo':
      minAppartmentPrice = 0;
      break;
    case 'flat':
      minAppartmentPrice = 1000;
      break;
    case 'house':
      minAppartmentPrice = 5000;
      break;
    case 'palace':
      minAppartmentPrice = 10000;
  }

  formPriceElement.setAttribute('min', minAppartmentPrice);
  formPriceElement.setAttribute('placeholder', minAppartmentPrice);
};

var adjustmentTimeField = function (timeField, dependTimeField) {
  dependTimeField.value = timeField.value;
  dependTimeField.focus();
};

var onGuestsAndRoomsChange = function () {
  formGuestsElement.setCustomValidity('');

  if (formTRoomsElement.value < formGuestsElement.value || formTRoomsElement.value === '100' || formGuestsElement.value === '0') {
    formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
  }

  if (formTRoomsElement.value === '100' && formGuestsElement.value === '0') {
    formGuestsElement.setCustomValidity('');
  }
};

formApartmentTypeElement.addEventListener('change', onApartmentTypeChange);
formTimeinElement.addEventListener('change', function () {
  adjustmentTimeField(formTimeinElement, formTimeoutElement);
});
formTimeoutElement.addEventListener('change', function () {
  adjustmentTimeField(formTimeoutElement, formTimeinElement);
});
formGuestsElement.addEventListener('change', onGuestsAndRoomsChange);
formTRoomsElement.addEventListener('change', onGuestsAndRoomsChange);

form.addEventListener('reset', function () {
  setTimeout(function () {
    getCoordinatePinMain(false);
  }, 50);
});


// Попап карточки
var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createCardPopup = function (objAds) {
  var userCardElement = userCardTemplate.cloneNode(true);

  userCardElement.querySelector('.popup__title').textContent = objAds.offer.title;
  userCardElement.querySelector('.popup__text--price').textContent = objAds.offer.price + '₽/ночь';
  userCardElement.querySelector('.popup__type').textContent = OffersType[objAds.offer.type];
  userCardElement.querySelector('.popup__text--capacity').textContent = objAds.offer.rooms + ' комнаты для ' + objAds.offer.guests + ' гостей';
  userCardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + objAds.offer.checkin + ', выезд до ' + objAds.offer.checkout;
  userCardElement.querySelector('.popup__description').textContent = objAds.offer.description;
  userCardElement.querySelector('.popup__avatar').src = objAds.author.avatar;

  var features = objAds.offer.features;
  var photos = objAds.offer.photos;

  if (features) {
    var featuresList = userCardElement.querySelector('.popup__features');
    var featureFromHTML = featuresList.querySelector('.popup__feature');
    featuresList.innerHTML = '';
    for (var featureIndex = 0; featureIndex < features.length; featureIndex++) {
      var feature = featureFromHTML.cloneNode(true);
      feature.classList.remove('popup__feature--wifi');
      feature.classList.add('popup__feature--' + features[featureIndex]);
      featuresList.appendChild(feature);
    }
  } else {
    featuresList.classList.add('hidden');
  }

  if (photos.length > 0) {
    var photoList = userCardElement.querySelector('.popup__photos');
    var photoFromHTML = photoList.querySelector('.popup__photo');
    photoList.innerHTML = '';
    for (var photoIndex = 0; photoIndex < photos.length; photoIndex++) {
      var photo = photoFromHTML.cloneNode(true);
      photo.src = photos[photoIndex];
      photoList.appendChild(photo);
    }
  } else {
    photoList.classList.add('hidden');
  }

  map.insertBefore(userCardElement, mapFiltersContainer);
};

var activateInterface = function () {
  switchDisabled(fieldsetForm, false);
  switchDisabled(mapFilters.children, false);

  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  addrInput.value = getCoordinatePinMain(true);
  createPinElements(ads);
  formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
  mainPin.removeEventListener('keydown', onPinEnterPress);
  mainPin.removeEventListener('click', onPinLeftClick);
};
