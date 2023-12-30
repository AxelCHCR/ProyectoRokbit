"use client"
import React from 'react';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  console.log(user);
  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <><div>Main page</div><div>
      <button onClick={handleSignOut}>Sign out</button>
    </div></>
  );
}