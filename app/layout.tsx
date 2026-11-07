import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Hernia Consultation with Dr. Preethi Mrinalini - Understand Your Condition Before It Worsens",
  description:
    "A bulge, heaviness, or post-pregnancy bulge that won't go away? Book a detailed hernia and diastasis recti assessment with Dr. Preethi Mrinalini , Advanced Laparoscopic Surgeon. Consultation Rs.800.",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dxntva1vn/image/upload/v1794027007/Marina-logo_tjcywr.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dxntva1vn/image/upload/v1794027007/Marina-logo_tjcywr.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple:
      "https://res.cloudinary.com/dxntva1vn/image/upload/v1794027007/Marina-logo_tjcywr.png",
  },

  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
