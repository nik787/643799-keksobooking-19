'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElementArr = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

var getRAndomElementsArr = function (arr) {
  var minElements = 1;
  var newArr = [];
  for (var i = 0; i < getRandomInt(minElements, arr.length); i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

var switchDisabled = function (arr, bolean) {
  for (var i = 0; i < arr.length; i++) {
    var itemSwitch = arr[i];
    itemSwitch.disabled = bolean;
  }
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

var ENTER_KEY = 'Enter';
var KEY_LEFT_MOUSE_BUTTON = 0;
var MAP_WIDTH = 1200;
var LOCATION_MINY = 130;
var LOCATION_MAXY = 630;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 65;
var PIN_MAIN_POINTER_HEIGHT = 20;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var QUANTITY_OBJECTS = 8;
var MIN_AMOUNT = 1;
var MAX_AMOUNT = 5;

var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var AD_TITLE = ['Уютное гнездышко для молодоженов 1', 'Уютное гнездышко для молодоженов 2', 'Уютное гнездышко для молодоженов 3', 'Уютное гнездышко для молодоженов 4', 'Уютное гнездышко для молодоженов 5', 'Уютное гнездышко для молодоженов 6', 'Уютное гнездышко для молодоженов 7', 'Уютное гнездышко для молодоженов 8'];
var AD_PRICE = 5200;
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECKIN = ['12:00', '13:00', '14:00'];
var AD_CHECKOUT = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var offersType = {
  FLAT: 'flat',
  BUNGALO: 'bungalo',
  HOUSE: 'house',
  PALACE: 'palace'
};

var featuresTypes = {
  WIFI: 'wifi',
  DISHWASHER: 'dishwasher',
  PARKING: 'parking',
  WASHER: 'washer',
  ELEVATOR: 'elevator',
  CONDITIONER: 'conditioner'
};

var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsetForm = form.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');
var addrInput = form.querySelector('#address');

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var userPinList = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');


var getCoordinatePinMain = function (state) {
  var isActivePin = state || false;

  var currentMapPinMain = mainPin.getBoundingClientRect();

  var currentMapPinMainX;
  var currentMapPinMainY;
  var result;

  if (isActivePin) {
    var currentMapPinMainHeight = PIN_MAIN_HEIGHT + PIN_MAIN_POINTER_HEIGHT;
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + currentMapPinMainHeight;
  } else {
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + (PIN_MAIN_HEIGHT / 2);
  }
  currentMapPinMainX = currentMapPinMain.left + (PIN_MAIN_WIDTH / 2);
  result = Math.floor(currentMapPinMainX) + ', ' + Math.floor(currentMapPinMainY);

  return result;
};

var createListAds = function () {
  var listAds = [];

  for (var i = 0; i < QUANTITY_OBJECTS; i++) {
    var locationX = getRandomInt(0, MAP_WIDTH);
    var locationY = getRandomInt(LOCATION_MINY, LOCATION_MAXY);
    listAds[i] = {
      author: {
        avatar: getRandomElementArr(AD_AVATARS),
      },

      offer: {
        title: AD_TITLE[i], // строка, заголовок предложения
        address: locationX + ', ' + locationY, // строка, адрес предложения
        price: AD_PRICE, // число, стоимость
        type: getRandomElementArr(AD_TYPE), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: getRandomInt(MIN_AMOUNT, MAX_AMOUNT), // число, количество комнат
        guests: getRandomInt(MIN_AMOUNT, MAX_AMOUNT), // число, количество гостей, которое можно разместить
        checkin: getRandomElementArr(AD_CHECKIN), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        checkout: getRandomElementArr(AD_CHECKOUT), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: getRAndomElementsArr(AD_FEATURES),
        description: getRandomElementArr(AD_DESCRIPTION), // строка с описанием
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

var createPinElement = function (obj) {
  var userPinElement = userPinTemplate.cloneNode(true);
  userPinElement.querySelector('img').src = obj.author.avatar;
  userPinElement.querySelector('img').alt = obj.offer.title;

  userPinElement.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  userPinElement.style.top = obj.location.y - PIN_HEIGHT + 'px';

  userPinElement.addEventListener('click', function () {
    openCardPopup(obj);
  });
  return userPinElement;
};

var createPinElements = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPinElement(ads[i]));
  }
  userPinList.appendChild(fragment);
};

var ads = createListAds();

var getOfferTranslationByType = function (offerType) {
  var type = '';
  switch (offerType) {
    case offersType.FLAT:
      type = 'Квартира';
      break;
    case offersType.BUNGALO:
      type = 'Бунгало';
      break;
    case offersType.HOUSE:
      type = 'Дом';
      break;
    case offersType.PALACE:
      type = 'Дворец';
      break;
    default:
      type = undefined;
  }
  return type;
};

var getOfferTranslationByFeatures = function (features) {
  for (var i = 0; i < features.length; i++) {
    var сardFeature = document.createElement('li');
    var classFeature = '';
    сardFeature.classList.add('popup__feature');

    switch (features[i]) {
      case featuresTypes.WIFI:
        classFeature = 'popup__feature--wifi';
        break;
      case featuresTypes.DISHWASHER:
        classFeature = 'popup__feature--dishwasher';
        break;
      case featuresTypes.PARKING:
        classFeature = 'popup__feature--parking';
        break;
      case featuresTypes.WASHER:
        classFeature = 'popup__feature--washer';
        break;
      case featuresTypes.ELEVATOR:
        classFeature = 'popup__feature--elevator';
        break;
      case featuresTypes.CONDITIONER:
        classFeature = 'popup__feature--conditioner';
        break;
      default:
        classFeature = '';
    }
    сardFeature.classList.add(classFeature);
    userCardFeatures.appendChild(сardFeature);
  }
};

var activateInterface = function () {
  switchDisabled(fieldsetForm, false);
  switchDisabled(mapFilters.children, false);

  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  addrInput.value = getCoordinatePinMain(true);
  createPinElements(ads);

};

var formPriceElement = form.querySelector('[name="price"]');
var formApartmentTypeElement = form.querySelector('[name="type"]');
var formTimeinElement = form.querySelector('[name="timein"]');
var formTimeoutElement = form.querySelector('[name="timeout"]');
var formTRoomsElement = form.querySelector('[name="rooms"]');
var formGuestsElement = form.querySelector('[name="capacity"]');

function onApartmentTypeChange() {
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
}

function adjustmentTimeField(timeField, dependTimeField) {
  dependTimeField.value = timeField.value;
  dependTimeField.focus();
}

formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');

function onGuestsAndRoomsChange() {
  formGuestsElement.setCustomValidity('');

  if (formTRoomsElement.value < formGuestsElement.value || formTRoomsElement.value === '100' || formGuestsElement.value === '0') {
    formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
  }

  if (formTRoomsElement.value === '100' && formGuestsElement.value === '0') {
    formGuestsElement.setCustomValidity('');
  }
}

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

mainPin.addEventListener('mousedown', onPinLeftClick);

mainPin.addEventListener('keydown', onPinEnterPress);

addrInput.value = getCoordinatePinMain();

// Попап карточки
var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var userCardFeatures = userCardTemplate.querySelector('.popup__features');

var userCardFeature = userCardFeatures.children;

var createCardPopup = function (objAds) {
  var userCardElement = userCardTemplate.cloneNode(true);

  var avatar = objAds.author.avatar;
  var title = objAds.offer.title;
  var price = objAds.offer.price;
  var type = getOfferTranslationByType(objAds.offer.type);
  var rooms = objAds.offer.rooms;
  var guests = objAds.offer.guests;
  var checkin = objAds.offer.checkin;
  var checkout = objAds.offer.checkout;
  var features = objAds.offer.features;
  var description = objAds.offer.description;
  var photos = objAds.offer.photos;

  getOfferTranslationByFeatures(features);

  userCardElement.querySelector('.popup__title').innerHTML = title;
  userCardElement.querySelector('.popup__text--price').innerHTML = price + '₽/ночь';
  userCardElement.querySelector('.popup__type').innerHTML = type;
  userCardElement.querySelector('.popup__text--capacity').innerHTML = rooms + ' комнаты для ' + guests + ' гостей';
  userCardElement.querySelector('.popup__text--time').innerHTML = 'заезд после ' + checkin + ', выезд до ' + checkout;
  userCardElement.querySelector('.popup__description').innerHTML = description;
  userCardElement.querySelector('.popup__avatar').src = avatar;
  return userCardElement;
};

var createuserListCard = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createCardPopup(ads[i]));
  }
  map.insertBefore(fragment, mapFiltersContainer);
};

var openCardPopup = function (adsObj) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCardPopup(adsObj));
  map.insertBefore(fragment, mapFiltersContainer);

}
