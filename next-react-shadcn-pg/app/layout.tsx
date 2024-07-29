import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { AuthUserProvider } from "@/firebase/auth";

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
      <body className={inter.className}>
        <AuthUserProvider>
          <Header/>
          {children}
          <Toaster/>
        </AuthUserProvider>
      </body>
    </html>
  );
}
