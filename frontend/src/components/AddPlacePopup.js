import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Создать"}
      children={
        <>
          <input
            value={name}
            className="popup__input popup__input_type_name-card"
            id="card-name"
            required
            type="text"
            name="card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleChangeName}
          />
          <span className="popup__input-error error-card-name"></span>

          <input
            value={link}
            className="popup__input popup__input_type_link-card"
            id="card-link"
            required
            type="url"
            name="card-link"
            placeholder="Ссылка на картинку"
            onChange={handleChangeLink}
          />
          <span className="popup__input-error error-card-link"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
