"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useError } from "@/app/components/ErrorProvider";
import { useRouter } from "next/navigation";

export default function Account() {
  const { showError } = useError();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    _id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const id = localStorage.getItem("info");
        const parseId = id ? JSON.parse(id) : {};
        console.log(parseId)
        setUserInfo(parseId);
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message);
      }
    };
    getInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("info");
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "isAdmin=; path=/; Secure; SameSite=Strict";
    router.push("/account/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{userInfo.username}</h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Mã giới thiệu:</label>
            <input
              className="border p-2 rounded"
              value={userInfo._id}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Số điện thoại:</label>
            <input
              className="border p-2 rounded"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Địa chỉ:</label>
            <input
              className="border p-2 rounded"
              value={userInfo.address}
              onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            />
          </div>

        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Chỉnh sửa
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </form>
    </div>
  );
}
