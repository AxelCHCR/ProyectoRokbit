"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@/app/components/inputs";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import UserController from "../../../../backend/controllers/UserController";
import AvailabilitiesController from "../../../../backend/controllers/AvailabilitiesController";

type FormData = {
  notificaciones: string;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  domingo: boolean;
};

export default function Disponibility() {
  const disponibilitySchema = z.object({
    notificaciones: z.string({
      invalid_type_error: "Debe seleccionar una opción",
    }),
    lunes: z.boolean().optional(),
    martes: z.boolean().optional(),
    miercoles: z.boolean().optional(),
    jueves: z.boolean().optional(),
    viernes: z.boolean().optional(),
    sabado: z.boolean().optional(),
    domingo: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(disponibilitySchema),
  });

  const { user } = useAuth();
  const router = useRouter();

  const submitData = async (data: FormData) => {
    let notifications = data['notificaciones'] === "si";
    console.log(notifications);
    const daysOfWeek = Object.keys(data).filter(key => key !== 'notificaciones');
    const finalData = [{ ...daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: data[day] }), {}) }];
    await AvailabilitiesController.update("http://localhost:4000/api/availability", { email: user.email, availables: finalData });
    await UserController.update("http://localhost:4000/api/userAvailabilityStatus", { email: user.email, allowAvailability: notifications });
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await UserController.getAvailable("http://localhost:4000/api/userAvailability", { params: { email: user.email } })
      setValue('notificaciones', response ? "si" : "no");
      const days = await AvailabilitiesController.get("http://localhost:4000/api/availability", { params: { email: user.email } });
      const daysOfWeek = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
      daysOfWeek.forEach((day: string) => {
        setValue(day, days.availables[0][day]);
      });
    };
    fetchData();
  }, [setValue]);

  const watchValue = watch();

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Gestiona tu disponibilidad</h1>
        <h2 className="font-poppins font-light text-base mt-12">
          ¿Deseas recibir invitaciones a reuniones?
        </h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex items-center mt-4">
            <Input type="radio" value="si" {...register("notificaciones")} />
            <label className="font-poppins font-light">Sí</label>
          </div>
          <div className="flex items-center mt-4">
            <Input type="radio" value="no" {...register("notificaciones")} />
            <label className="font-poppins font-light">No</label>
          </div>

          <h3 className="font-poppins font-light text-base mt-12">
            Seleccione los días que desea recibir invitaciones
          </h3>

          <div className="flex justify-start mb-4">
            {["lunes", "martes", "miercoles", "jueves"].map((day) => (
              <FormControlLabel
                key={day}
                control={<Checkbox {...register(day as keyof FormData)} checked={!!watchValue[day as keyof FormData]} />}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
              />
            ))}
          </div>
          <div className="flex justify-start">
            {["viernes", "sabado", "domingo"].map((day) => (
              <FormControlLabel
                key={day}
                control={<Checkbox {...register(day as keyof FormData)} checked={!!watchValue[day as keyof FormData]} />}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                className=""
              />
            ))}
          </div>

          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray text-gray-700 hover:bg-custom-dark-gray w-36 h-10"
              onClick={() => router.push("/pages/dashboard")}
            />
            <Button
              text="Guardar cambios"
              type="submit"
              className="w-40 h-10 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
