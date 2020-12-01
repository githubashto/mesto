export class FormValidator {
  constructor(validationSettings, formElement) {
    this._element = formElement;
    this._input = validationSettings.inputSelector;
    this._submit = validationSettings.submitButtonSelector;
    this._inactive = validationSettings.inactiveButtonClass;
    this._inputError = validationSettings.inputErrorClass;
    this._error = validationSettings.errorClass;
  }

  // показать сообщение об ошибке
  _showError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.classList.add(this._error);
    errorElement.textContent = inputElement.validationMessage;
  }

  // скрыть сообщение об ошибке
  _hideError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._error);
    errorElement.textContent = '';
  }

// проверка валидности поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    }
    else {
      this._hideError(inputElement);
    }
  }

  //проверка валидности полей в форме
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
  }

// переключение кнопки сабмита
  _toggleButtonState(inputList, submitElement) {
  if (this._hasInvalidInput(inputList)) {
    submitElement.classList.add(this._inactive);
    submitElement.disabled = true;
  } else {
    submitElement.classList.remove(this._inactive);
    submitElement.disabled = false;
  }
}

// - отправка форм нажатием Enter
  _handleEnterKey(inputElement, evt) {
    if (evt.key === 'Enter') {
      switch(this._element)  {
        case '.popup__container_content_profile':
        handleProfileForm();
        break;

        case '.popup__container_content_place':
        handlePlaceForm();
        break;
      }
    }
  }

// добавляем слушатели к полям формы
  _setInputListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._input));
    const submitElement = this._element.querySelector(this._submit);
    this._toggleButtonState(inputList, submitElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitElement);
      });
    // слушатель для Enter
      inputElement.addEventListener('keydown', (evt) => {
        if (!this._hasInvalidInput(inputList)) {
          this._handleEnterKey(inputElement, evt);
        }
      });
    });
  }

// включаем валидацию
  enableValidation() {
  this._element.addEventListener('submit', evt => {
    // отключить обработку по умолчанию
    evt.preventDefault();
    });
  this._setInputListeners();
  }

}

// показать сообщение об ошибке
// export function showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
// }

// // скрыть сообщение об ошибке
// export function hideError(formElement, inputElement, inputErrorClass, errorClass) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// }

// // проверка валидности поля
// export function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
//   if (!inputElement.validity.valid) {
//     showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
//   } else {
//     hideError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// }

// // проверка валидности полей в форме
// export function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
//   });
// }

// // переключение кнопки сабмита
// export function toggleButtonState(inputList, submitElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     submitElement.classList.add(inactiveButtonClass);
//     submitElement.disabled = true;
//   } else {
//     submitElement.classList.remove(inactiveButtonClass);
//     submitElement.disabled = false;
//   }
// }

// // добавляем слушатели к полям формы
// export function setInputListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const submitElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, submitElement, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
//       toggleButtonState(inputList, submitElement,  inactiveButtonClass);
//     });
//     // слушатель для Enter
//     inputElement.addEventListener('keydown', () => {
//      if (!hasInvalidInput(inputList)) {
//       handleEnterKey(inputElement);
//      }
//     });
//   });
// }

// // добавляем валидацию ко всем формам
// export function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', evt => {
//     // отключить обработку по умолчанию
//     evt.preventDefault();
//   });
//   setInputListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass);
// });
// }

// // вызываем функцию валидации
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit',
//   inactiveButtonClass: 'popup__submit_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
