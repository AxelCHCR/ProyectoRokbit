"use client";
import React from "react";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function editMeeting() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Reagendar</h1>
        <div className="flex mt-4">
          <div className="flex flex-col mt-2 space-y-1">
            <Input placeholder="Título" />
            <select className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4">
              <option disabled selected>
                Tipo
              </option>
              <option value="interna">Reunión interna</option>
              <option value="externa">Reunión externa</option>
            </select>
            <Input placeholder="Hora de inicio" />
            <Input placeholder="Hora de fin" />
            <select className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4">
              <option disabled selected>
                Prioridad
              </option>
              <option value="alta">Alta</option>
              <option value="medio">Media</option>
              <option value="baja">Baja</option>
            </select>
            <select className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4">
              <option disabled selected>
                ¿Es recurrente?
              </option>
              <option value="si">Sí</option>
              <option value="si">No</option>
            </select>
          </div>
          <div className="flex flex-col mt-2 ml-2">
            <div className="flex">
              <Button
                className="w-36 h-10 text-white mr-4 text-xs"
                text="Subir documento"
              ></Button>
              <Button
                className="w-36 h-10 text-white text-xs"
                text="Utilizar plantilla"
              ></Button>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>
        </div>

        <div className="flex justify-evenly">
          <Button
            text="Cancelar"
            className="bg-custom-light-gray text-gray-700 hover:bg-custom-dark-gray w-36 h-10"
          />
          <Button text="Modificar" className="w-36 h-10 text-white" />
        </div>
      </div>
    </div>
  );
}
