"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/app/stores/cartStore";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {createOrder} from "@/app/api/order";
import {useRouter} from "next/navigation";

// Schema validation với Zod
const schema = z.object({
  shippingAddress: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  paymentMethod: z.enum(["momo", "vnpay", "COD"], {
    message: "Vui lòng chọn phương thức thanh toán",
  }),
});

// Định nghĩa kiểu dữ liệu dựa trên schema
type FormData = z.infer<typeof schema>;
type infoUser = {
  _id: "",
  email: "",
  phone: "",
  password: "",
  passwordCompare: "",
  codeRef: "",
  username: "",
  address: "",
}

export default function CheckoutPage() {
  const {showError, showSuccess} = useError();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const { cart,clearCart } = useCartStore();
  const [info,setInfo] = useState<infoUser>()

  // useForm với kiểu dữ liệu cụ thể
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Tính tổng tiền đơn hàng
  const totalAmount = cart.reduce(
    (sum, item) =>
      item.discount
        ? sum + (item.price - (item.price * item.discount) / 100) * item.quantity
        : sum + item.price * item.quantity,
    0
  );

  // Lấy thông tin địa chỉ từ localStorage khi load trang
  useEffect(() => {
    const getInfo = () => {
      const infoParse = localStorage.getItem("info")
        ? JSON.parse(localStorage.getItem("info")!)
        : {};
      setInfo(infoParse)
      if (infoParse.address) {
        setValue("shippingAddress", infoParse.address);
      }
    }
    getInfo()
  }, [setValue]);

  // Xử lý khi submit form
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (!info) {
        showError("Không tìm thấy thông tin người dùng. Vui lòng thử lại!");
        setLoading(false);
        return;
      }

      const param = { ...data, totalAmount, userId: info._id, items: cart };
      const res = await createOrder(param) as { data?: { message?: string } };
      showSuccess(res.data.message);
      clearCart();
      router.push("/shop");
    } catch (error) {
      const err = error as AxiosError;
      showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Thanh Toán Đơn Hàng
        </h2>

        {/* Thông tin đơn hàng */}
        <div className="border-b pb-4 mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b last:border-none">
              <span className="font-medium text-gray-600">
                {item.name}
                <span className="font-bold whitespace-nowrap ml-1 mr-1 text-blue-600">
                  {" "}
                  | x {item.quantity} |
                </span>
              </span>
              <span className="font-bold whitespace-nowrap">
                {item.discount
                  ? (item.price - (item.price * item.discount) / 100).toLocaleString("vi-VN")
                  : item.price.toLocaleString("vi-VN")}{" "}
                đ
              </span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-lg mt-3">
            <span>Tổng tiền:</span>
            <span className="text-blue-600">{totalAmount.toLocaleString()} đ</span>
          </div>
        </div>

        {/* Form nhập thông tin */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Địa chỉ nhận hàng */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Địa chỉ nhận hàng</label>
            <input
              type="text"
              {...register("shippingAddress")}
              className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập địa chỉ..."
            />
            {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.message}</p>}
          </div>

          {/* Phương thức thanh toán */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Phương thức thanh toán</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="momo" {...register("paymentMethod")} className="w-5 h-5 text-blue-500" disabled/>
                <span>MoMo Pay</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="vnpay" {...register("paymentMethod")} className="w-5 h-5 text-blue-500" disabled/>
                <span>VNPay</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="COD"
                  {...register("paymentMethod")}
                  className="w-5 h-5 text-blue-500"
                />
                <span>Thanh toán khi nhận hàng</span>
              </label>
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Thanh toán ngay"}
          </button>
        </form>
      </div>
    </div>
  );
}
