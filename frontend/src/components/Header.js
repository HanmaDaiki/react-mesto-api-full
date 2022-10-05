import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Header({ email, handleExitProfile }) {
  const location = useLocation();
  const path = location.pathname;
  const [element, setElement] = useState(<></>);

  function updateElement() {
    if (path === "/sign-in") {
      setElement(
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      );
    }
    if (path === "/sign-up") {
      setElement(
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      );
    }
    if (path === "/") {
      setElement(
        <div className="header__profile">
          <span className="header__email">{email}</span>
          <Link
            onClick={handleExitProfile}
            className="header__link header__link_exit"
            to="/"
          >
            Выйти
          </Link>
        </div>
      );
    }
  }

  useEffect(() => {
    updateElement();
  }, [path]);

  return (
    <header className="header">
      <div className="header__logo"></div>
      {element}
    </header>
  );
}

export default Header;
