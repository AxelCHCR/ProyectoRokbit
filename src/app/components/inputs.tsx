import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, ...rest }, ref) => {
    const inputClass = `border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4 ${
      className || ""
    }`;

    return (
      <input
        ref={ref}
        className={inputClass}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
);

export default Input;
