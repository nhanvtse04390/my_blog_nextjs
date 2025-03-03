import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "@/app/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "E-commerce Site",
  description: "A modern e-commerce website built with Next.js",
};

export default function RootLayout({  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Header />
        {/*<Sidebar />*/}
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
