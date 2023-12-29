import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  const buttonClass = `rounded-xl bg-custom-blue w-40 h-12 font-poppins font-bold text-white hover:bg-custom-dark-blue ${
    className || ""
  }`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
