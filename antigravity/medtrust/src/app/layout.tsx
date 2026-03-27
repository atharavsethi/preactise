import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CardNav } from "@/components/ui/CardNav";
import { BubbleMenu } from "@/components/ui/BubbleMenu";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MedTrust | Real Answers. Verified Doctors.",
  description: "A trusted community where medical professionals answer your health questions. Designed to reduce health misinformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <AuthProvider>
          <CardNav />
          {children}
          <BubbleMenu />
        </AuthProvider>
      </body>
    </html>
  );
}
