'use strict';

var map = document.querySelector('.map');
var quantityObjects = 8;
var indexDesiredCard = 0;
var PIN_WIDTH = 50;
var LOCATION_MINY = 130;
var LOCATION_MINX = 630;
var MAP_WIDTH = 1200;
var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var AD_TITLE = ['Уютное гнездышко для молодоженов 1', 'Уютное гнездышко для молодоженов 2', 'Уютное гнездышко для молодоженов 3', 'Уютное гнездышко для молодоженов 4', 'Уютное гнездышко для молодоженов 5', 'Уютное гнездышко для молодоженов 6', 'Уютное гнездышко для молодоженов 7', 'Уютное гнездышко для молодоженов 8'];
var AD_PRICE = 5200;
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECKIN = ['12:00', '13:00', '14:00'];
var AD_CHECKOUT = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

var createListAds = function () {
  var listAds = [];
  for (var i = 0; i < quantityObjects; i++) {
    var location = {
      x: getRandomInt(0, MAP_WIDTH), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка = 1200
      y: getRandomInt(LOCATION_MINY, LOCATION_MINX) // случайное число, координата y метки на карте от 130 до 630
    };

    listAds[i] = {
      author: {
        avatar: getRandomElementArr(AD_AVATARS),
      },

      offer: {
        title: AD_TITLE[i], // строка, заголовок предложения
        address: location.x + ', ' + location.y, // строка, адрес предложения
        price: AD_PRICE, // число, стоимость
        type: getRandomElementArr(AD_TYPE), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: getRandomInt(1, 5), // число, количество комнат
        guests: getRandomInt(1, 5), // число, количество гостей, которое можно разместить
        checkin: getRandomElementArr(AD_CHECKIN), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        checkout: getRandomElementArr(AD_CHECKOUT), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: getRAndomElementsArr(AD_FEATURES),
        description: getRandomElementArr(AD_DESCRIPTION), // строка с описанием
        photos: getRAndomElementsArr(AD_PHOTOS)
      },

      location: {
        x: location.x,
        y: location.y
      }
    };
  }
  return listAds;
};

var ads = createListAds();

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

for (var z = userCardFeature.length - 1; z >= 0; z--) {
  var childFeature = userCardFeature[z];
  childFeature.parentElement.removeChild(childFeature);
}

for (var j = userCardPhoto.length - 1; j >= 0; j--) {
  var childPhoto = userCardPhoto[j];
  childPhoto.parentElement.removeChild(childPhoto);
}


var fragmentCard = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  userPinTemplate.style.left = ads[i].location.x - PIN_WIDTH / 2 + 'px';
  userPinTemplate.style.top = ads[i].location.y + 'px';

  userPinImg.src = ads[i].author.avatar;
  userPinImg.alt = ads[i].offer.title;
  var userPinElement = userPinTemplate.cloneNode(true);
  fragmentPin.appendChild(userPinElement);
}

var userPinList = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');
userPinList.appendChild(fragmentPin);

var createCardPopup = function (index) {
  var avatar = ads[index].author.avatar;
  var title = ads[index].offer.title;
  var price = ads[index].offer.price;
  var type = '';
  switch (ads[index].offer.type) {
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
  var rooms = ads[index].offer.rooms;
  var guests = ads[index].offer.guests;
  var checkin = ads[index].offer.checkin;
  var checkout = ads[index].offer.checkout;
  var features = ads[index].offer.features;
  var description = ads[index].offer.description;
  var photos = ads[index].offer.photos;

  for (var k = 0; k < features.length; k++) {
    var CardFeature = document.createElement('li');
    var classFeature = '';
    CardFeature.classList.add('popup__feature');
    switch (features[k]) {
      case 'wifi':
        classFeature = 'popup__feature--wifi';
        break;
      case 'dishwasher':
        classFeature = 'popup__feature--dishwasher';
        break;
      case 'parking':
        classFeature = 'popup__feature--parking';
        break;
      case 'washer':
        classFeature = 'popup__feature--washer';
        break;
      case 'elevator':
        classFeature = 'popup__feature--elevator';
        break;
      case 'conditioner':
        classFeature = 'popup__feature--conditioner';
        break;
      default:
        childFeature.parentElement.removeChild(childFeature);
    }
    CardFeature.classList.add(classFeature);
    userCardFeatures.appendChild(CardFeature);
  }

  for (var m = 0; m < photos.length; m++) {
    var cardImage = document.createElement('img');
    cardImage.classList.add('popup__photo');
    cardImage.width = '45';
    cardImage.height = '40';
    cardImage.alt = 'Фотография жилья';
    cardImage.src = photos[m];
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

createCardPopup(indexDesiredCard);

map.insertBefore(fragmentCard, mapFilters);

map.classList.remove('map--faded');
