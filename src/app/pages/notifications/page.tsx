"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import UserController from "../../../../backend/controllers/UserController";
import ConfigurationsController from "../../../../backend/controllers/ConfigurationsController";

type FormData = {
  horas: number;
  notificaciones: string;
};

export default function notifications() {
  const {user} = useAuth();
  const router = useRouter();
  const notificationsSchema: ZodType<FormData> = z.object({
    horas: z.number().min(1, { message: "Debe ser al menos 1 hora" }),
    notificaciones: z.string({
      invalid_type_error: "Debe seleccionar una opción",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(notificationsSchema),
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await UserController.getNotified("http://localhost:4000/api/userNotification", { params: { email: user.email } });
      let notifications = response === true ? "si" : "no";
      setValue("notificaciones", notifications);
      const hours = await ConfigurationsController.get("http://localhost:4000/api/frequency", { params: { email: user.email } });
      setValue("horas", hours.frequency);
    };
    fetchData();
  }, [setValue]);

  const submitData = async (data: FormData) => {
    let notifications = data["notificaciones"] === "si";
    await ConfigurationsController.update("http://localhost:4000/api/frequency", { email: user.email, frequency: data.horas });
    await UserController.update("http://localhost:4000/api/userNotification", { email: user.email, allowNotifications: notifications });
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
            <label className="font-poppins font-light">Sí</label>
          </div>
          <div className="flex items-center mt-4">
            <Input type="radio" value="no" {...register("notificaciones")} />
            <label className="font-poppins font-light">No</label>
          </div>
          <h3 className="font-poppins font-light text-base mt-12">
            ¿Cuánto antes desea recibir un recordatorio de la reunión?
          </h3>
          <div className="flex flex-col mt-6 items-center justify-center">
            <Input
              type="number"
              placeholder="Horas"
              className="w-48"
              {...register("horas", { valueAsNumber: true })}
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
              onClick={() => router.push("/pages/dashboard")}
            />
            <Button
              text="Guadar cambios"
              type="submit"
              className="w-40 h-10 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
