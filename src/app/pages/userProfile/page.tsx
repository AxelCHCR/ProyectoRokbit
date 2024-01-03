"use client";

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import UserController from "../../../../backend/controllers/UserController";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

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
    setValue,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(profileSchema),
  });

  const { user, resetPassword } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await UserController.get("http://localhost:4000/api/getUser", { params: { email: user.email } });
      // await UserController.updateEmail("http://localhost:4000/api/userEmail", { email: response.email, newEmail: user.email })
      setValue("nombre", response.name);
      setValue("apellido", response.lastName);
      setValue("correo", user.email);
      setValue("edad", response.age);
      setValue("rol", response.role);
    };
    fetchData();
  }, [setValue]);

  const changePassword = async () => {
    try {
      await resetPassword(user.email);
      //Colocar el popup de que se envió el correo
      alert("Revisa tu correo electrónico");
    } catch (error) {
      console.log(error);
    }
  };


  const [profileImage, setProfileImage] = useState(
    "/static/images/avatar/1.jpg"
  );

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const submitData = async (data: formData) => {
    // Aquí puedes manejar la subida de datos del formulario junto con la imagen de perfil
    const response = await UserController.update("http://localhost:4000/api/users", {
      name: data.nombre,
      lastName: data.apellido,
      email: user.email,
      age: data.edad,
      role: data.rol,
    });
    if (response.result === true) {
      // alert("Perfil actualizado");
      console.log("Perfil actualizado");
      // router.push("/pages/dashboard");
    }
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
          <div className="text-sm font-bold font-poppins mt-5 text-center cursor-pointer"
            onClick={changePassword}
          >
            Cambiar contraseña
          </div>
          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray hover:bg-custom-dark-gray text-gray-600 w-36 h-10"
              onClick={() => router.push("/pages/dashboard")}
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
