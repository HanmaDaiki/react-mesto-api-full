import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { api } from "../utils/Api";
import React from "react";
import Content from "./Content";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import FormRegLog from "./FormRegLog";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    error: false,
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Имя",
    about: "Описание",
    avatar: "https://dummyimage.com/600x400/000/fff.png",
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(`В апи getCards ошибка - ${err}`);
        });

      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            id: user._id,
          });
        })
        .catch((err) => {
          console.log(`В апи getUserInfo ошибка - ${err}`);
        });
    }
  }, [loggedIn]);

  function handleExitProfile() {
    setLoggedIn(false);
    localStorage.setItem("jwt", "");
  }

  function handleRegistrationUser(email, password) {
    api
      .signUp(email, password)
      .then(() => {
        setIsInfoTooltip({ isOpen: true, error: false });
        history.push('./sing-in')
      })
      .catch((err) => {
        setIsInfoTooltip({ isOpen: true, error: true });
        console.log(`В апи singUp ошибка - ${err}`);
      });
  }

  function handleLoginUser(email, password) {
    api
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(`В апи singIn ошибка - ${err}`);
      });
  }

  function handleDeleteCard(removedCard) {
    api
      .deleteCard(removedCard._id)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return removedCard._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(`В апи deleteCard ошибка - ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`В апи changeLikeCardStatus ошибка - ${err}`);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .patchAvatar(link)
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`В апи patchAvatar ошибка - ${err}`);
      });
  }

  function handleUpdateUser(user) {
    api
      .editInfoUser(user)
      .then((updateUserInfo) => {
        setCurrentUser(updateUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`В апи editInfoUser ошибка - ${err}`);
      });
  }

  function handleAddPlace(card) {
    api
      .addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`В апи editInfoUser ошибка - ${err}`);
      });
  }

  function handleImageCardClick(card) {
    setCurrentCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsConfirmPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltip({ isOpen: false, error: false });
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleExitProfile={handleExitProfile} />
        <Switch>
          <Route path="/sign-in">
            <FormRegLog
              onSubmit={handleLoginUser}
              titleForm="Вход"
              buttonText="Войти"
            />
          </Route>

          <Route path="/sign-up">
            <FormRegLog
              onSubmit={handleRegistrationUser}
              titleForm="Регистрация"
              buttonText="Зарегистрироваться"
              regDescription={
                <Link to="/sing-up" className="form__link">
                  Уже зарегистрированы? Войти
                </Link>
              }
            />
          </Route>

          <ProtectedRoute
            path="/"
            handleExitProfile={handleExitProfile}
            loggedIn={loggedIn}
            component={Content}
            currentUser={currentUser}
            email={email}
            handleImageCardClick={handleImageCardClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleEditAvatarClick={handleEditAvatarClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleDeleteCard={handleDeleteCard}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            handleUpdateUser={handleUpdateUser}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            handleUpdateAvatar={handleUpdateAvatar}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            handleAddPlace={handleAddPlace}
            isConfirmPopupOpen={isConfirmPopupOpen}
            currentCard={currentCard}
            isImagePopupOpen={isImagePopupOpen}
          />
        </Switch>
        <Footer />

        {
          isEditProfilePopupOpen &&
          <EditProfilePopup
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        }

        {
          isEditAvatarPopupOpen &&
          <EditAvatarPopup
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        }

        {
          isAddPlacePopupOpen &&
          <AddPlacePopup
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
        }

        {
          isConfirmPopupOpen &&
          <PopupWithForm
            name={"delete-card"}
            title={"Вы уверены?"}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <button className="popup__save" type="button">
                  Да
                </button>
              </>
            }
          />
        }

        {
          isImagePopupOpen &&
          <ImagePopup
            card={currentCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        }

        {
          isInfoTooltip.isOpen &&
          <InfoTooltip
            onClose={closeAllPopups}
            error={isInfoTooltip.error}
          />
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
