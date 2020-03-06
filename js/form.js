'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsetForm = form.querySelectorAll('fieldset');
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

  var validityForm = function (stateInterface) {
    if (stateInterface) {
      window.utils.switchDisabled(window.form.fieldsetForm, false);
      window.utils.switchDisabled(window.form.mapFilters, false);
      form.classList.remove('ad-form--disabled');
      formGuestsElement.setCustomValidity('Данное количество комнат не рассчитано на столько гостей');
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
          window.utils.getCoordinatePinMain(false);
        }, 50);
      });
    } else {
      window.utils.switchDisabled(window.form.fieldsetForm, true);
      window.utils.switchDisabled(window.form.mapFilters, true);
    }
  };

  window.form = {
    validityForm: validityForm,
    fieldsetForm: fieldsetForm,
    mapFilters: mapFilters.children,
    addrInput: addrInput
  };
})();
