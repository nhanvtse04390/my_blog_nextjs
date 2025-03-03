import {useEffect, useState} from "react";
import {getImageUrl} from "@/app/utils/getImageUrl";

export default function ProductCard({product}: { product: any }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      const url = await getImageUrl("images/1.jpg");
      setImageUrl(url);
    }

    fetchImage();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img src={imageUrl} alt="Uploaded" className="w-64 h-64 object-cover mt-2"/>
      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-gray-600 mt-1">{product.price} đ</p>
      <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}
