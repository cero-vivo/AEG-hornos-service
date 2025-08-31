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
  title: {
    default: "Service/Reparación de Hornos de Cerámica en CABA, Zona Norte y Pilar | AEG Hornos",
    template: "%s | AEG Hornos Service"
  },
  description:
    "Especialistas en reparación, mantenimiento e instalación de hornos de cerámica en CABA, Zona Norte (Pilar, San Isidro, Vicente López, Tigre, Escobar, San Fernando, Martínez, Olivos, Belgrano, Palermo, Recoleta, Núñez, Colegiales, Saavedra, Villa Urquiza, Villa Crespo, Caballito, Almagro, Retiro, Microcentro, y más). Técnicos certificados, repuestos originales y garantía escrita. ¡Solicitá tu diagnóstico!",
  keywords: [
    "service de hornos de cerámica",
    "reparación de hornos de cerámica",
    "técnicos hornos de cerámica CABA",
    "mantenimiento hornos cerámicos",
    "instalación hornos cerámica",
    "AEG hornos de cerámica Buenos Aires",
    "service hornos de cerámica Pilar",
    "service hornos de cerámica Zona Norte",
    "service hornos de cerámica San Isidro",
    "service hornos de cerámica Vicente López",
    "service hornos de cerámica Tigre",
    "service hornos de cerámica Escobar",
    "service hornos de cerámica San Fernando",
    "service hornos de cerámica Martínez",
    "service hornos de cerámica Olivos",
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
    "service hornos Microcentro",
    "reparación hornos eléctricos",
    "service técnico hornos",
    "técnico hornos cerámica Buenos Aires",
    "arreglo hornos cerámica",
    "diagnóstico hornos cerámica",
    "repuestos hornos cerámica",
    "instalación profesional hornos",
    "mantenimiento preventivo hornos",
    "service urgente hornos",
    "técnico matriculado hornos",
    "empresa service hornos confiable"
  ],
  authors: [{ name: "AEG Hornos Service" }],
  creator: "AEG Hornos Service",
  publisher: "AEG Hornos Service",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here"
  },
  openGraph: {
    title: "Service de Hornos de Cerámica en CABA, Zona Norte y Pilar | AEG Hornos",
    description:
      "Reparación, mantenimiento e instalación profesional de hornos de cerámica en CABA, Zona Norte y Pilar. Técnicos certificados, repuestos originales y garantía escrita. Atención en San Isidro, Vicente López, Tigre, Escobar, San Fernando, Martínez, Olivos, Belgrano, Palermo, Recoleta, Núñez, Colegiales, Saavedra, Villa Urquiza, Villa Crespo, Caballito, Almagro, Retiro, Microcentro y más.",
    url: "https://reparacionhornosceramica.com",
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
  },
  alternates: {
    canonical: "https://reparacionhornosceramica.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AEG Hornos Service",
    "description": "Service técnico especializado en reparación, mantenimiento e instalación de hornos de cerámica en CABA, Zona Norte y Pilar",
    "url": "https://reparacionhornosceramica.com",
    "telephone": "+54-11-XXXX-XXXX",
    "email": "contacto@aeg-hornos.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicio a domicilio",
      "addressLocality": "Buenos Aires",
      "addressRegion": "CABA",
      "addressCountry": "AR",
      "areaServed": [
        "CABA",
        "Pilar",
        "San Isidro",
        "Vicente López",
        "Tigre",
        "Escobar",
        "San Fernando",
        "Martínez",
        "Olivos",
        "Belgrano",
        "Palermo",
        "Recoleta",
        "Núñez",
        "Colegiales",
        "Saavedra",
        "Villa Urquiza",
        "Villa Crespo",
        "Caballito",
        "Almagro",
        "Retiro",
        "Microcentro"
      ]
    },
    "serviceType": [
      "Reparación de hornos de cerámica",
      "Mantenimiento de hornos",
      "Instalación de hornos",
      "Diagnóstico técnico",
      "Service técnico"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Hornos de Cerámica",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reparación de Hornos de Cerámica",
            "description": "Reparación profesional de hornos de cerámica con técnicos certificados y repuestos originales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mantenimiento Preventivo",
            "description": "Mantenimiento preventivo para prolongar la vida útil de su horno de cerámica"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instalación Profesional",
            "description": "Instalación correcta y segura de hornos de cerámica nuevos"
          }
        }
      ]
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Efectivo, Transferencia bancaria, Mercado Pago",
    "sameAs": [
      "https://wa.me/+54-11-XXXX-XXXX",
      "https://www.instagram.com/aeg-hornos"
    ]
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
