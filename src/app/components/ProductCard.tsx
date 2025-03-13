"use client"
import {useEffect, useState} from "react";
import {getImageUrl} from "@/app/utils/getImageUrl";
import Image from 'next/image';
import noImage from '../images/noImage.png'
import {useRouter} from "next/navigation";
import {Product} from "@/app/types/product";

export default function ProductCard({product}: { product: Product }) {
    const [image, setImageUrl] = useState("");
    const router = useRouter()

    useEffect(() => {
        async function fetchImage() {
            const number = Math.floor(Math.random() * 6) + 1
            const url = await getImageUrl(`images/${number}.jpg`);
            setImageUrl(url);
        }

        fetchImage();
    }, []);
    const handleRedirect = () => {
        router.push("/product");
        return null;
    }
    return (
        <div onClick={handleRedirect}
             className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition flex justify-between cursor-pointer">
            <div className="mb-auto">
                <h3 className="font-bold over-flow:hidden">{product.name}</h3>
                <p className="font-bold mt-1">{product.price} ₫</p>
                <p className="mt-1">{product.description}</p>
            </div>
            <div className="h-[170px]">
                {image ? (
                    <Image
                        src={image}
                        alt="Hình ảnh"
                        width={280}
                        height={280}
                        style={{width: "150px", height: "150px"}}
                        className="rounded-xl"
                    />
                ) : (
                    <Image
                        src={noImage}
                        alt="Ảnh tạm"
                        width={280}
                        height={280}
                    />
                )}
            </div>
        </div>
    );
}
