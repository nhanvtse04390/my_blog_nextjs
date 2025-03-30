"use client";

import React, {Suspense, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import { useSearchParams } from "next/navigation";
import {getOrderById} from "@/app/api/order";

export default function EditOrder() {
    return (
        <Suspense fallback={<div>Loading product details...</div>}>
            <EditOrderContent/>
        </Suspense>
    );
}

function EditOrderContent() {
    const {showError} = useError();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        discount: "",
    });
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        const checkIsEdit = async () => {
            if(id) {
                try {
                    const response = await getOrderById(id);
                    setFormData(response.data);
                } catch (error) {
                    const err = error as AxiosError;
                    showError(err.message);
                }
            } else {
            }
        }
        checkIsEdit()
    }, [showError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                <div>
                    <label className="block text-gray-700 font-medium">Tên sản phẩm</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nhập tên sản phẩm..."
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between">
                    {/* Giá */}
                    <div>
                        <label className="block text-gray-700 font-medium">Giá sản phẩm</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Nhập giá sản phẩm..."
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Giảm giá */}
                    <div>
                        <label className="block text-gray-700 font-medium">Giảm giá (%)</label>
                        <input
                            type="number"
                            name="discount"
                            placeholder="Nhập % giảm giá (nếu có)..."
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Mô tả sản phẩm */}
                <div>
                    <label className="block text-gray-700 font-medium">Mô tả sản phẩm</label>
                    <textarea
                        name="description"
                        placeholder="Nhập mô tả sản phẩm..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
