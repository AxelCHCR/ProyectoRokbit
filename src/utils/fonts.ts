import { Poppins } from "next/font/google";


const poppins_init = Poppins({
    subsets: ["latin"],
    weight: ["300", "600", "700"],
    variable: "--font-poppins",
  });

export const poppins = poppins_init.variable;