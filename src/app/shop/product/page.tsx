"use client";
import Image from "next/image";
import noImage from "@/app/images/noImage.png";
import React, {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getProduct, getProductById} from "@/app/api/product";
import {Product} from "@/app/types/product";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";
import {PARAMS} from "@/app/admin/product/list/page";
import ProductCard from "@/app/components/ProductCard";

export default function ProductDetail() {
  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <ProductDetailContent/>
    </Suspense>
  );
}

function ProductDetailContent() {
  const {showError} = useError();
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    if (!productId) return;
    const fetchProductById = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
        if (response.data.image && response.data.image.length > 0) {
          setSelectedImage(response.data.image[0]);
        }
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const params: PARAMS = {page: 1, rowsPerPage: 4};
        const response = await getProduct(params);
        setRelatedProducts(response.data.list)
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message)
      }
    };

    fetchProductById();
    fetchProducts();
  }, []);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    alert(`Mua ngay ${quantity} sản phẩm!`);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500">
        {Array(fullStars).fill(0).map((_, i) => <FaStar key={`full-${i}`}/>)}
        {hasHalfStar && <FaStarHalfAlt/>}
        {Array(emptyStars).fill(0).map((_, i) => <FaRegStar key={`empty-${i}`}/>)}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[100vh] bg-white rounded-lg mt-2">
      {product ? (
        <>
          {/* Chi tiết sản phẩm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full h-96">
              <Image
                src={selectedImage || noImage}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg object-cover shadow-lg"
                style={{width: "400px", height: "400px", objectFit: "cover"}}
              />
              <div className="mt-4 flex space-x-2">
                {product.image?.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={80}
                    height={80}
                    className={`cursor-pointer rounded-md border ${
                      selectedImage === img ? "border-blue-500" : "border-gray-300"
                    }`}
                    onMouseEnter={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* Đánh giá sao */}
              <div className="flex items-center space-x-2">
                {renderStars(product.rating || 4.5)}
                <span className="text-gray-600 text-sm">({product.reviewsCount} đánh giá)</span>
              </div>

              {product.discount ? (
                <div>
                  <span className="rounded-md px-1 bg-orange-50 border border-orange-300 text-orange-500">
                    Giảm {product.discount}%
                  </span>
                  <div className="mt-1">
                    <span className="font-bold text-lg mr-2">
                      {(product.price - (product.price * product.discount) / 100).toLocaleString("vi-VN")}₫
                    </span>
                    <s className="font-semibold text-red-500">{product.price.toLocaleString("vi-VN")}₫</s>
                  </div>
                </div>
              ) : (
                <p className="font-bold mt-1">{product.price.toLocaleString("vi-VN")}₫</p>
              )}

              {/* Số lượng */}
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Số lượng:</span>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-200" onClick={decreaseQuantity}>
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-200" onClick={increaseQuantity}>
                  +
                </button>
              </div>

              {/* Nút hành động */}
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={handleAddToCart}>
                  🛒 Thêm vào giỏ hàng
                </button>
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={handleBuyNow}>
                  ⚡ Mua ngay
                </button>
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="mt-40 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-xl font-semibold">Mô tả sản phẩm</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </div>

          {/* Sản phẩm liên quan */}
          <div className="mt-10">
            <div
              className="relative flex items-center justify-center text-gray-400 font-semibold rounded-xl p-4 tracking-wide text-lg uppercase">
              <span className="relative px-4 bg-white rounded-xl z-1 text-3xl">Có thể bạn quan tâm</span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product}/>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
