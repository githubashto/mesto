import './index.css';
import { initialCards } from '../utils/initialCards.js'
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
         popupImageSelector,
         cardSelector,
} from '../utils/constants.js';

// попапы и слушатели в них
const userProfile = new UserInfo({ profileNameSelector, profileProfessionSelector} );
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userProfile.setUserInfo(data);
});
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

// начальная загрузка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.setItem(getCard(item.name, item.link));
  }
}, cardsContainer);

cardList.renderItems();
