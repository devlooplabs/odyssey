import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Suspense } from "react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Alta Linguagem TV",
  description: "Assista a conteúdos exclusivos do seu programa favorito!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/images/logo-32x32.png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/images/logo-180x180.png"
          sizes="180x180"
        />
      </head>
      <body className={`${poppins.variable} antialiased bg-background`}>
        <Suspense fallback={<div>loading...</div>}>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            // enableSystem
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
