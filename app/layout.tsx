import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Carnaval de Barranquilla en Utah - Academia de Danza",
  description: "Bienvenido a Carnaval de Barranquilla en Utah. Aprende las danzas tradicionales del carnaval colombiano más grande del mundo.",
  keywords: "danza, carnaval, barranquilla, utah, cumbia, colombiano",
  authors: [{ name: "Carnaval de Barranquilla en Utah" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FFD700",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-carnival-darkBg">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
