'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');

  var advertType = housingType.value;
  var advertPrice = housingPrice.value;
  var advertRoom = housingRooms.value;

  var advertGuest = housingGuests.value;
  var advertFeatures = Array.from(filterForm.querySelectorAll('input:checked')).map(function (advert) {
    return advert.value;
  });

  var filteredAdverts;

  var onFilterChange = function (evt) {

    filteredAdverts = window.map.defaultAds;
    if (evt.target.id === housingType.id) {
      advertType = evt.target.value;
    } else if (evt.target.id === housingPrice.id) {
      advertPrice = evt.target.value;
    } else if (evt.target.id === housingRooms.id) {
      advertRoom = evt.target.value;
    } else if (evt.target.id === housingGuests.id) {
      advertGuest = evt.target.value;
    } else if (evt.target.id === ('filter-' + evt.target.value)) {
      advertFeatures = Array.from(filterForm.querySelectorAll('input:checked')).map(function (advert) {
        return advert.value;
      });
    }

    filteredAdverts = filteredAdverts.filter(filterType).filter(filterPrice).filter(filterRoom).filter(filterGuest).filter(filterFeatures);


    window.debounce(updatePins());
  };

  /**
   * @name filterType
   * @description Проверяет условие и возвращает true при их совпадении
   * @param {object} advert
   * @return {Boolean} возвращает объявление при выполении условий
   */
  var filterType = function (advert) {
    var typeFilter;
    if (advertType === 'any') {
      typeFilter = 'any';
    } else if (advertType === advert.offer.type) {
      typeFilter = true;
    }
    return typeFilter;
  };

  /**
   * @name filterPrice
   * @description Проверяет условие и возвращает true при их совпадении
   * @param {object} advert
   * @return {Boolean} возвращает объявление при выполении условий
   */
  var filterPrice = function (advert) {
    var priceFilter;
    var priceRangeMap = {
      low: {
        min: 0,
        max: 10000
      },
      middle: {
        min: 10000,
        max: 50000
      },
      high: {
        min: 50000,
        max: 1000000
      }
    };
    if (advertPrice === 'any') {
      priceFilter = 'any';
    } else if (priceRangeMap[advertPrice].min <= advert.offer.price && priceRangeMap[advertPrice].max >= advert.offer.price) {
      priceFilter = true;
    }
    return priceFilter;
  };

  /**
   * @name filterRoom
   * @description Проверяет условие и возвращает true при их совпадении
   * @param {object} advert
   * @return {Boolean} возвращает объявление при выполении условий
   */
  var filterRoom = function (advert) {
    var roomFilter;

    if (advertRoom === 'any') {
      roomFilter = 'any';
    } else if (parseFloat(advertRoom) === advert.offer.rooms) {
      roomFilter = true;
    }
    return roomFilter;
  };

  /**
   * @name filterGuest
   * @description Проверяет условие и возвращает true при их совпадении
   * @param {object} advert
   * @return {Boolean} возвращает объявление при выполении условий
   */
  var filterGuest = function (advert) {
    var guestFilter;

    if (advertGuest === 'any') {
      guestFilter = 'any';
    } else if (parseFloat(advertGuest) === advert.offer.guests) {
      guestFilter = true;
    }
    return guestFilter;
  };

  /**
   * @name filterFeatures
   * @description .every проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции. .includes определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
   * @param {object} advert
   * @return {Boolean} возвращает объявление при выполении условий
   */
  var filterFeatures = function (advert) {
    return advertFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };

  /**
   * @name updatePins
   * @description Обновляет пины, вызывает функцию удаления старых
   */
  var updatePins = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }

    removeOldPins();
    window.pins.createPinElements(filteredAdverts);
  };

  /**
   * @name removeOldPins
   * @description Удаляет старые пины
   */
  var removeOldPins = function () {
    var oldPins = document.querySelectorAll('.map__pin');
    oldPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };
  filterForm.addEventListener('change', onFilterChange);


})();
