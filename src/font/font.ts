// app/layout.tsx or a separate font file e.g., fonts.ts
import { Montserrat, Orbitron, Oswald, Raleway } from "next/font/google";

export const orbitron = Orbitron({
    subsets: ["latin"],  // Optional: reduce size
    weight: ["400", "700"], // Optional
    display: "swap", // Optional
});


export const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: "swap", // Optional
})


export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: "swap", // Optional
})



export const oswald = Oswald({  
    subsets: ['latin'],
    weight: ['400', '700'],
    display: "swap", // Optional
})
