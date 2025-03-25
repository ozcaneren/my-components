import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Components",
  description: "UI Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col md:flex-row min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 w-full px-4 py-8 md:px-8 md:pl-72 xl:pl-96">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
