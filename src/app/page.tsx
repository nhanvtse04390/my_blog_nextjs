"use client"
import {useRouter} from "next/navigation";

interface info {
  isAdmin: boolean;
}

export default function Home(info) {
  const router = useRouter()
  if (info.isAdmin) {
    router.push("/shop")
  } else {
    router.push("/admin")
  }
  return (
    <></>
  );
}
