import './index.css';
import { initialCards } from '../utils/initialCards.js'
import { Card } from '../components/card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/section.js'
import { PopupWithImage } from '../components/popup-with-image.js';
import { UserInfo } from '../components/user-info.js';
import { PopupWithForm } from '../components/popup-with-form.js';
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
         popupImageSelector,
         cardSelector,
} from '../utils/constants.js';

// попапы и слушатели в них
const userProfile = new UserInfo({ profileNameSelector, profileProfessionSelector });
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userProfile.setUserInfo(data);
  },
  validationSettings.formSelector,
  validationSettings.inputSelector);
popupProfile.setEventListeners();

// функция создания карточки
function getCard(name, link) {
  const card = new Card(name, link, cardSelector, (name, link) =>  {
      popupPreview.open(name, link);
    });
const cardElement = card.generateCard();
return cardElement;
}

const popupPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  cardList.addItem(getCard(data.placename, data.url));
  },
  validationSettings.formSelector,
  validationSettings.inputSelector
);
popupPlace.setEventListeners();
const popupPreview = new PopupWithImage(popupImageSelector);
popupPreview.setEventListeners();

// включить валидацию
const validateProfile = new FormValidator(validationSettings, formEditProfile);
validateProfile.enableValidation();
const validatePlace = new FormValidator(validationSettings, formAddPlace);
validatePlace.enableValidation();

// обработка нажатий мыши, слушатели событий

// открыть форму редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  // заполнить значения полей
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().profession;
  validateProfile.clearErrors();
  popupProfile.open();
});

// - открыть форму добавления места
buttonAddPlace.addEventListener('click', () => {
  validatePlace.clearErrors();
  popupPlace.open();
});

// начальная загрузка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.setItem(getCard(item.name, item.link));
  }
}, cardsContainer);

cardList.renderItems();
