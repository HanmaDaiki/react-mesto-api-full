import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avaRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avaRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"edit-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
      children={
        <>
          <input
            defaultValue={""}
            className="popup__input popup__input_type_avatar-link"
            id="avatar-link"
            required
            type="url"
            name="avatar-link"
            placeholder="Ссылка на аватарку"
            ref={avaRef}
          />
          <span className="popup__input-error error-avatar-link"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
