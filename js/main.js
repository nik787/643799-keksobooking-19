'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var KEY_LEFT_MOUSE_BUTTON = 0;
  var QUANTITY_OBJECTS = 8;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var ads = window.mock.createListAds(QUANTITY_OBJECTS);

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

  mainPin.addEventListener('mousedown', onMainPinLeftClick);
  mainPin.addEventListener('keydown', onMainPinEnterPress);
  window.form.validityForm(false);
  window.form.addrInput.value = window.utils.getCoordinatePinMain(false);

  var activateInterface = function () {
    map.classList.remove('map--faded');
    window.pins.createPinElements(ads);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
    mainPin.removeEventListener('click', onMainPinLeftClick);
    window.form.validityForm(true);
    window.form.addrInput.value = window.utils.getCoordinatePinMain(true);

  };

  window.main = {
    activateInterface: activateInterface
  };
})();
