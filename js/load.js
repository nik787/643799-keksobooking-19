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

  var dataLoad = function (ifSuccess, ifError) {
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

  var dataPush = function (dataForm, ifSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      ifSuccess(xhr.response);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', Url.PUSH);
    xhr.send(dataForm);
  };

  var onSuccess = function (data) {
    window.map.adverts = data;
    window.pins.render(window.map.adverts);
  };
  var onError = function (message) {
    var error = document.createElement('div');
    error.classList.add('error-message');
    error.textContent = message;
    error.style = 'position: fixed; top: 0; left:0; right: 0; text-align: center; font-size: 30px; line-height: 50px; color: rgb(200, 200, 0); background-color: rgba(0, 0, 0, 0.8); ';
    document.body.appendChild(error);
    setTimeout(removeError, 3000);

    function removeError() {
      error.remove();
    }
  };

  window.load = {
    load: dataLoad,
    push: dataPush,
    success: onSuccess,
    error: onError
  };
})();
