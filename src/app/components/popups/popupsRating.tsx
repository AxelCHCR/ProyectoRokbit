// Import necessary hooks and components from React and React Icons for stars
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../button";

// RatingStar Component
const RatingStar = ({ filled, onClick, color = "yellow" }) => {
  return (
    <span onClick={onClick} style={{ cursor: "pointer", margin: "0 10px" }}>
      <FaStar color={filled ? color : "gray"} />
    </span>
  );
};

// PopUp Component
const PopUp = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg rounded-3xl">
        <p className="mt-2 font-poppins font-bold ">
          ¿Qué te pareció la reunión?
        </p>
        <div className="flex justify-center mt-4">
          {[...Array(5)].map((_, index) => (
            <RatingStar
              key={index}
              filled={index < rating}
              onClick={() => handleStarClick(index + 1)}
              color="orange"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            text="Continuar"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
