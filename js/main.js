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
 * @name getRandomInt
 * @description Функция создает рандомное число из диапозона min, max
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number} Рандомное число
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @name getRandomElementArr
 * @description Функция возвращяет рандомный элемент массива от 0 до длинны массива
 * @param {Array} arr Массив данных
 * @return {Array} Рандомный элемент массива
 *
 */
var getRandomElementArr = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

/**
 * @name getRandomElementsArr
 * @description Функция возвращяет рандомный массив элементов от 1 до длинны массива
 * @param {Array} arr Массив данных
 * @return {Array} Новый рандомный массив
 */
var getRandomElementsArr = function (arr) {
  var minElements = 1;
  var oldArr = arr;
  var newArr = [];
  for (var i = 0; i < getRandomInt(minElements, arr.length); i++) {
    newArr.push(oldArr[i]);
    oldArr.splice(i, 1);
  }
  return newArr;
};

/**
 * @name switchDisabled
 * @description Функция устанавливает disabled true/false на html элеметы
 * @param {Array} htmlElements Массив html элеметов
 * @param {boolean} switching Включает/Отключает disabled
 * @description true - disabled включен, false - disabled отключен
 */
var switchDisabled = function (htmlElements, switching) {
  // htmlElements.forEach(function (htmlElement) {
  //   htmlElement.disabled = switching;
  // }); НЕ РАБОТАЕТ!!!
  for (var i = 0; i < htmlElements.length; i++) {
    htmlElements[i].disabled = switching;
  }
};

/**
 * @name getCoordinatePinMain
 * @description Функция находит координаты пина и проверяет активирован ли интерфейс, в зависимости от этого изменяет значение
 * @return {String} Возвращает строку с координатами главного пина 'x, y'
 */
var getCoordinatePinMain = function () {
  var currentMapPinMainX = Math.round(window.mainPin.offsetLeft + (MainPin.WIDTH / 2));
  var currentMapPinMainYDisabled = Math.round(window.mainPin.offsetTop + (MainPin.HEIGHT / 2));
  var currentMapPinMainY = Math.round(window.mainPin.offsetTop + (MainPin.HEIGHT + MainPin.POINTER_HEIGHT));
  var result;
  if (activateInterface) {
    result = currentMapPinMainX + ', ' + currentMapPinMainY;
  } else {
    result = currentMapPinMainX + ', ' + currentMapPinMainYDisabled;
  }
  return result;
};

var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateInterface();
  }
};

var onMainPinLeftClick = function (evt) {
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
        features: getRandomElementsArr(AD_FEATURES),
        description: getRandomElementArr(AD_DESCRIPTION),
        photos: getRandomElementsArr(AD_PHOTOS)
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


var createPinElement = function (dataAds) {
  var userPinElement = userPinTemplate.cloneNode(true);

  userPinElement.querySelector('img').src = dataAds.author.avatar;
  userPinElement.querySelector('img').alt = dataAds.offer.title;

  userPinElement.style.left = dataAds.location.x - Pin.WIDTH / 2 + 'px';
  userPinElement.style.top = dataAds.location.y - Pin.HEIGHT + 'px';

  userPinElement.addEventListener('click', function () {
    createCardPopup(dataAds);
    userPinElement.classList.add('map__pin--active');
  });
  return userPinElement;
};

var createPinElements = function (dataAds) {
  var fragment = document.createDocumentFragment();
  dataAds.forEach(function (element) {
    fragment.appendChild(createPinElement(element));
  });
  userPinList.appendChild(fragment);
};

var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', onMainPinLeftClick);
mainPin.addEventListener('keydown', onMainPinEnterPress);

var fieldsetForm = form.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
switchDisabled(fieldsetForm, true);
switchDisabled(mapFilters.children, true);

var addrInput = form.querySelector('#address');
addrInput.value = getCoordinatePinMain();

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

var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createCardPopup = function (objAds) {
  var userCardElement = userCardTemplate.cloneNode(true);
  var userCardClose = userCardElement.querySelector('.popup__close');
  userCardClose.addEventListener('click', function () {
    userCardElement.remove();
  });

  userCardElement.querySelector('.popup__title').textContent = objAds.offer.title;
  userCardElement.querySelector('.popup__text--price').textContent = objAds.offer.price + '₽/ночь';
  userCardElement.querySelector('.popup__type').textContent = OffersType[objAds.offer.type];
  userCardElement.querySelector('.popup__text--capacity').textContent = objAds.offer.rooms + ' комнаты для ' + objAds.offer.guests + ' гостей';
  userCardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + objAds.offer.checkin + ', выезд до ' + objAds.offer.checkout;
  userCardElement.querySelector('.popup__description').textContent = objAds.offer.description;
  userCardElement.querySelector('.popup__avatar').src = objAds.author.avatar;

  var features = objAds.offer.features;
  var photos = objAds.offer.photos;

  var featuresList = userCardElement.querySelector('.popup__features');
  var featureFromHTML = featuresList.querySelector('.popup__feature');

  if (features) {
    featuresList.innerHTML = '';
    features.forEach(function (element) {
      var feature = featureFromHTML.cloneNode(true);
      feature.classList.remove('popup__feature--wifi');
      feature.classList.add('popup__feature--' + element);
      featuresList.appendChild(feature);
    });
  } else {
    featuresList.remove();
  }
  var photoList = userCardElement.querySelector('.popup__photos');
  var photoFromHTML = photoList.querySelector('.popup__photo');
  photoList.innerHTML = '';
  if (photos.length > 0) {
    photos.forEach(function (element) {
      var photo = photoFromHTML.cloneNode(true);
      photo.src = element;
      photoList.appendChild(photo);
    });
  } else {
    photoList.remove();
  }

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  map.insertBefore(userCardElement, mapFiltersContainer);
};

getCoordinatePinMain(false);
var activateInterface = function () {
  switchDisabled(fieldsetForm, false);
  switchDisabled(mapFilters.children, false);


  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  createPinElements(ads);
  formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
  mainPin.removeEventListener('keydown', onMainPinEnterPress);
  mainPin.removeEventListener('click', onMainPinLeftClick);
  addrInput.value = getCoordinatePinMain();
};
