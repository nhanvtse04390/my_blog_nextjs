"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react"; // Import icon

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
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <Link href="/admin/dashboard" className="sidebar-link">
            📊 Dashboard
          </Link>
          <Link href="/admin/products" className="sidebar-link">
            🛍 Sản phẩm
          </Link>
          <Link href="/admin/orders" className="sidebar-link">
            📦 Đơn hàng
          </Link>
          <Link href="/admin/users" className="sidebar-link">
            👥 Người dùng
          </Link>
          <Link href="/admin/settings" className="sidebar-link">
            ⚙ Cài đặt
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