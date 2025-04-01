"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashBoard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/statistical");
  }, []); // Chạy một lần sau khi component mount

  return null; // Không hiển thị gì cả vì sẽ redirect ngay lập tức
}
