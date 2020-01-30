'use strict';

var quantityObjects = 8;
var PIN_WIDTH = 50;
var MAP_WIDTH = 1200;
var AD_TITLE = ['Квартира 1', 'Квартира 2', 'Квартира 3', 'Квартира 4', 'Квартира 5', 'Квартира 6', 'Квартира 7', 'Квартира 8'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createListAds = function () {
  var listAds = [];
  for (var i = 0; i < quantityObjects; i++) {
    var location = {
      x: getRandomInt(0, MAP_WIDTH),
      y: getRandomInt(130, 630)
    };

    listAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
      },

      offer: {
        title: AD_TITLE[i], // строка, заголовок предложения
        address: location.x + ', ' + location.y, // строка, адрес предложения
        price: '', // число, стоимость
        type: '', // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: '', // число, количество комнат
        guests: '', // число, количество гостей, которое можно разместить
        checkin: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        checkout: '', // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: '', // строка с описанием
        photos: [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ]
      },

      location: {
        x: location.x, // случайное число, координата x метки на карте.
        // Значение ограничено размерами блока, в котором перетаскивается метка = 1200
        y: location.y // случайное число, координата y метки на карте от 130 до 630
      }
    };
  }
  return listAds;
};

var ads = createListAds();

var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var userPinImg = userPinTemplate.querySelector('img');

for (var i = 0; i < quantityObjects; i++) {
  userPinTemplate.style.left = ads[i].location.x - PIN_WIDTH / 2 + 'px';
  userPinTemplate.style.top = ads[i].location.y + 'px';

  userPinImg.src = ads[i].author.avatar;
  userPinImg.alt = ads[i].offer.title;

  var userPinList = document.querySelector('.map__pins');
  var userPinElement = userPinTemplate.cloneNode(true);
  userPinList.appendChild(userPinElement);
}
