"use client";

import Link from "next/link";
import {useState} from "react";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import leoShop from "../../images/leoShop.png";
import Image from "next/image";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
                {/* Logo */}
                <Image
                    src={leoShop}
                    width={60}
                    height={60}
                    alt="logo"
                />

                {/* Search */}
                <div className="relative hidden md:flex">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-[400px] rounded-md border border-gray-300 p-2 pl-10 text-gray-700 shadow-sm focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-1.06 1.06L21 21zM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    </svg>
                </div>


                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6 bg-white py-3 px-6 rounded-lg">
                    <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200">
                        <FaShoppingCart />
                        <span className="font-medium">Giỏ hàng</span>
                    </Link>
                    <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200">
                        <FaUser />
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
                        <Link href="/" className="hover:text-blue-500">
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
