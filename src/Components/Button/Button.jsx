import btnStyle from "./Button.module.css";
import React from "react";

const btnTypes = {
  primary: "buttonPrimary",
  secondary: "buttonSecondary",
};

function mergeClasses(classes) {
  return classes
    .filter((item) => item !== "")
    .join(" ")
    .trim();
}
export default function Button({ children, variant, type, onClick }) {
  return (
    <button
      onClick={onClick}
      className={mergeClasses([
        btnStyle.button,
        btnStyle[`${btnTypes[variant]}`],
      ])}
      type={type}
    >
      {children}
    </button>
  );
}

export function SelectOption({ children , onChange }) {
  return (
    <select
    onChange={onChange}
      className={mergeClasses([btnStyle.button, btnStyle.button__select])}
    >
      {children}
    </select>
  );
}
