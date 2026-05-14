import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { RouteLoaderOverlay } from "@/components/route-loader-overlay";
import { CustomContextMenu } from "@/components/custom-context-menu";

const SITE_TITLE = "Rahul Panchal — Senior Software Engineer & Automation Consultant · AI · NestJS · Cloud";
const SITE_DESC =
  "6+ years building scalable Node.js & NestJS systems, MERN apps, and Python-powered AI agents with LangChain, LangGraph, CrewAI, RAG pipelines, and LLM APIs. Now partnering with businesses to ship automation that cuts costs, kills repetitive work, and unlocks growth. 20+ production builds · ~65% avg ops cost cut. India · Remote.";

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
    "Automation Consultant",
    "Independent Automation Engineer",
    "Business Automation",
    "AI Automation",
    "Cloud Engineering",
    "Cloud Infrastructure",
    "Cloud Architect",
    "DevOps",
    "Infrastructure as Code",
    "Terraform",
    "Kubernetes",
    "Serverless",
    "CI/CD",
    "System Design",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Microservices Architecture",
    "Scalability",
    "Observability",
    "Performance Engineering",
    "API Design",
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
    "Workflow Automation",
    "n8n",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('rhl.theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:wght@400;600&display=swap"
        />
      </head>
      <body className="antialiased">
        <RouteLoaderOverlay />
        <CustomContextMenu />
        {children}
      </body>
    </html>
  );
}
