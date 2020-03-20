'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    PUSH: 'https://js.dump.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var xhrEvents = function (ifSuccess, ifError, type, dataForm) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        ifSuccess(xhr.response);
      } else {
        ifError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      ifError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      ifError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (type === 'GET') {
      xhr.open(type, Url.LOAD);
      xhr.send();
    } else if (type === 'POST') {
      xhr.open(type, Url.PUSH);
      xhr.send(dataForm);
    }
  };
  window.dataLoad = function (ifSuccess, ifError) {
    xhrEvents(ifSuccess, ifError, 'GET');
  };

  window.dataPush = function (dataForm, ifSuccess, ifError) {
    xhrEvents(ifSuccess, ifError, 'POST', dataForm);
  };

  window.onSuccess = function (data) {
    window.map.defaultAds = data;
    window.pins.createPinElements(window.map.defaultAds);
  };
})();
