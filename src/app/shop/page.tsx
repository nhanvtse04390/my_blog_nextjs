"use client"
import FeaturedCarousel from "@/app/layout/FeaturedCarousel";
import ProductCard from "../components/ProductCard";
import {useEffect, useState} from "react";
import {Product} from "@/app/types/product";
import {getProduct} from "@/app/api/product";
import {AxiosError} from "axios";
import {PARAMS} from "@/app/admin/product/list/page";
import {useError} from "@/app/components/ErrorProvider";


// const products = [
//   {id: 0, name: "Áo thun nam", price: 250000, image: "/images/shirt.jpg", description: "sản phẩm đang được hỗ trợ trả góp sản phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp phẩm đang được hỗ trợ trả góp", discount: 10},
//   {id: 1, name: "Áo thun nam", price: 250000, image: "/images/shirt.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 2, name: "Giày sneaker", price: 1200000, image: "/images/shoes.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 3, name: "Balo thời trang", price: 550000, image: "/images/backpack.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 4, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 5, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 6, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 7, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 8, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 9, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 10, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 11, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 12, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 13, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 14, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
//   {id: 15, name: "Tai nghe Bluetooth", price: 890000, image: "/images/headphones.jpg", description: "sản phẩm đang được hỗ trợ trả góp"},
// ];

export default function Shop() {
  const {showError} = useError();
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: PARAMS = {page: 1, rowsPerPage: 20};
        const response = await getProduct(params);
        setProducts(response.data.list)
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message)
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-2">
      <FeaturedCarousel/>
      <div
        className="relative flex items-center justify-center text-gray-400 font-semibold rounded-xl p-4 tracking-wide text-lg uppercase">
        <span className="relative px-4 bg-white rounded-xl z-1 text-3xl">Sản phẩm bán chạy</span>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
    </div>
  );
}
