"use client";
// import React, { useState } from "react";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";

export default function Home() {
  // const [nombre, setNombre] = useState("");
  // const [apellido, setApellido] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [edad, setEdad] = useState("");
  // const [rol, setRol] = useState("");

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-poppins font-bold text-4xl">Regístrate</h1>
        <h2 className="font-poppins font-light text-base">
          Es rápido y fácil.
        </h2>
        <form>
          <div className="flex flex-col space-y-1">
            <div className="flex">
              <div className="mr-1">
                <Input placeholder="Nombre" />
              </div>
              <div>
                <Input placeholder="Apellido" />
              </div>
            </div>
            <Input placeholder="Correo electrónico" className="w-[20.25rem]" />
            <Input placeholder="Contraseña" className="w-[20.25rem]" />
            <div className="flex">
              <div className="mr-1">
                <Input placeholder="Edad" />
              </div>
              <div>
                <Input placeholder="Rol" />
              </div>
            </div>
          </div>
        </form>
        <div className="text-center">
          <Button text="Registrarse" className="mt-7" />
        </div>
      </div>
    </div>
  );
}
