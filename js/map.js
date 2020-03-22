'use strict';

(function () {
  var Сoordinates = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 110,
    Y_MAX: 610,
  };
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 20
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var onMainPinEnterPress = function (evt) {
    if (evt.key === window.utils.enter) {
      activateInterface();
    }
  };

  var onMainPinLeftClick = function (evt) {
    if (evt.button === window.utils.mouseLeft) {
      activateInterface();
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    /**
     * @name checkMinMax
     * @description Проверят число, в пределах min и max координаты
     * @param {number} coordMin ограничивает минимальный диапозон координат
     * @param {number} coordMax ограничивает максимальный диапазон координат
     * @param {number} coordCurrent текущие координаты
     * @return {number} возвращает число, в рамках coordMin - coordMax
     */
    function checkMinMax(coordMin, coordMax, coordCurrent) {
      if (coordCurrent < coordMin) {
        return coordMin;
      } else if (coordCurrent > coordMax) {
        return coordMax;
      }
      return coordCurrent;
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinateY = mainPin.offsetTop - shift.y;
      var coordinateX = mainPin.offsetLeft - shift.x;

      var top = checkMinMax((Сoordinates.Y_MIN - MainPin.HEIGHT), (Сoordinates.Y_MAX - MainPin.HEIGHT), coordinateY);
      var left = checkMinMax((Сoordinates.X_MIN - Math.round(MainPin.WIDTH / 2)), (Сoordinates.X_MAX - Math.round(MainPin.WIDTH / 2)), coordinateX);

      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';

      window.form.addrInput.value = window.utils.getCoordinatePinMain(true);
      if (shift.x >= Сoordinates.X_MAX) {
        mainPin.style.left = Сoordinates.X_MAX;
        window.form.addrInput.value = window.utils.getCoordinatePinMain(true);

      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form.addrInput.value = window.utils.getCoordinatePinMain(false);
  var initCoordMainPin = {
    x: mainPin.style.left,
    y: mainPin.style.top
  };
  window.form.enable(false);
  var disabledInterface = function () {
    map.classList.add('map--faded');
    mainPin.style.top = initCoordMainPin.y;
    mainPin.style.left = initCoordMainPin.x;
    mainPin.addEventListener('mousedown', onMainPinLeftClick);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
    window.form.enable(false);
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    var cardPopup = document.querySelector('.map__card');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  var defaultAds = [];

  var activateInterface = function () {
    map.classList.remove('map--faded');
    window.dataLoad(window.onSuccess);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
    mainPin.removeEventListener('mousedown', onMainPinLeftClick);
    window.form.enable(true);
    window.form.addrInput.value = window.utils.getCoordinatePinMain(true);
  };

  mainPin.addEventListener('mousedown', onMainPinLeftClick);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.map = {
    defaultAds: defaultAds,
    disable: disabledInterface
  };
})();
