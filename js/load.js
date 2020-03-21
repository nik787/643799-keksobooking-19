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

  window.dataLoad = function (ifSuccess, ifError) {
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
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  window.dataPush = function (dataForm, ifSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      ifSuccess(xhr.response);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', Url.PUSH);
    xhr.send(dataForm);
  };

  window.onSuccess = function (data) {
    window.map.defaultAds = data;
    window.pins.createPinElements(window.map.defaultAds);
  };
})();
