"use client";

import {useCartStore} from "../../stores/cartStore";
import {FaTrashAlt} from "react-icons/fa";
import noImage from "@/app/images/noImage.png";
import Image from "next/image";
import React from "react";
import {useRouter} from "next/navigation";

const CartPage = () => {
    const router = useRouter()
    const {cart, removeFromCart} = useCartStore();

    // Tính tổng tiền
    const totalPrice = cart.reduce((sum, item) => item.discount ? sum + (item.price - item.price * item.discount/100) * item.quantity : sum + item.price * item.quantity, 0);

    const order = () => {
        router.push("/shop/checkout")
    }

    return (
        <div className="max-w-3xl min-h-[100vh] mx-auto p-8 bg-white shadow-xl rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Giỏ hàng trống.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item, index) => (
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

                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <FaTrashAlt/>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-right">
                        <h2 className="text-xl font-semibold">Tổng tiền: {totalPrice.toLocaleString()} đ</h2>
                        <button
                            onClick={order}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
