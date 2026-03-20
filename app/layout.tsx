import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rahul Panchal",
    template: "%s | Rahul Panchal",
  },
  description: "Senior Software Developer specializing in Node.js, NestJS, MERN stack, and AI/LLM applications. Based in India.",
  keywords: ["Rahul Panchal", "Senior Software Developer", "NestJS", "Node.js", "React", "Full Stack", "AI", "LangChain"],
  authors: [{ name: "Rahul Panchal", url: "https://rahul-panchal.vercel.app" }],
  creator: "Rahul Panchal",
};

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
