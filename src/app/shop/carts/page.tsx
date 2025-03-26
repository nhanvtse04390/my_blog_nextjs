"use client";

import { useCartStore } from "../../stores/cartStore";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCartStore();

    // Tính tổng tiền
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                                {/* Ảnh sản phẩm */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />

                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-medium">{item.name}</h2>
                                    <p className="text-gray-600">Giá: {item.price} đ</p>
                                    <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <FaTrashAlt />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-right">
                        <h2 className="text-xl font-semibold">Tổng tiền: {totalPrice.toLocaleString()} đ</h2>
                        <button
                            onClick={clearCart}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Thanh toán
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
