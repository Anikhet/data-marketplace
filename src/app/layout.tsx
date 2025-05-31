import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { DashboardProvider } from "@/contexts/dashboard-context";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Marketplace",
  description: "Buy and sell high-quality business data lists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
   
          <DashboardProvider>
            <Navigation />
            <main className="flex min-h-screen flex-col">
              {children}
            </main>
            <Toaster />
          </DashboardProvider>
     
      </body>
    </html>
  );
}
