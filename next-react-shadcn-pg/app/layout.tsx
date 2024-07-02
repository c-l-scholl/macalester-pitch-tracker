import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Auth } from "@/components/auth";
import Header from "@/components/header";
import { FSData } from "@/components/FSData";
import { SimpleTrack } from "@/components/SimpleTrack";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macalester Pitching App",
  description: "Created by Camden Scholl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
