"use client";

import {useEffect, useState} from "react";
import {storage} from "../../../utils/firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {addNewProduct, getProductById, removeImage} from "@/app/api/product";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ConfirmPopup from "@/app/components/ConfirmPopup";

export default function AddProductPage() {
  const {showError, showSuccess} = useError();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    discount: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit,setIsEdit] = useState(false)
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [oldImages, setOldImages] = useState<string[] | null>([]);
  const [isOpenDeleteImage, setIsOpenDeleteImage] = useState(false)
  const [imageURLRemove, setImageURLRemove] = useState<string>()

  useEffect(() => {
    const checkIsEdit = async () => {
      if(id) {
        setIsEdit(true)
        try {
          const response = await getProductById(id);
          setFormData(response.data);
          setOldImages(response.data.image);
        } catch (error) {
          const err = error as AxiosError;
          showError(err.message);
        }
      } else {
        setIsEdit(false)
      }
    }
    checkIsEdit()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "discount") {
      const discountValue = Number(value);
      if (discountValue > 100) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Xử lý chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setPreviews(files.map(file => URL.createObjectURL(file))); // Xem trước nhiều ảnh
    }
  };
  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => {
      if (!prev) return prev; // Kiểm tra nếu `prev` là null
      const updatedPreviews = [...prev]; // Sao chép mảng cũ
      if (updatedPreviews[index]) {
        URL.revokeObjectURL(updatedPreviews[index]); // Giải phóng URL blob
      }
      updatedPreviews.splice(index, 1); // Xóa ảnh bị xóa
      return updatedPreviews.length ? updatedPreviews : []; // Không trả về `null`
    });

    setImages((prev) => {
      if (!prev) return prev;
      const updatedImages = [...prev];
      updatedImages.splice(index, 1);
      return updatedImages.length ? updatedImages : []; // Trả về `[]` thay vì `null`
    });

    // Xử lý input file: giữ lại những file chưa bị xóa
    const fileInput = document.querySelector("input[type='file']") as HTMLInputElement;
    if (fileInput && fileInput.files) {
      const dataTransfer = new DataTransfer();
      Array.from(fileInput.files)
        .filter((_, i) => i !== index) // Chỉ giữ lại file chưa bị xóa
        .forEach((file) => dataTransfer.items.add(file));

      fileInput.files = dataTransfer.files;
    }
  };



  // Xử lý tải ảnh lên Firebase
  const uploadImages = async () => {
    if (!images.length) return [];

    const uploadTasks = images.map((image) => {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    return Promise.all(uploadTasks); // Chờ tất cả ảnh tải lên xong
  };

  const handleRemoveImageOld = async () => {
    try {
      const response = await removeImage(id,imageURLRemove);
      showSuccess(response.data.message)
    } catch (error) {
      const err = error as AxiosError;
      showError(err.message);
    } finally {
      setIsOpenDeleteImage(false)
    }
  }

  const handleCancelRemove = () => {
    setIsOpenDeleteImage(false)
  }

  const openModalRemoveImage = (oldImageURl: string) => {
    setImageURLRemove(oldImageURl)
    setIsOpenDeleteImage(true)
  }

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = await uploadImages();

      const productData = {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : undefined,
        image: imageUrls,
      };


      //Gửi dữ liệu lên backend
      const res = await addNewProduct(productData);
      showSuccess(res.data.message)
      setFormData({name: "", price: "", description: "", discount: ""});
      setImages([]);
      setPreviews([]);
    } catch (error) {
      const err = error as AxiosError
      showError(err.message)
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm sản phẩm mới</h2>
      <ConfirmPopup isOpen={isOpenDeleteImage} message={"Bạn chắc chắn muốn xóa ảnh này"} onConfirm={handleRemoveImageOld} onCancel={handleCancelRemove}></ConfirmPopup>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-gray-700 font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            placeholder="Nhập tên sản phẩm..."
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          {/* Giá */}
          <div>
            <label className="block text-gray-700 font-medium">Giá sản phẩm</label>
            <input
              type="number"
              name="price"
              placeholder="Nhập giá sản phẩm..."
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Giảm giá */}
          <div>
            <label className="block text-gray-700 font-medium">Giảm giá (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Nhập % giảm giá (nếu có)..."
              value={formData.discount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <label className="block text-gray-700 font-medium">Mô tả sản phẩm</label>
          <textarea
            name="description"
            placeholder="Nhập mô tả sản phẩm..."
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ảnh sản phẩm */}
        <div
          className="border border-gray-300 p-4 rounded-lg bg-gray-100 cursor-pointer"
        >
          <label className="block text-gray-700 font-medium mb-2 cursor-pointer">Ảnh sản phẩm</label>
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600 cursor-pointer" // Ẩn input file
          />
          {previews && previews.length > 0 && (
            <div className="flex flex-wrap mt-3 gap-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative w-24 h-24">
                  {/* Nút xóa ảnh */}
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 z-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>

                  {/* Ảnh preview */}
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>



        {
          isEdit ? (
            <div>
              <div className="border border-gray-300 p-4 rounded-lg bg-gray-100 cursor-pointer mb-2">
                <label className="block text-gray-700 font-medium mb-2 cursor-pointer">Ảnh cũ sản phẩm</label>
                {
                  oldImages && oldImages.length > 0 && (
                    <div className="flex flex-wrap mt-3 gap-3">
                      {oldImages.map((oldImage, index) => (
                        <div key={index} className="relative w-24 h-24">
                          {/* Nút xóa ảnh */}
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 z-1"
                            onClick={() => openModalRemoveImage(oldImage)}
                          >
                            ✕
                          </button>

                          {/* Ảnh preview */}
                          <Image
                            src={oldImage}
                            alt={`Preview ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Đang sửa..." : "Sửa sản phẩm"}
              </button>
            </div>

          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Đang thêm..." : "Thêm sản phẩm"}
            </button>
          )
        }
      </form>
    </div>
  );
}
