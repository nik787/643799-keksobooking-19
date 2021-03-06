'use strict';

(function () {
  var QUANTITY_ADS = 5;
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var userPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var userPinList = document.querySelector('.map__pins');

  var createPinElement = function (dataAds) {
    var userPinElement = userPinTemplate.cloneNode(true);
    var image = userPinElement.querySelector('img');

    image.src = dataAds.author.avatar;
    image.alt = dataAds.offer.title;

    userPinElement.style.left = dataAds.location.x - Pin.WIDTH / 2 + 'px';
    userPinElement.style.top = dataAds.location.y - Pin.HEIGHT + 'px';
    userPinElement.addEventListener('click', function () {
      var oldPin = document.querySelector('.map__pin--active');
      var oldPopup = document.querySelector('.map__card');
      if (oldPopup) {
        oldPopup.remove();
      }
      if (oldPin) {
        oldPin.classList.remove('map__pin--active');
        window.card.create(dataAds);
        userPinElement.classList.add('map__pin--active');
      } else {
        window.card.create(dataAds);
        userPinElement.classList.add('map__pin--active');
      }
    });
    return userPinElement;
  };
  var createPinElements = function (dataAds) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(dataAds.length, QUANTITY_ADS); i++) {
      fragment.appendChild(createPinElement(dataAds[i]));
    }
    userPinList.appendChild(fragment);
  };

  window.pins = {
    render: createPinElements
  };
})();
