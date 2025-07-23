import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service de Hornos de Cerámica en CABA, Zona Norte y Pilar | AEG Hornos",
  description:
    "Especialistas en reparación, mantenimiento e instalación de hornos de cerámica en CABA, Zona Norte (Pilar, San Isidro, Vicente López, Tigre, Escobar, San Fernando, Martínez, Olivos, Belgrano, Palermo, Recoleta, Núñez, Colegiales, Saavedra, Villa Urquiza, Villa Crespo, Caballito, Almagro, Retiro, Microcentro, y más). Técnicos certificados, repuestos originales y garantía escrita. ¡Solicitá tu diagnóstico!",
  keywords: [
    "service de hornos de cerámica",
    "reparación de hornos de cerámica",
    "técnicos hornos CABA",
    "mantenimiento hornos cerámicos",
    "instalación hornos cerámica",
    "AEG hornos Buenos Aires",
    "service hornos Pilar",
    "service hornos Zona Norte",
    "service hornos San Isidro",
    "service hornos Vicente López",
    "service hornos Tigre",
    "service hornos Escobar",
    "service hornos San Fernando",
    "service hornos Martínez",
    "service hornos Olivos",
    "service hornos Belgrano",
    "service hornos Palermo",
    "service hornos Recoleta",
    "service hornos Núñez",
    "service hornos Colegiales",
    "service hornos Saavedra",
    "service hornos Villa Urquiza",
    "service hornos Villa Crespo",
    "service hornos Caballito",
    "service hornos Almagro",
    "service hornos Retiro",
    "service hornos Microcentro"
  ],
  openGraph: {
    title: "Service de Hornos de Cerámica en CABA, Zona Norte y Pilar | AEG Hornos",
    description:
      "Reparación, mantenimiento e instalación profesional de hornos de cerámica en CABA, Zona Norte y Pilar. Técnicos certificados, repuestos originales y garantía escrita. Atención en San Isidro, Vicente López, Tigre, Escobar, San Fernando, Martínez, Olivos, Belgrano, Palermo, Recoleta, Núñez, Colegiales, Saavedra, Villa Urquiza, Villa Crespo, Caballito, Almagro, Retiro, Microcentro y más.",
    url: "https://hornos-aeg.netlify.app/",
    siteName: "AEG Hornos Service",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/hornos/horno1.jpg",
        width: 1200,
        height: 630,
        alt: "Service de hornos de cerámica en CABA y Zona Norte"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Service de Hornos de Cerámica en CABA, Zona Norte y Pilar | AEG Hornos",
    description:
      "Reparación, mantenimiento e instalación profesional de hornos de cerámica en CABA, Zona Norte y Pilar. Técnicos certificados, repuestos originales y garantía escrita.",
    images: [
      "/hornos/horno1.jpg"
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
