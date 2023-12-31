"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

type formData = {
  email: string;
  password: string;
};

export default function Login() {
  const loginSchema: ZodType<formData> = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(loginSchema),
  });

  const { user, login } = useAuth();
  console.log(user);
  const router = useRouter();

  const submitData = async (data: formData) => {
    try {
      await login(data.email, data.password);
      router.push("./pages/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="flex items-center justify-center font-poppins font-bold text-4xl">
          Colibrí
        </h1>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col">
              <label className="font-poppins font-bold text-sm mt-12 mb-4">
                Correo
              </label>
              <Input
                type="email"
                placeholder="Correo electrónico"
                className="w-96"
                {...register("email")}
                autoComplete="off"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-poppins font-bold text-sm mt-7 mb-4">
                Contraseña
              </label>
              <Input
                type="password"
                placeholder="Contraseña"
                className="w-96"
                {...register("password")}
                autoComplete="off"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <Link href="pages/register">
              <div className="text-sm font-bold font-poppins">
                ¿Aún no tienes cuenta? Registrate
              </div>
            </Link>
            <Link href="pages/recoverPassword">
              <div className="text-sm font-bold font-poppins">
                Olvidé mi contraseña
              </div>
            </Link>
          </div>
          <div className="text-center">
            <Button
              text="Ingresar"
              className="mt-7 w-36 h-10 text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
