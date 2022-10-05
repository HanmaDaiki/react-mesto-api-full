import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <div className={`popup popup_${name} popup_active`}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
