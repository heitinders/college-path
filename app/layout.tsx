import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegePath - Your College Journey Starts Here",
  description: "A longitudinal college-readiness platform for high school students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-4.5rem)] bg-gradient-to-b from-background via-background to-muted/20">
          {children}
        </main>
      </body>
    </html>
  );
}
