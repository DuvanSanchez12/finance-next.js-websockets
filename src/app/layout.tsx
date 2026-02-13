import type { Metadata } from "next";
import "../globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/footer";
import { TokenGuard } from "@/tokenGiard";
// Inter es limpia y muy legible para el cuerpo
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Space Grotesk tiene un toque futurista/tecnológico para títulos y logo
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Finance | Duvan",
  description: "Gestiona tu portafolio financiero en tiempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#0f172a]`}
      >
        <AuthProvider>
          <TokenGuard />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
