'use strict';

(function () {
  var MAP_WIDTH = 1200;
  var LOCATION_MINY = 130;
  var LOCATION_MAXY = 630;

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
   * @name createListAds
   * @description Функция для создания моков
   * @param {number} count Количетво генерируемых моков
   * @return {Array} Возвращает массив объектов(моков)
   */
  var createListAds = function (count) {
    var listAds = [];

    for (var i = 0; i < count; i++) {
      var locationX = window.utils.getRandomInt(0, MAP_WIDTH);
      var locationY = window.utils.getRandomInt(LOCATION_MINY, LOCATION_MAXY);
      listAds[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: AD_TITLE[i],
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomInt(AdPrice.MIN, AdPrice.MAX),
          type: window.utils.getRandomElementArr(Object.keys(OffersType)),
          rooms: window.utils.getRandomInt(MIN_AMOUNT, MAX_AMOUNT),
          guests: window.utils.getRandomInt(MIN_AMOUNT, MAX_AMOUNT),
          checkin: window.utils.getRandomElementArr(AD_TIME),
          checkout: window.utils.getRandomElementArr(AD_TIME),
          features: window.utils.getRandomElementsArr(AD_FEATURES),
          description: window.utils.getRandomElementArr(AD_DESCRIPTION),
          photos: window.utils.getRandomElementsArr(AD_PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
    return listAds;
  };

  window.mock = {
    OffersType: OffersType,
    createListAds: createListAds
  };
})();
