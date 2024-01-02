import React from "react";
import Button from "../button";

interface PopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const PopUp: React.FC<PopupProps> = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-5 rounded shadow-lg rounded-3xl">
        <p className="mt-2 font-poppins font-bold ">{message}</p>
        <div className="flex  justify-center">
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
