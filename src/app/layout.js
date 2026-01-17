import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Romeo Lagarto | Full Stack Engineer",
  description: "Full Stack Developer with expertise in Next.js, React, Supabase, Vue.js, Laravel, and CI/CD. Building scalable modern applications using JAMstack and serverless architectures.",
  keywords: "Full Stack Developer, React, Next.js, Vue.js, Supabase, Laravel, CI/CD, Web Developer, Romeo Lagarto",
  authors: [{ name: "Romeo Lagarto" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Romeo Lagarto | Full Stack Engineer",
    description: "Full Stack Developer with expertise in modern web technologies",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
