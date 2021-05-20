/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "./Checkbox.scss";

export default function Checkbox({ checked, handleChange }) {
  return (
    <div className="border" onClick={() => handleChange()}>
      <div className={`indicator ${checked ? "checked" : ""}`} />
    </div>
  );
}
