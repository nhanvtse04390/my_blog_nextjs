"use client"
import {useEffect, useState} from "react";
import {getImageUrl} from "@/app/utils/getImageUrl";
import Image from 'next/image';
import noImage from '../images/noImage.png'
import { redirect } from "next/navigation";
import {Product} from "@/app/types/product";

export default function ProductCard({product}: { product: Product }) {
    const [image, setImageUrl] = useState("");

    useEffect(() => {
        async function fetchImage() {
            const number = Math.floor(Math.random() * 6) + 1
            const url = await getImageUrl(`images/${number}.jpg`);
            setImageUrl(url);
        }

        fetchImage();
    }, []);
    const handleRedirect = () => {
        redirect("/product");
        return null;
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition flex flex-col">
            <div className="h-[170px] cursor-pointer">
                {image ? (
                    <Image
                        src={image}
                        alt="Hình ảnh"
                        width={150}
                        height={150}
                        style={{width:"150px",height:"150px"}}
                        className="rounded-xl"
                    />
                ) : (
                    <Image
                        src={noImage}
                        alt="Ảnh tạm"
                        width={170}
                        height={170}
                    />
                )}
            </div>
            <div className="mt-auto">
                <h3 className="mt-3 over-flow:hidden">{product.name}</h3>
                <p className="font-semibold mt-1">{product.price} ₫</p>
                <button className="mt-3 w-full px-3 py-2 rounded-full bg-blue-500 text-white font-medium
                    transition-all duration-300 ease-in-out shadow-lg
                    hover:bg-blue-600 hover:shadow-xl active:scale-95
                    backdrop-blur-lg bg-opacity-80 cursor-pointer" onClick={handleRedirect}>
                    Chi tiết
                </button>
            </div>
        </div>
    );
}
