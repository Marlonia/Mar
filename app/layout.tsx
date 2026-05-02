import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://carnavalbarranquillautah.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Carnaval de Barranquilla en Utah | Academia de Danza Colombiana",
    template: "%s | Carnaval de Barranquilla Utah",
  },
  description:
    "Aprende Cumbia, Mapalé, Garabato, Champeta, Salsa, Son de Negro, Bullerengue, Urbano y Marimondas con la única academia auténtica del Carnaval de Barranquilla en Utah. Clases para todos los niveles en West Valley City. ¡Inscríbete hoy!",
  keywords: [
    "carnaval de barranquilla utah",
    "academia de danza colombiana utah",
    "clases de cumbia utah",
    "clases de mapalé utah",
    "clases de champeta utah",
    "clases de salsa utah",
    "clases de bullerengue",
    "clases de son de negro",
    "danza urbana latina utah",
    "danza colombiana west valley",
    "danza tradicional colombiana",
    "academia danza salt lake city",
    "cumbia salt lake city",
    "salsa salt lake city",
    "champeta colombiana",
    "marimonda utah",
    "marimondas danza",
    "garabato danza",
    "son de negro danza",
    "bullerengue colombiano",
    "carnaval barranquilla",
    "danza folklórica colombiana",
    "danza afro-colombiana",
    "danza caribeña",
    "Mayra Rincon",
    "Marilyn Gallardo",
    "danza latinoamericana utah",
    "clases de baile colombiano",
    "reggaetón clases utah",
    "danza urbana utah",
  ],
  authors: [{ name: "Mayra Rincón y Marilyn Gallardo" }],
  creator: "Carnaval de Barranquilla en Utah",
  publisher: "Carnaval de Barranquilla en Utah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
      "es-US": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["es_US", "en_US"],
    url: SITE_URL,
    siteName: "Carnaval de Barranquilla en Utah",
    title: "Carnaval de Barranquilla en Utah | Academia de Danza Colombiana",
    description:
      "Aprende las danzas auténticas del Carnaval de Barranquilla en Utah. Cumbia, Mapalé, Garabato y más. ¡Únete a la familia!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carnaval de Barranquilla en Utah - Academia de Danza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carnaval de Barranquilla en Utah",
    description:
      "Academia de danza colombiana en Utah. Cumbia, Mapalé, Garabato. ¡Inscríbete!",
    images: ["/og-image.jpg"],
    creator: "@carnavalbaq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "Education",
  classification: "Dance Academy",
  other: {
    "geo.region": "US-UT",
    "geo.placename": "West Valley City",
    "geo.position": "40.6916;-112.0011",
    "ICBM": "40.6916, -112.0011",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFC600" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1419" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD para Local Business + Dance School
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "DanceSchool", "EducationalOrganization"],
        "@id": `${SITE_URL}/#organization`,
        name: "Carnaval de Barranquilla en Utah",
        alternateName: ["Carnaval BA Utah", "Academia Carnaval Barranquilla"],
        description:
          "Academia de danza dedicada a preservar y promover las tradiciones del Carnaval de Barranquilla en Utah. Enseñamos Cumbia, Mapalé, Garabato y otras danzas folklóricas colombianas.",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: "512",
          height: "512",
        },
        image: `${SITE_URL}/og-image.jpg`,
        telephone: "+1-801-555-0000",
        email: "info@carnavalba.com",
        priceRange: "$$",
        founder: [
          {
            "@type": "Person",
            name: "Mayra Rincón",
            jobTitle: "Co-Fundadora e Instructora Principal",
          },
          {
            "@type": "Person",
            name: "Marilyn Gallardo",
            jobTitle: "Co-Fundadora e Instructora",
          },
        ],
        foundingDate: "2022",
        foundingLocation: "West Valley City, Utah",
        address: {
          "@type": "PostalAddress",
          addressLocality: "West Valley City",
          addressRegion: "UT",
          postalCode: "84119",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.6916,
          longitude: -112.0011,
        },
        areaServed: [
          {
            "@type": "City",
            name: "West Valley City",
          },
          {
            "@type": "City",
            name: "Salt Lake City",
          },
          {
            "@type": "City",
            name: "West Jordan",
          },
          {
            "@type": "State",
            name: "Utah",
          },
        ],
        sameAs: [
          "https://www.instagram.com/carnavalbaq",
          "https://www.facebook.com/carnavaldebarranquillautah",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Wednesday"],
            opens: "19:00",
            closes: "20:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Tuesday", "Thursday"],
            opens: "20:00",
            closes: "21:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "17:00",
            closes: "18:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Clases de Danza Colombiana",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Cumbia",
                description: "Aprende los pasos básicos de la Cumbia, la danza más tradicional del Carnaval de Barranquilla.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Mapalé",
                description: "Ritmo afro-colombiano libre y energético. Para estudiantes con experiencia previa.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Garabato",
                description: "Aprende la danza folklórica del Garabato con coreografía fluida.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Champeta",
                description: "Ritmo afro-caribeño nacido en Cartagena con movimientos sensuales y energéticos.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Salsa",
                description: "El ritmo más popular de Latinoamérica con pasos elegantes y energía contagiosa.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Son de Negro",
                description: "Danza ancestral afro-colombiana con tambores, máscaras y profunda raíz cultural.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Bullerengue",
                description: "Ritmo de tambor y voz femenina, esencia auténtica del Caribe colombiano.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Danza Urbana",
                description: "Reggaetón, dancehall y estilos modernos. La fusión del Caribe con lo contemporáneo.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Marimondas",
                description: "La danza del personaje icónico del Carnaval de Barranquilla.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Danza para Niños 5-12 años",
                description: "Clases divertidas y dinámicas para niños donde aprenden a través del movimiento y la música.",
                provider: { "@id": `${SITE_URL}/#organization` },
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "47",
          bestRating: "5",
          worstRating: "1",
        },
        knowsAbout: [
          "Cumbia",
          "Mapalé",
          "Garabato",
          "Champeta",
          "Salsa",
          "Son de Negro",
          "Bullerengue",
          "Danza Urbana",
          "Marimondas",
          "Carnaval de Barranquilla",
          "Danza Folklórica Colombiana",
          "Cultura Caribeña Colombiana",
          "Reggaetón",
          "Dancehall",
        ],
        memberOf: {
          "@type": "Organization",
          name: "Comunidad Hispana de Utah",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Carnaval de Barranquilla en Utah",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "es-CO",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-carnival-darkBg text-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
