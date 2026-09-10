import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KRONOS FITNESS FIELD | Kanpur's Premier Raw Iron Battleground",
  description:
    "No excuses. Raw iron, hardcore discipline, and relentless strength at KRONOS Fitness Field, 270 Bhawa Nagar, Sanigawan Rd, Kanpur. Open 5:00 AM - 10:00 PM.",
  keywords: [
    "KRONOS Fitness Field",
    "Kanpur Gym",
    "Hardcore Gym Kanpur",
    "Powerlifting Kanpur",
    "Bodybuilding Sanigawan Road",
    "Raw Iron Gym",
  ],
  authors: [{ name: "KRONOS Fitness Field" }],
  openGraph: {
    title: "KRONOS FITNESS FIELD | Forge Your Inner Titan",
    description: "Raw iron, hardcore discipline, and relentless strength in Kanpur.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${montserrat.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#f3f4f6] font-body antialiased selection:bg-[#facc15] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
