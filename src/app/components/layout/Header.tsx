"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 accent-red-500">
          MyShop
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
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
