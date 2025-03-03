'use client';

import ProductCard from "../app/components/ProductCard";
import { getImageUrl } from "../app/utils/getImageUrl";
import {useEffect, useState} from "react";

const products = [
  {id: 1, name: "Áo thun nam", price: 250000, image: "/images/shirt.jpg"},
  {id: 2, name: "Giày sneaker", price: 1200000, image: "/images/shoes.jpg"},
  {id: 3, name: "Balo thời trang", price: 550000, image: "/images/backpack.jpg"},
  {id: 4, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 5, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 6, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 7, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 8, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 9, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 10, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 11, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 12, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 13, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 14, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},
  {id: 15, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg"},

];

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      const url = await getImageUrl("images/1.jpg");
      setImageUrl(url);
    }
    fetchImage();
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sản phẩm nổi bật</h1>

      {/* Grid layout cho sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}
