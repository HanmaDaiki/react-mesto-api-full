import React from "react";
import cancel from "../image/cancel.png";
import accept from "../image/accept.png";

function InfoTooltip({ onClose, error }) {
  return (
    <div className={`tooltip tooltip_active`}>
      <div className="tooltip__overlay" onClick={onClose}></div>
      <div className="tooltip__container">
        <button
          onClick={onClose}
          className="tooltip__close"
          type="button"
        ></button>
        {error ?
          <>
            <img
              className="tooltip__image"
              src={cancel}
              alt="Картинка ошибки реигстрации"
            />
            <span className="tooltip__title">
              Что-то пошло не так! Попробуйте ещё раз.
            </span>
          </>
         :
          <>
            <img
              className="tooltip__image"
              src={accept}
              alt="Картинка успешной реигстрации"
            />
            <span className="tooltip__title">
              Вы успешно зарегистрировались!
            </span>
          </>
        }
      </div>
    </div>
  );
}

export default InfoTooltip;
