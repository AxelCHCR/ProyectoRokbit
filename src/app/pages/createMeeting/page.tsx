"use client";

import React, { useState } from "react";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Popup from "@/app/components/popups/popups";
import MeetingController from "../../../../backend/controllers/MeetingController";

type MeetingFormData = {
  name: string;
  type: string;
  startTime: string;
  endTime: string;
  priority: string;
  recurrence: string;
  date: Date;
};

const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const validateTimeFormat = z
  .string()
  .refine((val) => timeFormatRegex.test(val), {
    message: "Formato de hora inválido (HH:MM)",
  });
const convertTimeToMinutes = (time: any) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const meetingSchema = z
  .object({
    name: z.string().min(1, { message: "El título es requerido" }),
    type: z.enum(["Interna", "Externa"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
    startTime: validateTimeFormat,
    endTime: validateTimeFormat,
    priority: z.enum(["Alta", "Medio", "Baja"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
    recurrence: z.enum(["si", "no"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
  })
  .refine((data) => data.startTime !== data.endTime, {
    message: "La hora de inicio y fin no pueden ser iguales",
    path: ["endTime"],
  })
  .refine(
    (data) => {
      const inicioEnMinutos = convertTimeToMinutes(data.startTime);
      const finEnMinutos = convertTimeToMinutes(data.endTime);
      return inicioEnMinutos <= finEnMinutos;
    },
    {
      message: "La hora de inicio debe ser menor o igual a la hora de fin",
      path: ["horaFin"],
    }
  );

export default function createMeeting() {
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
  });

  const { user } = useAuth();

  const submitMeetingData = async (data: MeetingFormData) => {
    const formattedDate = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : null;

    const fullData = {
      ...data,
      recurrence: data.recurrence === "si" ? true : false,
      owner: user.email,
      date: formattedDate,
    };
    console.log("Datos completos de la reunión: ", fullData);
    await MeetingController.create("http://localhost:4000/api/meetings", fullData);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Crea tu reunión</h1>
        <form onSubmit={handleSubmit(submitMeetingData)}>
          <div className="flex mt-4">
            <div className="flex flex-col mt-2 space-y-1">
              <Input placeholder="Título" {...register("name")} />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <select
                {...register("type")}
                className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
              >
                <option disabled>Tipo</option>
                <option value="Interna">Reunión interna</option>
                <option value="Externa">Reunión externa</option>
              </select>
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}

              <Input
                type="time"
                placeholder="Hora de inicio"
                {...register("startTime")}
              />
              {errors.startTime && (
                <span className="text-red-500">
                  {errors.startTime.message}
                </span>
              )}

              <Input
                type="time"
                placeholder="Hora de fin"
                {...register("endTime")}
              />
              {errors.endTime && (
                <span className="text-red-500">{errors.endTime.message}</span>
              )}

              <select
                {...register("priority")}
                className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
              >
                <option disabled>Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Medio">Media</option>
                <option value="Baja">Baja</option>
              </select>
              {errors.priority && (
                <span className="text-red-500">{errors.priority.message}</span>
              )}

              <select
                {...register("recurrence")}
                className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
              >
                <option disabled>¿Es recurrente?</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {errors.recurrence && (
                <span className="text-red-500">
                  {errors.recurrence.message}
                </span>
              )}
            </div>

            <div className="flex flex-col mt-2 ml-2">
              <div className="flex">
                <Button
                  className="w-36 h-10 text-white mr-4 text-xs"
                  text="Subir documento"
                />
                <Button
                  className="w-36 h-10 text-white text-xs"
                  text="Utilizar plantilla"
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DateCalendar
                      {...field}
                      value={selectedDate}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        setSelectedDate(newValue);
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="flex justify-evenly">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray text-gray-700 hover:bg-custom-dark-gray w-36 h-10"
            />
            <Button
              text="Crear"
              className="w-36 h-10 text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
