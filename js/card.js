'use strict';

(function () {
  var userCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var OffersType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };


  var createCardPopup = function (objAds) {
    var userCardElement = userCardTemplate.cloneNode(true);
    var userCardClose = userCardElement.querySelector('.popup__close');
    userCardClose.addEventListener('click', function () {
      userCardElement.remove();
    });


    userCardElement.querySelector('.popup__title').textContent = objAds.offer.title;
    userCardElement.querySelector('.popup__text--address').textContent = objAds.offer.address;
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

    map.insertBefore(userCardElement, mapFiltersContainer);

    var onCardEscapePress = function (evt) {
      if (evt.key === window.utils.escape) {
        userCardElement.remove();
        var pin = document.querySelector('.map__pin--active');
        if (pin) {
          pin.classList.remove('map__pin--active');
        }
      }
    };
    document.addEventListener('keydown', onCardEscapePress);

  };

  window.card = {
    createCardPopup: createCardPopup
  };
})();
