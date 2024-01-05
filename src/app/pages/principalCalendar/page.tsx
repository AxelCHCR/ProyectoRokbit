"use client";

import WeeklyCalendar from "@/app/components/calendar";
import Input from "@/app/components/inputs";
import Button from "@/app/components/button";

export default function Register() {
  return (
    <div>
      <div className="flex items-center align-items flex-col">
        <WeeklyCalendar></WeeklyCalendar>
        <div>
          <label className="font-poppins font-lighttext-sm mt-12 mb-4 mr-2">
            Mostrar resultados donde podamos estar más de
          </label>
          <Input
            type="number"
            className="w-16 mr-2"
            autoComplete="off"
            min={1}
          />
          <label className="font-poppins font-lighttext-sm mt-12 mb-4 mr-2">
            persona (s)
          </label>
          <Button text="Continuar" className="mt-7 w-36 h-10 text-white" />
        </div>
      </div>
    </div>
  );
}
