/* eslint-disable jsx-a11y/no-autofocus */
import classNames from "classnames";
import React from "react";

import "./Input.scss";

function Input({
  type = "text",
  id = "input-01",
  value = "",
  placeholder = "",
  handleChange = () => {},
  handleBlur = () => {},
  errorMessage,
  hasErrorMessage,
  autoFocus,
  currentTheme,
  ...props
}) {
  const classes = classNames({
    input__class: true,
    "input-class-err": hasErrorMessage && errorMessage,
    "is-invalid": hasErrorMessage && errorMessage,
    input__class__darkMode: currentTheme,
  });

  return (
    <>
      <input
        className={classes}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        {...props}
      />
      {hasErrorMessage && errorMessage && (
        <p className="invalid-msg">{errorMessage}</p>
      )}
    </>
  );
}

export default Input;
