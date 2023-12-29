"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type formData = {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  edad: number;
  rol: string;
};

export default function Register() {
  const registrationSchema: ZodType<formData> = z
    .object({
      nombre: z.string().min(1, "El nombre es requerido"),
      apellido: z.string().min(1, "El apellido es requerido"),
      correo: z.string().email("Correo electrónico inválido"),
      contrasena: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
      confirmarContrasena: z
        .string()
        .min(8, "La confirmación de contraseña es requerida"),
      edad: z
        .number({ invalid_type_error: "La edad es requerida" })
        .min(0, "La edad no puede ser negativa")
        .max(120, "La edad máxima es 100"),

      rol: z.string().min(1, "El rol es requerido"),
    })
    .refine((data) => data.contrasena === data.confirmarContrasena, {
      message: "Las contraseñas deben coincidir",
      path: ["confirmarContrasena"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(registrationSchema),
  });

  const submitData = (data: formData) => {
    console.log(data);
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
          <div className="text-center">
            <Button text="Registrarse" className="mt-7" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
