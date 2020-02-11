'use strict';

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
var INDEX_DESIRED_CARD = 0;
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
var userPinImg = userPinTemplate.querySelector('img');
var fragmentPin = document.createDocumentFragment();

var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var userCardTitle = userCardTemplate.querySelector('.popup__title');
var userCardPrice = userCardTemplate.querySelector('.popup__text--price');
var userCardType = userCardTemplate.querySelector('.popup__type');
var userCardCapacity = userCardTemplate.querySelector('.popup__text--capacity');
var userCardTime = userCardTemplate.querySelector('.popup__text--time');
var userCardFeatures = userCardTemplate.querySelector('.popup__features');
var userCardDescription = userCardTemplate.querySelector('.popup__description');
var userCardPhotos = userCardTemplate.querySelector('.popup__photos');
var userCardAvatar = userCardTemplate.querySelector('.popup__avatar');

var userCardFeature = userCardFeatures.children;
var userCardPhoto = userCardPhotos.children;

var userPinList = document.querySelector('.map__pins');
// var mapFiltersContainer = document.querySelector('.map__filters-container');

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

var getCoordinatePinMain = function (state) {
  var active = state || false;

  var currentMapPinMain = mainPin.getBoundingClientRect();

  var currentMapPinMainX;
  var currentMapPinMainY;
  var result;

  if (active) {
    var currentMapPinMainHeight = PIN_MAIN_HEIGHT + PIN_MAIN_POINTER_HEIGHT;

    currentMapPinMainX = currentMapPinMain.left + (PIN_MAIN_WIDTH / 2);
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + currentMapPinMainHeight;
  } else {
    currentMapPinMainX = currentMapPinMain.left + (PIN_MAIN_WIDTH / 2);
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + (PIN_MAIN_HEIGHT / 2);
  }

  result = Math.floor(currentMapPinMainX) + ', ' + Math.floor(currentMapPinMainY);

  return result;
};

var switchDisabled = function (arr, bolean) {
  for (var i = 0; i < arr.length; i++) {
    var itemSwitch = arr[i];
    itemSwitch.disabled = bolean;
  }
};

var createListAds = function () {
  var listAds = [];
  for (var j = 0; j < QUANTITY_OBJECTS; j++) {

    listAds[j] = {
      author: {
        avatar: getRandomElementArr(AD_AVATARS),
      },

      offer: {
        title: AD_TITLE[j], // строка, заголовок предложения
        address: location.x + ', ' + location.y, // строка, адрес предложения
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
        x: getRandomInt(0, MAP_WIDTH), // случайное число, координата x метки на карте.
        // Значение ограничено размерами блока, в котором перетаскивается метка = 1200
        y: getRandomInt(LOCATION_MINY, LOCATION_MAXY) // случайное число, координата y метки на карте от 130 до 630
      }
    };
  }
  return listAds;
};

var getOfferTranslationByType = function (offerType) {
  var type = '';
  switch (offerType) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
    default:
      type = undefined;
  }
  return type;
};

var createCardPopup = function (obj) {
  var avatar = obj.author.avatar;
  var title = obj.offer.title;
  var price = obj.offer.price;
  var type = getOfferTranslationByType(obj.offer.type);
  var rooms = obj.offer.rooms;
  var guests = obj.offer.guests;
  var checkin = obj.offer.checkin;
  var checkout = obj.offer.checkout;
  var features = obj.offer.features;
  var description = obj.offer.description;
  var photos = obj.offer.photos;

  for (var n = 0; n < features.length; n++) {
    var сardFeature = document.createElement('li');
    var classFeature = '';
    сardFeature.classList.add('popup__feature');

    switch (features[n]) {
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

  for (var p = 0; p < photos.length; p++) {
    var cardImage = document.createElement('img');
    cardImage.classList.add('popup__photo');
    cardImage.width = '45';
    cardImage.height = '40';
    cardImage.alt = 'Фотография жилья';
    cardImage.src = photos[p];
    userCardPhotos.appendChild(cardImage);
  }

  userCardTitle.innerHTML = title;
  userCardPrice.innerHTML = price + '₽/ночь';
  userCardType.innerHTML = type;
  userCardCapacity.innerHTML = rooms + ' комнаты для ' + guests + ' гостей';
  userCardTime.innerHTML = 'заезд после ' + checkin + ', выезд до ' + checkout;
  userCardDescription.innerHTML = description;
  userCardAvatar.src = avatar;

  var userCardElement = userCardTemplate.cloneNode(true);
  fragmentCard.appendChild(userCardElement);
};

var ads = createListAds();

for (var k = userCardFeature.length - 1; k >= 0; k--) {
  var childFeature = userCardFeature[k];
  childFeature.parentElement.removeChild(childFeature);
}

for (var l = userCardPhoto.length - 1; l >= 0; l--) {
  var childPhoto = userCardPhoto[l];
  childPhoto.parentElement.removeChild(childPhoto);
}

var fragmentCard = document.createDocumentFragment();

for (var m = 0; m < ads.length; m++) {
  userPinTemplate.style.left = ads[m].location.x - PIN_WIDTH / 2 + 'px';
  userPinTemplate.style.top = ads[m].location.y - PIN_HEIGHT + 'px';

  userPinImg.src = ads[m].author.avatar;
  userPinImg.alt = ads[m].offer.title;
  var userPinElement = userPinTemplate.cloneNode(true);
  fragmentPin.appendChild(userPinElement);
}
createCardPopup(ads[INDEX_DESIRED_CARD]);


var activateInterface = function () {
  switchDisabled(fieldsetForm, false);
  switchDisabled(mapFilters.children, false);

  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  addrInput.value = getCoordinatePinMain(true);
  userPinList.appendChild(fragmentPin);

  // map.insertBefore(fragmentCard, mapFiltersContainer);
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

mainPin.addEventListener('mousedown', onPinLeftClick);

mainPin.addEventListener('keydown', onPinEnterPress);

addrInput.value = getCoordinatePinMain();
