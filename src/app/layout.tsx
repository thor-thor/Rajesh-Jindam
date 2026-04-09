import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajesh Jindam | Full Stack Developer & AI Engineer",
  description:
    "Full Stack Engineer specialising in Python, React, Node.js, and AI-powered applications. Crafting scalable digital products that solve real problems.",
  keywords: [
    "Rajesh Jindam",
    "Full Stack Developer",
    "Python Developer",
    "React Developer",
    "AI Engineer",
    "Next.js",
    "TalentSphere",
    "IoT Dashboard",
  ],
  authors: [{ name: "Rajesh Jindam" }],
  openGraph: {
    title: "Rajesh Jindam | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Engineer specialising in Python, React, Node.js, and AI-powered applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}