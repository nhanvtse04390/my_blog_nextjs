"use client"
import "../../styles/globals.css";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import {ToastContainer} from "react-toastify";
import {ErrorProvider} from "../../app/components/ErrorProvider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <Header/>
            <main className="pt-16">
                <ErrorProvider>
                    <ToastContainer/>
                    {children}
                </ErrorProvider>
            </main>
            <Footer/>
        </div>
    );
}
