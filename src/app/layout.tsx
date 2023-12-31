"use client";
import "./globals.css";
import { poppins } from "@/utils/fonts";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/protected";
import { usePathname } from "next/navigation";

const noAuthRequired = ["/", "/pages/register", "/pages/recoverPassword"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthRequired = !noAuthRequired.includes(usePathname());
  return (
    <html lang="en">
      <body className={`${poppins}`}>
        <AuthContextProvider>
          {isAuthRequired ? (
            <ProtectedRoute>{children}</ProtectedRoute>
          ) : (
            children
          )}
        </AuthContextProvider>
      </body>
    </html>
  );
}
