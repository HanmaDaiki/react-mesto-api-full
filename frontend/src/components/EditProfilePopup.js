import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
      children={
        <>
          <input
            onChange={handleChangeName}
            value={name}
            className="popup__input popup__input_type_name"
            id="edit-name"
            required
            type="text"
            name="edit-name"
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error error-edit-name"></span>
          <input
            onChange={handleChangeAbout}
            value={about}
            className="popup__input popup__input_type_description"
            id="edit-description"
            required
            type="text"
            name="edit-description"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error error-edit-description"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
