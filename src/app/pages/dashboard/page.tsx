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
  }
  const profile = async () => {
    try {
      router.push("/pages/userProfile");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <><div>Main page</div><div>
      <button onClick={handleSignOut}>Sign out</button>
      <button onClick={profile}>See Profile</button>
    </div></>
  );
}