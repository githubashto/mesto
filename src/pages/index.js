import './index.css';
import { initialCards } from '../components/initialCards.js'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { cardsContainer,
         popupProfileSelector,
         popupPlaceSelector,
         formEditProfile,
         formAddPlace,
         buttonEditProfile,
         buttonAddPlace,
         nameInput,
         jobInput,
         profileNameSelector,
         profileProfessionSelector,
         validationSettings,
         popupImageSelector
} from '../components/constants.js';

// попапы и слушатели в них
const userProfile = new UserInfo({ profileNameSelector, profileProfessionSelector} );
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userProfile.setUserInfo(data);
});
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  const card = new Card(data.placename, data.url, '.template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  const submitButton = popupPlace._element.querySelector(validationSettings.submitButtonSelector);
  submitButton.classList.add(validationSettings.inactiveButtonClass);
  submitButton.disabled = true;
});
popupPlace.setEventListeners();
const popupPreview = new PopupWithImage(popupImageSelector);
popupPreview.setEventListeners();

// обработка нажатий мыши, слушатели событий

// открыть форму редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  // заполнить значения полей
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().profession;
  popupProfile.open();
  // включить валидацию
  const validateProfile = new FormValidator(validationSettings, formEditProfile);
  validateProfile.enableValidation();
});

// - открыть форму добавления места
buttonAddPlace.addEventListener('click', () => {
  popupPlace.open();
  // включить валидацию
  const validatePlace = new FormValidator(validationSettings, formAddPlace);
  validatePlace.enableValidation();
});

export function handleCardClick(link, name) {
  const popupPreview = new PopupWithImage(popupImageSelector);
  popupPreview.open(link, name);
}

// начальная загрузка карточек
export const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name,
                          item.link,
                          '.template',
                          (name, link) =>  {
                            // const popupPreview = new PopupWithImage(popupImageSelector);
                            popupPreview.open(name, link);
                            // popupPreview.setEventListeners();
                          });
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();
