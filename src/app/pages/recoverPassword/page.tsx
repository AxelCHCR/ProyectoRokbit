"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

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

  const { resetPassword } = useAuth();
  const router = useRouter();

  const submitData = async (data: formData) => {
    console.log(data.correo);
    try {
      await resetPassword(data.correo);
      //Colocar el popup de que se envió el correo
      alert("Revisa tu correo electrónico");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
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
              className="bg-custom-light-gray text-gray-700 hover:bg-custom-dark-gray w-36 h-10"
              type="button"
              onClick={() => router.push("/")}
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
