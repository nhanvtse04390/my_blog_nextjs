"use client"; // Đảm bảo Next.js chạy ở chế độ client
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import firstBanner from '../../images/banner1.jpg'
import secondBanner from '../../images/banner2.jpg'
import banner3th from '../../images/banner3.jpg'

const images = [
    firstBanner,
    secondBanner,
    banner3th,
];

export default function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg mb-1">
        {/* Hiển thị ảnh */}
        <Image
            src={images[currentIndex]}
            alt="Featured Image"
            width={800}
            height={400}
            className="w-full h-[400px] object-cover transition-all duration-500"
        />

        {/* Nút điều hướng */}
        <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 transition"
            onClick={prevSlide}
        >
          <FaChevronLeft size={24} />
        </button>
        <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 transition"
            onClick={nextSlide}
        >
          <FaChevronRight size={24} />
        </button>

        {/* Chấm tròn chỉ báo */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
              <span
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                      index === currentIndex ? "bg-white" : "bg-gray-400"
                  }`}
              />
          ))}
        </div>
      </div>
  );
}
