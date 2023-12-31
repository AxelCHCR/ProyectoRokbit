import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  const buttonClass = `rounded-xl bg-custom-blue  font-poppins font-bold hover:bg-custom-dark-blue ${className}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
