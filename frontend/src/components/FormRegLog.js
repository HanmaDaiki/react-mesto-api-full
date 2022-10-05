import React from "react";
import { useState } from "react";

function FormRegLog({
  onSubmit,
  titleForm,
  buttonText,
  regDescription = <></>,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <main className="main main_form">
      <form noValidate onSubmit={handleSubmit} className="form">
        <h1 className="form__title">{titleForm}</h1>
        <input
          value={email}
          onChange={handleChangeEmail}
          type="email"
          autoComplete="username"
          className="form__input"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={handleChangePassword}
          type="password"
          autoComplete="current-password"
          className="form__input"
          placeholder="Пароль"
        />
        <button type="submit" className="form__button">
          {buttonText}
        </button>
        {regDescription}
      </form>
    </main>
  );
}

export default FormRegLog;
