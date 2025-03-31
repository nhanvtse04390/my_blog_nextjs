"use client";

import React, {Suspense, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {useSearchParams} from "next/navigation";
import {getOrderById} from "@/app/api/order";
import moment from "moment";
import {orderItem} from "@/app/types/OrderItem";
import Image from "next/image";
import noImage from "@/app/images/noImage.png";

export default function EditOrder() {
  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <EditOrderContent/>
    </Suspense>
  );
}

function EditOrderContent() {
  const {showError} = useError();
  const [formData, setFormData] = useState<orderItem>(
    {
      _id: "",
      userName: "",
      userPhone: "",
      totalAmount: 0,
      shippingAddress: "",
      createdAt: new Date(),
      orderStatus: "",
      paymentMethod: "",
      items: [],
    }
  );
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const checkIsEdit = async () => {
      if (id) {
        try {
          const response = await getOrderById(id);
          const data = response.data
          const row : orderItem = {
            _id: data._id,
            userName: data.userId.username,
            userPhone: data.userId.phone,
            totalAmount: data.totalAmount.toLocaleString(),
            shippingAddress: data.shippingAddress,
            paymentStatus: data.paymentStatus,
            orderStatus: data.orderStatus === "pending" ? "Chưa giao hàng" : data.orderStatus,
            paymentMethod: data.paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : data.paymentMethod,
            createdAt: moment(data.createdAt).format("DD-MM-YYYY").toString(),
            items: data.items,
          }
          setFormData(row);
        } catch (error) {
          const err = error as AxiosError;
          showError(err.message);
        }
      } else {
      }
    }
    checkIsEdit()
  }, [showError]);

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    } catch (error) {
      const err = error as AxiosError
      showError(err.message)
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cập nhật đơn hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center">
          <h2 className="font-medium">Người mua:</h2>
          <h2 className="font-bold ml-1">{formData.userName}</h2>
        </div>

        <div className="flex items-center">
          <h2 className="font-medium">Địa chỉ:</h2>
          <h2 className="font-bold ml-1">{formData.shippingAddress}</h2>
        </div>

        { formData.items && formData.items.length === 0 ? (
          <p className="text-gray-600">Không có mặt hàng được chọn.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {formData.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border p-4 rounded-lg"
                >
                  <Image
                    src={
                      item.image.length > 0
                        ? item.image[0]
                        : noImage
                    }
                    alt="Preview"
                    className="rounded"
                    width={60}
                    height={60}
                  />

                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="font-bold">Giá: {item.discount ? (item.price - item.price * item.discount/100).toLocaleString("vi-VN") : item.price.toLocaleString("vi-VN")} đ</p>
                    <p className="font-bold">Số lượng: {item.quantity}</p>
                  </div>

                </li>
              ))}
            </ul>
          </>
        )}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Đang sửa..." : "Sửa sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
