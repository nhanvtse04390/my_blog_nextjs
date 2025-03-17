"use client";

import { useState } from "react";
import { storage } from "../../../utils/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {addNewProduct} from "@/app/api/product";
import Image from "next/image";

export default function AddProductPage() {
    const {showError, showSuccess} = useError();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        discount: "",
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xử lý chọn ảnh
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Xem trước ảnh
        }
    };

    // Xử lý tải ảnh lên Firebase
    const uploadImage = async () => {
        if (!image) return null;

        const storageRef = ref(storage, `products/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                null,
                (error) => reject(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };

    // Xử lý submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imageUrl = await uploadImage();

            const productData = {
                ...formData,
                price: Number(formData.price),
                discount: formData.discount ? Number(formData.discount) : undefined,
                image: imageUrl,
            };

            // Gửi dữ liệu lên backend
            const res = await addNewProduct(productData);
            showSuccess(res.data.message)
            setFormData({ name: "", price: "", description: "", discount: "" });
            setImage(null);
            setPreview(null);
        } catch (error) {
            const err = error as AxiosError
            showError(err.message)
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm mới</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tên sản phẩm */}
                <input
                    type="text"
                    name="name"
                    placeholder="Tên sản phẩm"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                {/* Giá */}
                <input
                    type="number"
                    name="price"
                    placeholder="Giá sản phẩm"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                {/* Giảm giá (nếu có) */}
                <input
                    type="number"
                    name="discount"
                    placeholder="Giảm giá (%)"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Mô tả sản phẩm */}
                <textarea
                    name="description"
                    placeholder="Mô tả sản phẩm"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                {/* Ảnh sản phẩm */}
                <div className="border p-3 rounded">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && (
                        <div className="relative mt-3 w-32 h-32">
                            <Image
                                src={preview}
                                alt="Preview"
                                layout="fill"
                                objectFit="cover"
                                className="rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Nút Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Đang thêm..." : "Thêm sản phẩm"}
                </button>
            </form>
        </div>
    );
}
