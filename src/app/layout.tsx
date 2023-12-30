"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/utils/fonts";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/protected";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Colibri",
// };

const noAuthRequired = ["/", "/pages/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
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
