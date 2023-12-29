import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/utils/fonts";
import { AuthContextProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Colibri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins}`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
