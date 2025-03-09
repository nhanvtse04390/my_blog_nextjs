import Page from "./components/ProductCard/page";
import FeaturedCarousel from "@/app/layout/FeaturedCarousel";
import type {Metadata} from "next";

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
export const metadata: Metadata = {
  title: "Leo Shop",
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-2">
      <FeaturedCarousel />
      {/* Grid layout cho sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <Page key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}
