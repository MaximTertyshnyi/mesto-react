import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './PopupWithImage';
import Main from './Main';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCardId, setDeleteCardId] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getProfileData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    console.log(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsDeleteCardPopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }


  React.useEffect(() => {
    api
      .getCardsData()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }, []);

  //Добавляем like на карточки
  function handleCardLike(id, isLiked) {
    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((card) => (card._id === id ? newCard : card)));
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  //добавление новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        const arr = cards.filter((card) => card._id !== id);
        setCards(arr);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setDeleteCardId(cardId);
  }

  return (
    <div className="page__container-global">
      {/* Подписываем компоненты на контекст текущего пользователя */}
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          cardId={deleteCardId}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
