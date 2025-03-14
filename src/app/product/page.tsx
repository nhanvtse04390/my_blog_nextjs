import Image from "next/image";
import noImage from "@/app/images/noImage.png";

export default function ProductDetail() {
  const product = {id: 1, name: "Áo thun nam", price: 250000, image: "/images/shirt.jpg"}
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full h-96">
          {
            product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg object-cover shadow-lg"
              />) : (
              <Image
                src={noImage}
                alt="Ảnh tạm"
                width={300}
                height={300}
              />
            )
          }

        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 font-semibold">{product.price.toLocaleString()} VND</p>
        </div>
      </div>
    </div>
  );
}
