import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ card, onCardClick, onCardLike, onDeleteCard }) {
  const user = useContext(CurrentUserContext);
  const isLiked = card.likes.some((like) => like === user.id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onDeleteCard(card, isLiked);
  }


  const isOwn = user.id === card.owner;

  const cardLikeButtonClass = `${
    isLiked ? "card__like-button card__like-button_active" : "card__like-button"
  }`;

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt={`А тут была картинка с названием ${card.name}`}
        onClick={handleClick}
      />
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like">
        <button
          className={cardLikeButtonClass}
          onClick={handleLikeClick}
        ></button>
        <span className="card__like-counter">{card.likes.length}</span>
      </div>
      {isOwn && (
        <button className="card__delete" onClick={handleDeleteClick}></button>
      )}
    </article>
  );
}

export default Card;
