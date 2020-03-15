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

  var xhrEvents = function (onSuccess, onError, type, dataForm) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
  window.load = function (onSuccess, onError) {
    xhrEvents(onSuccess, onError, 'GET');
  };

  window.push = function (dataForm, onSuccess, onError) {
    xhrEvents(onSuccess, onError, 'POST', dataForm);
  };
})();
