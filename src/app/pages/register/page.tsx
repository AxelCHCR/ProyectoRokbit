"use client";
import React from "react";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { subYears, isAfter, isBefore } from 'date-fns';

import userController from "../../../../backend/controllers/UserController";
import ConfigurationsController from "../../../../backend/controllers/ConfigurationsController";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type formData = {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  fechaNacimiento: string;
  rol: string;
};

export default function Register() {
  const registrationSchema: ZodType<formData> = z
    .object({
      nombre: z.string().min(1, { message: "El nombre es requerido" }),
      apellido: z.string().min(1, { message: "El apellido es requerido" }),
      correo: z.string().email({ message: "Correo electrónico inválido" }),
      contrasena: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
      confirmarContrasena: z
        .string()
        .min(8, { message: "La confirmación de contraseña es requerida" }),
        fechaNacimiento: z
        .string()
        .refine((dateString) => {
          const parsedDate = new Date(dateString);
          const minDate = subYears(new Date(), 100); // Hace 100 años desde la fecha actual
          const maxDate = subYears(new Date(), 15); // Hace 15 años desde la fecha actual
          return isAfter(parsedDate, minDate) && isBefore(parsedDate, maxDate);
        }, {
          message: "La fecha de nacimiento no es válida",
        }),
      rol: z.enum(["Interno", "Colaborador", "Cliente"], {
        invalid_type_error: "Debe seleccionar una opción",
      }),
    })
    .refine((data) => data.contrasena === data.confirmarContrasena, {
      message: "Las contraseñas deben coincidir",
      path: ["confirmarContrasena"],
    })
    .refine(
      (data) => /[A-Z]/.test(data.contrasena) && /[0-9]/.test(data.contrasena),
      {
        message: "Requiere al menos una mayúscula y un número.",
        path: ["contrasena"],
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(registrationSchema),
  });

  const { signup } = useAuth();
  const router = useRouter();
  const submitData = async (data: formData) => {
    let parsedData = {
      name: data.nombre,
      lastName: data.apellido,
      email: data.correo,
      birthDate: data.fechaNacimiento,
      role: data.rol,
    };
    const response = await userController.register(
      "http://localhost:4000/api/users",
      parsedData
    );
    if (response) {
      await ConfigurationsController.create(
        "http://localhost:4000/api/availability",
        { email: parsedData.email }
      );
      await ConfigurationsController.create(
        "http://localhost:4000/api/frequency",
        { email: parsedData.email }
      );
      await signup(parsedData.email, data.contrasena);
      alert("Se registró correctamente.");
      router.push("/");
    } else {
      alert("Correo electrónico ya registrado.");
      console.log("Ocurrió un error al registrarse.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Regístrate</h1>
        <h2 className="font-poppins font-light text-base">
          Es rápido y fácil.
        </h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col space-y-1">
            <div className="flex">
              <div className="flex flex-col mr-1">
                <Input
                  type="text"
                  placeholder="Nombre"
                  {...register("nombre")}
                  autoComplete="off"
                />
                {errors.nombre && (
                  <span className="text-red-500">{errors.nombre.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="Apellido"
                  {...register("apellido")}
                  autoComplete="off"
                />
                {errors.apellido && (
                  <span className="text-red-500">
                    {errors.apellido.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <Input
                type="email"
                placeholder="Correo electrónico"
                className="w-[20.25rem]"
                {...register("correo")}
                autoComplete="off"
              />
              {errors.correo && (
                <span className="text-red-500">{errors.correo.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                type="password"
                placeholder="Contraseña"
                className="w-[20.25rem]"
                {...register("contrasena")}
                autoComplete="off"
              />
              {errors.contrasena && (
                <span className="text-red-500">
                  {errors.contrasena.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                type="password"
                placeholder="Confirmar contraseña"
                className="w-[20.25rem]"
                {...register("confirmarContrasena")}
                autoComplete="off"
              />
              {errors.confirmarContrasena && (
                <span className="text-red-500">
                  {errors.confirmarContrasena.message}
                </span>
              )}
            </div>

            <div className="flex">
              <div className="flex flex-col mr-1">
                <Input
                  type="date"
                  placeholder="Fecha de nacimiento"
                  {...register("fechaNacimiento")}
                  autoComplete="off"
                  min={1}
                />
                {errors.fechaNacimiento && (
                  <span className="text-red-500">{errors.fechaNacimiento.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <select
                  {...register("rol")}
                  className="border border-dark-gray focus:outline-none rounded-lg bg-custom-gray w-40 h-12 font-poppins font-light px-4"
                >
                  <option disabled>Rol</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Interno">Interno</option>
                  <option value="Colaborador">Colaborador</option>
                </select>
                {errors.rol && (
                  <span className="text-red-500">{errors.rol.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              text="Registrarse"
              className="mt-7 w-36 h-10 text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
