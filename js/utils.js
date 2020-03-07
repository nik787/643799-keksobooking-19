'use strict';

(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 20
  };


  /**
   * @name getRandomInt
   * @description Функция создает рандомное число из диапозона min, max
   * @param {number} min Минимальное число
   * @param {number} max Максимальное число
   * @return {number} Рандомное число
  */
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * @name getRandomElementArr
   * @description Функция возвращяет рандомный элемент массива от 0 до длинны массива
   * @param {Array} arr Массив данных
   * @return {Array} Рандомный элемент массива
   *
  */
  var getRandomElementArr = function (arr) {
    return arr[getRandomInt(0, arr.length)];
  };

  /**
   * @name getRandomElementsArr
   * @description Функция возвращяет рандомный массив элементов от 1 до длинны массива
   * @param {Array} arr Массив данных
   * @return {Array} Новый рандомный массив
  */
  var getRandomElementsArr = function (arr) {
    var minElements = 1;
    var oldArr = arr;
    var newArr = [];
    for (var i = 0; i < getRandomInt(minElements, arr.length); i++) {
      newArr.push(oldArr[i]);
      oldArr.splice(i, 1);
    }
    return newArr;
  };

  /**
   * @name switchDisabled
   * @description Функция устанавливает disabled true/false на html элеметы
   * @param {Array} htmlElements Массив html элеметов
   * @param {boolean} switching Включает/Отключает disabled
  */
  var switchDisabled = function (htmlElements, switching) {
    // htmlElements.forEach(function (htmlElement) {
    //   htmlElement.disabled = switching;
    // }); НЕ РАБОТАЕТ!!!
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
    var result;
    if (stateInterface) {
      result = currentMapPinMainX + ', ' + currentMapPinMainY;
    } else {
      result = currentMapPinMainX + ', ' + currentMapPinMainYDisabled;
    }
    return result;
  };

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomElementArr: getRandomElementArr,
    getRandomElementsArr: getRandomElementsArr,
    switchDisabled: switchDisabled,
    getCoordinatePinMain: getCoordinatePinMain
  };
})();
