"use client"
import Image from 'next/image';
import noImage from '../images/noImage.png'
import {useRouter} from "next/navigation";
import {Product} from "@/app/types/product";

export default function ProductCard({product}: { product: Product }) {
  const router = useRouter()

  const handleRedirect = () => {
    router.push("/product");
    return null;
  }
  return (
    <div
      onClick={handleRedirect}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition flex justify-between cursor-pointer"
    >
      <div className="flex-1">
        {/* Tên sản phẩm */}
        <h3 className="font-bold truncate">{product.name}</h3>

        {/* Giá và giảm giá */}
        {product.discount ? (
          <div>
        <span className="rounded-md px-1 bg-green-50 border border-green-300 text-green-500 mr-1">
          Mới
        </span>
            <span className="rounded-md px-1 bg-orange-50 border border-orange-300 text-orange-500">
          Giảm {product.discount}%
        </span>
            <div className="mt-1">
          <span className="font-bold text-lg font-bold mr-2">
            {(product.price - (product.price * product.discount) / 100).toLocaleString("vi-VN")}₫
          </span>
              <s className="font-semibold text-red-500">{product.price.toLocaleString("vi-VN")} ₫</s>
            </div>
          </div>
        ) : (
          <div>
        <span className="rounded-md px-1 bg-green-50 border border-green-300 text-green-500 mr-1">
          Mới
        </span>
            <p className="font-bold mt-1">{product.price.toLocaleString("vi-VN")} ₫</p>
          </div>
        )}

        {/* Mô tả sản phẩm */}
        <p className="mt-1 text-gray-600 line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Hình ảnh sản phẩm */}
      <div className="h-[170px] w-[170px] flex items-center">
        <Image
          src={product.image[0] || noImage}
          alt="Hình ảnh sản phẩm"
          width={150}
          height={150}
          style={{width: "170px", height: "170px"}}
          className="rounded-xl object-cover"
        />
      </div>
    </div>

  );
}
