import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-playfair",
    display: "swap",
});

export default function FontProvider({ children }) {
    return (
        <div className={`${montserrat.variable} ${playfair.variable}`}>
            {children}
        </div>
    );
}
