'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var KEY_LEFT_MOUSE_BUTTON = 0;
  var ESCAPE = 'Escape';

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 20
  };

  /**
   * @name switchDisabled
   * @description Функция устанавливает disabled true/false на html элеметы
   * @param {Array} htmlElements Массив html элеметов
   * @param {boolean} switching Включает/Отключает disabled
  */
  var switchDisabled = function (htmlElements, switching) {
    for (var i = 0; i < htmlElements.length; i++) {
      htmlElements[i].disabled = switching;
    }
  };

  /**
   * @name getCoordinatePinMain
   * @description Функция находит координаты пина и проверяет активирован ли интерфейс, в зависимости от этого изменяет значение
   * @param {boolean} stateInterface true - интерфейс включен, false - интерфейс отключен
   * @return {String} Возвращает строку с координатами главного пина 'x, y'
   */
  var getCoordinatePinMain = function (stateInterface) {
    var mainPin = document.querySelector('.map__pin--main');

    var currentMapPinMainX = Math.round(mainPin.offsetLeft + (MainPin.WIDTH / 2));
    var currentMapPinMainYDisabled = Math.round(mainPin.offsetTop + (MainPin.HEIGHT / 2));
    var currentMapPinMainY = Math.round(mainPin.offsetTop + (MainPin.HEIGHT + MainPin.POINTER_HEIGHT));
    return stateInterface ? currentMapPinMainX + ', ' + currentMapPinMainY : currentMapPinMainX + ', ' + currentMapPinMainYDisabled;
  };

  window.utils = {
    enter: ENTER_KEY,
    mouseLeft: KEY_LEFT_MOUSE_BUTTON,
    escape: ESCAPE,
    switch: switchDisabled,
    coordinatePinMain: getCoordinatePinMain
  };
})();
