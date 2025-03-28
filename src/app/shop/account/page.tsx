"use client";

import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {useRouter} from "next/navigation";
import {editUserByID} from "@/app/api/user";
import {UserIcon} from "lucide-react";

export default function Account() {
  const {showError,showSuccess} = useError();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [userInfo, setUserInfo] = useState({
    _id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    newPassword: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const id = localStorage.getItem("info");
        const parseId = id ? JSON.parse(id) : {};
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

  const handleEdit = () => {
    setIsEdit(true)
  }
  const callEditAPI = async () => {
    try {
      const response = await editUserByID(userInfo)
      localStorage.setItem("info",response.data.user);
      showSuccess(response.data.message)
    } catch (error) {
      const err = error as AxiosError
      showError(err.message);
    } finally {
      setIsEdit(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <div className="flex flex-col items-center">
          <UserIcon className="w-24 h-24 text-blue-500 border-4 border-gray-500 rounded-full p-4 bg-gray-100" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{userInfo.username}</h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Mã giới thiệu:</label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
              value={userInfo._id}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Số điện thoại:</label>
            <input
              className={!isEdit ? "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100" : "border p-2 rounded"}
              disabled={!isEdit}
              value={userInfo.phone}
              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Địa chỉ:</label>
            <input
              className={!isEdit ? "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100" : "border p-2 rounded"}
              disabled={!isEdit}
              value={userInfo.address}
              onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
            />
          </div>
          {
            isEdit &&
            (
              <div className="flex flex-col">
                <label className="text-gray-600">Mật khẩu mới:</label>
                <input
                  value={userInfo.newPassword}
                  onChange={(e) => setUserInfo({...userInfo, newPassword: e.target.value})}
                  className={"border p-2 rounded"}
                />
              </div>
            )
          }

        </div>

        <div className="mt-6 flex justify-between">
          {
            !isEdit ? (
              <button
                onClick={handleEdit}
                type="button"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              >
                Chỉnh sửa
              </button>
            ) : (
              <button
                onClick={callEditAPI}
                type="button"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              >
                Xác nhận
              </button>
            )
          }

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
