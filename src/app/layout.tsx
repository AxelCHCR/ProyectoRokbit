import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/utils/fonts";

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
      <body className={`${poppins}`}>{children}</body>
    </html>
  );
}
