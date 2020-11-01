// показать сообщение об ошибке
function showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

// скрыть сообщение об ошибке
function hideError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// проверка валидности полей в форме
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

// переключение кнопки сабмита
function toggleButtonState(inputList, submitElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitElement.classList.add(inactiveButtonClass);
    submitElement.disabled = true;
  } else {
    submitElement.classList.remove(inactiveButtonClass);
    submitElement.disabled = false;
  }
}

// проверка валидности поля
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// добавляем слушатели к полям формы
function setInputListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitElement,  inactiveButtonClass);
    });
  });
}

// добавляем валидацию ко всем формам
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
    // отключить обработку по умолчанию
    evt.preventDefault();
  });
  setInputListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass);
});
}

// вызываем функцию валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
