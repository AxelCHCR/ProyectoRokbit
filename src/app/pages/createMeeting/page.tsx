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

type MeetingFormData = {
  titulo: string;
  tipo: string;
  horaInicio: string;
  horaFin: string;
  prioridad: string;
  esRecurrente: string;
  fechaReunion: Date;
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
    titulo: z.string().min(1, { message: "El título es requerido" }),
    tipo: z.enum(["interna", "externa"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
    horaInicio: validateTimeFormat,
    horaFin: validateTimeFormat,
    prioridad: z.enum(["alta", "medio", "baja"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
    esRecurrente: z.enum(["si", "no"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
  })
  .refine((data) => data.horaInicio !== data.horaFin, {
    message: "La hora de inicio y fin no pueden ser iguales",
    path: ["horaFin"],
  })
  .refine(
    (data) => {
      const inicioEnMinutos = convertTimeToMinutes(data.horaInicio);
      const finEnMinutos = convertTimeToMinutes(data.horaFin);
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

  const submitMeetingData = (data: MeetingFormData) => {
    const formattedDate = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : null;

    const fullData = {
      ...data,
      fechaReunion: formattedDate,
    };

    console.log("Datos completos de la reunión: ", fullData);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Crea tu reunión</h1>
        <form onSubmit={handleSubmit(submitMeetingData)}>
          <div className="flex mt-4">
            <div className="flex flex-col mt-2 space-y-1">
              <Input placeholder="Título" {...register("titulo")} />
              {errors.titulo && (
                <span className="text-red-500">{errors.titulo.message}</span>
              )}

              <select
                {...register("tipo")}
                className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
              >
                <option disabled>Tipo</option>
                <option value="interna">Reunión interna</option>
                <option value="externa">Reunión externa</option>
              </select>
              {errors.tipo && (
                <span className="text-red-500">{errors.tipo.message}</span>
              )}

              <Input
                type="time"
                placeholder="Hora de inicio"
                {...register("horaInicio")}
              />
              {errors.horaInicio && (
                <span className="text-red-500">
                  {errors.horaInicio.message}
                </span>
              )}

              <Input
                type="time"
                placeholder="Hora de fin"
                {...register("horaFin")}
              />
              {errors.horaFin && (
                <span className="text-red-500">{errors.horaFin.message}</span>
              )}

              <select
                {...register("prioridad")}
                className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
              >
                <option disabled>Prioridad</option>
                <option value="alta">Alta</option>
                <option value="medio">Media</option>
                <option value="baja">Baja</option>
              </select>
              {errors.prioridad && (
                <span className="text-red-500">{errors.prioridad.message}</span>
              )}

              <select
                {...register("esRecurrente")}
                className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
              >
                <option disabled>¿Es recurrente?</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {errors.esRecurrente && (
                <span className="text-red-500">
                  {errors.esRecurrente.message}
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
                  name="fechaReunion"
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
