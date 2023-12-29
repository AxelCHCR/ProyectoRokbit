"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type formData = {
  contrasena: string;
  nuevaContrasena: string;
  confirmarContrasena: string;
};

export default function ChangePassword() {
  const changePasswordSchema: ZodType<formData> = z
    .object({
      contrasena: z.string().min(1, { message: "La contraseña es requerida" }),
      nuevaContrasena: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
      confirmarContrasena: z
        .string()
        .min(8, { message: "La confirmación de contraseña es requerida" }),
    })
    .refine((data) => data.nuevaContrasena === data.confirmarContrasena, {
      message: "Las contraseñas deben coincidir",
      path: ["confirmarContrasena"],
    })
    .refine(
      (data) =>
        /[A-Z]/.test(data.nuevaContrasena) &&
        /[0-9]/.test(data.nuevaContrasena),
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
    resolver: zodResolver(changePasswordSchema),
  });

  const submitData = (data: formData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">
          Cambia tu contraseña
        </h1>

        <h2 className="font-poppins font-light text-base">Contraseña actual</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col">
            <Input
              type="password"
              placeholder="Contraseña actual"
              {...register("contrasena")}
              autoComplete="off"
              className="w-[26rem] mt-4"
            />
            {errors.contrasena && (
              <span className="text-red-500">{errors.contrasena.message}</span>
            )}
          </div>

          <div className=" mt-4">
            <p className="font-poppins font-light text-base">
              Nueva contraseña
            </p>
          </div>

          <div className="flex flex-col mt-4">
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("nuevaContrasena")}
              autoComplete="off"
              className="w-[26rem]"
            />
            {errors.nuevaContrasena && (
              <span className="text-red-500">
                {errors.nuevaContrasena.message}
              </span>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              {...register("confirmarContrasena")}
              autoComplete="off"
              className="w-[26rem]"
            />
            {errors.confirmarContrasena && (
              <span className="text-red-500">
                {errors.confirmarContrasena.message}
              </span>
            )}
          </div>

          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray hover:bg-custom-dark-gray text-gray-700"
            />
            <Button text="Aceptar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
