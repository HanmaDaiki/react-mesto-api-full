import React from "react";
import Main from "./Main";

function Content({
  handleImageCardClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleEditAvatarClick,
  cards,
  handleCardLike,
  handleDeleteCard,
}) {
  return (
      <Main
        onCardClick={handleImageCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
      />
  );
}

export default Content;
