import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { RouteLoaderOverlay } from "@/components/route-loader-overlay";
import { CustomContextMenu } from "@/components/custom-context-menu";

const SITE_TITLE = "Rahul Panchal — Senior Software Engineer · Node.js, NestJS, Python AI";
const SITE_DESC =
  "Senior Software Engineer with 6+ years building scalable Node.js & NestJS systems, MERN stack apps, and Python-powered AI agents with LangChain, LangGraph, CrewAI, RAG pipelines, and LLM APIs. Based in India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Rahul Panchal",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: "Rahul Panchal", url: SITE_URL }],
  creator: "Rahul Panchal",
  publisher: "Rahul Panchal",
  keywords: [
    "Rahul Panchal",
    "Senior Software Engineer",
    "NestJS Developer",
    "Node.js Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "AI Engineer",
    "LangChain",
    "LangGraph",
    "CrewAI",
    "LlamaIndex",
    "Python",
    "FastAPI",
    "AI Agents",
    "RAG",
    "LLM",
    "Full Stack Engineer India",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    creator: "@rrahulppanchal",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
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
        <RouteLoaderOverlay />
        <CustomContextMenu />
        {children}
      </body>
    </html>
  );
}
