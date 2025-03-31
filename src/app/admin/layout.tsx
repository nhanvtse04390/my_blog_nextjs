"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 h-screen p-5 flex flex-col fixed top-0 left-0 z-50 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <div
              className="flex items-center justify-center text-2xl font-bold text-gray-900 uppercase tracking-wide rounded-lg cursor-pointer">
            <span className="text-red-500">Leo</span> <span className="text-white">Shop</span>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={24}/>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <Link href="/shop" className="sidebar-link">
            📊 Shop
          </Link>
          <Link href="/admin/product/list" className="sidebar-link">
            🛍 Sản phẩm
          </Link>
          <Link href="/admin/order/list" className="sidebar-link">
            📦 Đơn hàng
          </Link>
          <Link href="/admin/users/list" className="sidebar-link">
            👥 Người dùng
          </Link>
          <Link href="/admin/statistical" className="sidebar-link">
            ⚙ Thống kê
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0">
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}