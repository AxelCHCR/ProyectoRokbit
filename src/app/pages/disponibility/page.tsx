"use client";
import React from "react";
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@/app/components/inputs";

type FormData = {
  notificaciones: "si" | "no";
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
    notificaciones: z.enum(["si", "no"], {
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
  } = useForm<FormData>({
    resolver: zodResolver(disponibilitySchema),
  });

  const submitData = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Notificaciones</h1>
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
                control={<Checkbox {...register(day)} />}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
              />
            ))}
          </div>
          <div className="flex justify-start">
            {["viernes", "sabado", "domingo"].map((day) => (
              <FormControlLabel
                key={day}
                control={<Checkbox {...register(day)} />}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                className=""
              />
            ))}
          </div>

          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray text-gray-700 hover:bg-custom-dark-gray w-36 h-10"
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
