import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image popup_active`}>
      <div className="popup__overlay popup__overlay_image" onClick={onClose} />
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={card.link}
          alt={`А тут была картинка с названием ${card.name}`}
        />
        <h2 className="popup__image-title">{card.name}</h2>
        <button className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
