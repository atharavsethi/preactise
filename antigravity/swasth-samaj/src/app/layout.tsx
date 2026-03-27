import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

import { CardNav } from "@/components/ui/CardNav";
import { BubbleMenu } from "@/components/ui/BubbleMenu";
import { Providers } from "@/components/Providers";

import FactCheckFAB from "@/components/ui/FactCheckFAB";

export const metadata: Metadata = {
  title: "Swasth Samaj - A Healthy Society",
  description: "A trusted platform connecting people with verified medical professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Providers>
          <CardNav />
          <main className="main-content">
            {children}
          </main>
          <FactCheckFAB />
          <BubbleMenu />
        </Providers>
      </body>
    </html>
  );
}
