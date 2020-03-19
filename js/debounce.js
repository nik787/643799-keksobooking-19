'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (cb) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
