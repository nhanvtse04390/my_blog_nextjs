"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("info")|| "{}") ;
    if (info.isAdmin) {
      router.push("/admin");
    } else {
      router.push("/shop");
    }
  }, [router]);

  return null;
}
