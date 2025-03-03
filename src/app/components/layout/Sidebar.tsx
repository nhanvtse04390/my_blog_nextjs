"use client"; // Vì có sự kiện click nên cần "use client"

import { useState } from "react";
import { FaHome, FaShoppingCart, FaBoxOpen, FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen p-5 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="text-white mb-6 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu Items */}
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 hover:text-gray-400">
            <FaHome size={20} />
            {isOpen && <span>Trang chủ</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 hover:text-gray-400">
            <FaShoppingCart size={20} />
            {isOpen && <span>Giỏ hàng</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 hover:text-gray-400">
            <FaBoxOpen size={20} />
            {isOpen && <span>Sản phẩm</span>}
          </a>
        </nav>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Nội dung chính</h1>
        <p>Đây là khu vực hiển thị nội dung của trang.</p>
      </div>
    </div>
  );
}
