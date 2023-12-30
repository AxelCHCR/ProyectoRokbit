"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuth } from '@/app/context/AuthContext'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}