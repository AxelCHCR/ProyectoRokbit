"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type formData = {
  correo: string;
};

export default function RecoverPassword() {
  const recoverPasswordSchema: ZodType<formData> = z.object({
    correo: z.string().email({ message: "Correo electrónico inválido" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const submitData = (data: formData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Recuperar tu cuenta</h1>
        <h2 className="font-poppins font-light text-base mt-12">
          Ingresa tu correo electrónico para buscar tu cuenta.
        </h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="Correo electrónico"
              {...register("correo")}
              autoComplete="off"
              className="w-[26rem] mt-4"
            />
            {errors.correo && (
              <span className="text-red-500">{errors.correo.message}</span>
            )}
          </div>

          <div className="flex justify-evenly mt-6">
            <Button
              text="Cancelar"
              className="bg-custom-light-gray text-custom-darker-gray hover:bg-custom-dark-gray"
            />
            <Button text="Aceptar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
