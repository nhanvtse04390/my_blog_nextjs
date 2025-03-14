"use client"
import "../styles/globals.css";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import {usePathname} from "next/navigation";
import {ToastContainer} from "react-toastify";
import { ErrorProvider } from "../app/components/ErrorProvider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const hiddenPathName = ['/account/login','/account/register']
    const pathName = usePathname()
    const isHidePath = hiddenPathName.includes(pathName)
    if (isHidePath) {
        return (
            <html lang="en">
            <body className="relative">
            <main>
                <ErrorProvider>
                    <ToastContainer />
                    {children}
                </ErrorProvider>
            </main>
            </body>
            </html>
        );
    }
    return (
        <html lang="en">
        <body className="relative">
        <main>
            <ErrorProvider>
                <ToastContainer />
                {children}
            </ErrorProvider>
        </main>
        </body>
        </html>
    );
}
