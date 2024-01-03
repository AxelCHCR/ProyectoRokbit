"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import UserController from '../../../../backend/controllers/UserController';

export default function Home() {
  const { user, logout } = useAuth();
  const [ role, setRole ]  = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await UserController.get("http://localhost:4000/api/getUser", { params: { email: user.email } });
      setRole(response.role);
    };
    fetchData();
  }, [role]);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  const profile = async () => {
    try {
      router.push("/pages/userProfile");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <><div>Main page</div>
    <div className='flex space-x-4'>
      <button onClick={handleSignOut}>Sign out</button>
      <button onClick={profile}>See Profile</button>
      <button onClick={() => router.push("/pages/disponibility")}>Disponibility</button>
      <button onClick={() => router.push("/pages/notifications")}>Notifications</button>
      {role === 'User' && ( // Validación del rol de Admin para mostrar el botón
        <button onClick={() => {
          alert("User button clicked");
        }}>User Button</button>
      )}
    </div></>
  );
}