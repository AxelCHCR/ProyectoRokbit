"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type formData = {
  nombre: string;
  apellido: string;
  correo: string;
  edad: number;
  rol: string;
};

export default function Register() {
  const profileSchema: ZodType<formData> = z.object({
    nombre: z.string({ invalid_type_error: "El nombre debe ser un texto" }),
    apellido: z.string({ invalid_type_error: "El apellido debe ser un texto" }),
    correo: z.string().email({ message: "Correo electrónico inválido" }),
    edad: z.number({ invalid_type_error: "La edad debe ser un número" }),
    rol: z.string({ invalid_type_error: "El rol debe ser un texto" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(profileSchema),
  });

  const [profileImage, setProfileImage] = useState(
    "/static/images/avatar/1.jpg"
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const submitData = async (data: formData) => {
    console.log(data);
    // Aquí puedes manejar la subida de datos del formulario junto con la imagen de perfil
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Tu perfil</h1>
        <Stack
          direction="row"
          spacing={2}
          className="flex m-4 items-center font-poppins font-light text-sm"
        >
          <Avatar alt="Perfil" src={profileImage} />
          <label htmlFor="image-upload" className="cursor-pointer">
            Cambiar imagen
          </label>
          <input
            type="file"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </Stack>
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
            <div className="flex">
              <div className="flex flex-col mr-1">
                <Input
                  type="number"
                  placeholder="Edad"
                  {...register("edad", { valueAsNumber: true })}
                  autoComplete="off"
                  min={1}
                />
                {errors.edad && (
                  <span className="text-red-500">{errors.edad.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Rol"
                  {...register("rol")}
                  autoComplete="off"
                />
                {errors.rol && (
                  <span className="text-red-500">{errors.rol.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-sm font-bold font-poppins mt-5 text-center">
            Cambiar contraseña
          </div>
          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray hover:bg-custom-dark-gray text-gray-600 w-36 h-10"
            />
            <Button
              text="Aceptar"
              type="submit"
              className="text-white w-36 h-10"
            />
          </div>
        </form>
      </div>
    </div>
  );
}