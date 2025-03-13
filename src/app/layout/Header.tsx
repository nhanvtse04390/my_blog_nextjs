"use client";

import Link from "next/link";
import {useState} from "react";
import {FaShoppingCart, FaUser} from "react-icons/fa";
// import leoShop from "../images/leoShop.png";
// import Image from "next/image";
import {redirectHomePage} from "@/app/hooks/productHook";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
                {/* Logo */}
                {/*<Image*/}
                {/*    src={leoShop}*/}
                {/*    width={60}*/}
                {/*    height={60}*/}
                {/*    alt="logo"*/}
                {/*    onClick={redirectHomePage}*/}
                {/*    className="cursor-pointer"*/}
                {/*/>*/}
                <div
                    onClick={redirectHomePage}
                    className="flex items-center justify-center text-2xl font-bold text-gray-900 uppercase tracking-wide px-6 py-3 rounded-lg cursor-pointer">
                    <span className="text-red-500">Leo</span> Shop
                </div>


                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6 bg-white py-3 px-6 rounded-lg">
                    <Link href="/public"
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200">
                        <FaShoppingCart/>
                        <span className="font-medium">Giỏ hàng</span>
                    </Link>
                    <Link href="/public"
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200">
                        <FaUser/>
                        <span className="font-medium">Tài khoản</span>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-14 right-4 bg-white shadow-md p-4 flex flex-col space-y-3">
                        <Link href="/public" className="hover:text-blue-500">
                            Home
                        </Link>
                        <Link href="/products" className="hover:text-blue-500">
                            Products
                        </Link>
                        <Link href="/cart" className="hover:text-blue-500">
                            Cart
                        </Link>
                        <Link href="/account" className="hover:text-blue-500">
                            Account
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
