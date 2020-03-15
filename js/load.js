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

  var xhrEvents = function (xhr, onSuccess, onError) {
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
  };
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhrEvents(xhr, onSuccess, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  window.push = function (dataForm, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhrEvents(xhr, onSuccess, onError, dataForm);
    xhr.open('POST', Url.PUSH);
    xhr.send(dataForm);
  };
})();
