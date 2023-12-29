import React from "react";

interface InputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, className }) => {
  const inputClass = `border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4 ${
    className || ""
  }`;

  return <input className={inputClass} placeholder={placeholder} />;
};

export default Input;
