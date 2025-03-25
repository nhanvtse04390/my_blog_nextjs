"use client";

import React, {Suspense, useEffect, useState} from "react";
import {useError} from "@/app/components/ErrorProvider";
import {useSearchParams} from "next/navigation";
import {getUserById} from "@/app/api/user";
import {AxiosError} from "axios";
import moment from "moment/moment";

export default function UserDetail() {
  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <UserDetailContent/>
    </Suspense>
  );
}

function UserDetailContent() {
  const {showError, showSuccess} = useError();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    codeRef: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(id);
        const formData = response.data ? {
          ...response.data,
          createdAt: moment(response.data.createdAt).format("DD-MM-YYYY")
        } : {}
        setFormData(formData);
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("User updated successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Chi tiết người dùng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mã giới thiệu</label>
          <input
            type="text"
            name="codeRef"
            value={formData.codeRef || ""}
            disabled
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ngày tạo</label>
          <input
            type="text"
            name="createdAt"
            value={formData.createdAt || ""}
            disabled
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Lưu thay thay đổi
        </button>
      </form>
    </div>
  );
}
