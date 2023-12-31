"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type FormData = {
  horas: number;
  notificaciones: string;
};

export default function notifications() {
  const notificationsSchema: ZodType<FormData> = z.object({
    horas: z.number().min(1, { message: "Debe ser al menos 1 hora" }),
    notificaciones: z.enum(["si", "no"], {
      invalid_type_error: "Debe seleccionar una opción",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(notificationsSchema),
  });

  const submitData = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Notificaciones</h1>
        <h2 className="font-poppins font-light text-base mt-12">
          ¿Deseas recibir notificaciones?
        </h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex items-center mt-4">
            <Input type="radio" value="si" {...register("notificaciones")} />
            <label>Sí</label>
          </div>
          <div className="flex items-center mt-4">
            <Input type="radio" value="no" {...register("notificaciones")} />
            <label>No</label>
          </div>
          <h3 className="font-poppins font-light text-base mt-12">
            ¿Cuánto antes desea recibir un recordatorio de la reunión?
          </h3>
          <div className="flex flex-col mt-6 items-center justify-center">
            <Input
              type="number"
              placeholder="Horas"
              className="w-48"
              {...register("horas")}
              min={1}
            />
            {errors.horas && (
              <span className="text-red-500">{errors.horas.message}</span>
            )}
          </div>
          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray text-gray-700 hover:bg-custom-dark-gray w-36 h-10"
            />
            <Button
              text="Aceptar"
              type="submit"
              className="w-36 h-10 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
