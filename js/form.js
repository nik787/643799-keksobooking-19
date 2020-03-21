'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsetsForm = form.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');

  var addrInput = form.querySelector('#address');

  var formPriceElement = form.querySelector('[name="price"]');
  var formApartmentTypeElement = form.querySelector('[name="type"]');
  var formTimeinElement = form.querySelector('[name="timein"]');
  var formTimeoutElement = form.querySelector('[name="timeout"]');
  var formTRoomsElement = form.querySelector('[name="rooms"]');
  var formGuestsElement = form.querySelector('[name="capacity"]');

  var onApartmentTypeChange = function () {
    var minAppartmentPrice;
    switch (formApartmentTypeElement.value) {
      case 'bungalo':
        minAppartmentPrice = 0;
        break;
      case 'flat':
        minAppartmentPrice = 1000;
        break;
      case 'house':
        minAppartmentPrice = 5000;
        break;
      case 'palace':
        minAppartmentPrice = 10000;
    }

    formPriceElement.setAttribute('min', minAppartmentPrice);
    formPriceElement.setAttribute('placeholder', minAppartmentPrice);
  };

  var adjustmentTimeField = function (timeField, dependTimeField) {
    dependTimeField.value = timeField.value;
    dependTimeField.focus();
  };

  var onGuestsAndRoomsChange = function () {
    formGuestsElement.setCustomValidity('');

    if (formTRoomsElement.value < formGuestsElement.value || formTRoomsElement.value === '100' || formGuestsElement.value === '0') {
      formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
    }

    if (formTRoomsElement.value === '100' && formGuestsElement.value === '0') {
      formGuestsElement.setCustomValidity('');
    }
  };

  formApartmentTypeElement.addEventListener('change', onApartmentTypeChange);

  formTimeinElement.addEventListener('change', function () {
    adjustmentTimeField(formTimeinElement, formTimeoutElement);
  });

  formTimeoutElement.addEventListener('change', function () {
    adjustmentTimeField(formTimeoutElement, formTimeinElement);
  });

  formGuestsElement.addEventListener('change', onGuestsAndRoomsChange);

  formTRoomsElement.addEventListener('change', onGuestsAndRoomsChange);

  form.addEventListener('reset', function () {
    setTimeout(function () {
      window.map.disabled();
    }, 50);
  });

  var main = document.querySelector('main');

  /**
   * @name successPopupMessage
   * @description Генерирует и вызывает попап об успешной отправки формы
   */
  var successPopupMessage = function () {
    var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopup = successPopupTemplate.cloneNode(true);
    successPopup.id = 'message';
    main.appendChild(successPopup);
    document.addEventListener('mousedown', onMessageCloseMousedown);
    document.addEventListener('keydown', onMessageCloseKeydown);
  };
  /**
   * @name errorPopupMessage
   * @description Генерирует и вызывает попап об ошибке при отправки формы
   */
  var errorPopupMessage = function () {
    var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopup = errorPopupTemplate.cloneNode(true);
    errorPopup.id = 'message';
    main.appendChild(errorPopup);

    errorPopup.querySelector('.error__button').addEventListener('click', onMessageCloseClick);
    document.addEventListener('mousedown', onMessageCloseMousedown);
    document.addEventListener('keydown', onMessageCloseKeydown);
  };

  // Обработчики событий
  var onMessageCloseMousedown = function (evt) {
    if (evt.button === window.utils.mouseLeft) {
      removeMessage();
    }
  };

  var onMessageCloseKeydown = function (evt) {
    if (evt.key === window.utils.escape) {
      removeMessage();
    }
  };

  var onMessageCloseClick = function (evt) {
    evt.preventDefault();
    removeMessage();
  };

  var removeMessage = function () {
    document.querySelector('#message').remove();
    document.removeEventListener('mousedown', onMessageCloseMousedown);
    document.removeEventListener('keydown', onMessageCloseKeydown);
  };

  var onFormSubmit = function (evt) {
    window.dataPush(new FormData(form), function (response) {
      if (response) {
        successPopupMessage();
        window.map.disabled();
        form.reset();
      } else {
        errorPopupMessage();
      }
    });
    evt.preventDefault();
  };

  /**
   * @name enableForm
   * @description Генерирует и вызывает попап об ошибке при отправки формы
   * @param {Boolean} stateInterface Если true то форма работает, если false то форма отключена
   */
  var enableForm = function (stateInterface) {
    if (stateInterface) {
      window.utils.switchDisabled(window.form.fieldsetsForm, false);
      window.utils.switchDisabled(window.form.mapFilters, false);
      form.classList.remove('ad-form--disabled');
      formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
    } else {
      window.utils.switchDisabled(window.form.fieldsetsForm, true);
      window.utils.switchDisabled(window.form.mapFilters, true);
      form.classList.add('ad-form--disabled');
      onApartmentTypeChange();
    }
  };

  form.addEventListener('submit', onFormSubmit);


  window.form = {
    enable: enableForm,
    fieldsetsForm: fieldsetsForm,
    mapFilters: mapFilters.children,
    addrInput: addrInput
  };
})();
