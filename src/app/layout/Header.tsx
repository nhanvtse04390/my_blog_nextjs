"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {FaHome, FaShoppingCart, FaUser, FaUserCog} from "react-icons/fa";
import {redirectHomePage} from "@/app/hooks/productHook";
import ConfirmPopup from "@/app/components/ConfirmPopup";
import {useRouter} from "next/navigation";
import {useCartStore} from "../stores/cartStore";

const Header = () => {
  const [info, setInfo] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.length;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInfo = localStorage.getItem("info");
      setInfo(storedInfo);
    }
  }, []);

  useEffect(() => {
    const checkIsAdmin = () => {
      if (info) {
        const jsonInfo = JSON.parse(info)
        const isAdmin = jsonInfo.isAdmin
        setIsAdmin(isAdmin)
      } else {
        setIsAdmin(false)
      }
    }
    checkIsAdmin();
  }, [info]);
  const handleAccount = (route:number) => {
    if (!info) {
      setIsOpenPopup(true)
    } else {
      if(route === 1) {
        router.push("/shop/account")
      } else if (route === 2) {
        router.push("/shop/cart")
      }
    }
  }
  const handleConfirm = () => {
    setIsOpenPopup(false)
    router.push("/account/login")
  }

  const handleCancel = () => {
    setIsOpenPopup(false)
  }

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        <div
          onClick={redirectHomePage}
          className="flex items-center justify-center text-2xl font-bold text-gray-900 uppercase tracking-wide px-6 py-3 rounded-lg cursor-pointer">
          <span className="text-red-500">Leo</span> Shop
        </div>


        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 bg-white py-3 px-6 rounded-lg">

          {
            isAdmin ? (
              <>
                <div>
                  <Link
                    href="/shop/carts"
                    className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200"
                  >
                    <FaShoppingCart className="text-xl"/>
                    <span className="font-medium">Giỏ hàng</span>
                    {cartCount > 0 && (
                      <span
                        className="absolute bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                        style={{
                          position: "absolute",
                          top: "-10px",
                          left: "10px",
                        }}>
                          {cartCount}
                        </span>
                    )}
                  </Link>
                </div>
                <div>
                  <Link href="/admin"
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200">
                    <FaUserCog/>
                    <span className="font-medium">Quản lý</span>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div
                  onClick={() => handleAccount(1)}
                  className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer"
                >
                  <FaShoppingCart className="text-xl"/>
                  <span className="font-medium">Giỏ hàng</span>
                  {cartCount > 0 && (
                    <span
                      className="absolute bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "10px",
                      }}>
                          {cartCount}
                        </span>
                  )}
                </div>
              </div>
            )
          }
          <span onClick={() => handleAccount(2)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer">
                        <FaUser/>
                        <span className="font-medium">Tài khoản</span>
                    </span>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-14 right-4 bg-white shadow-md p-4 flex flex-col space-y-3">
            <Link href="/shop" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer">
              <FaHome/>
              <span className="ml-1">Trang chủ</span>
            </Link>
            {
              isAdmin ? (
                <Link href="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer">
                  <FaUserCog/>
                  <span className="ml-1">Quản lý</span>
                </Link>
              ) : (
                <></>
              )
            }
            <span onClick={() => handleAccount(1)} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer">
              <FaShoppingCart/>
              <span className="ml-1">Giỏ hàng</span>
            </span>
            <span onClick={handleAccount}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer">
                        <FaUser/>
                        <span className="font-medium">Tài khoản</span>
                    </span>
          </div>
        )}
      </div>
      <ConfirmPopup isOpen={isOpenPopup} message='Bạn cần đăng nhập để xem nội dung này' onConfirm={handleConfirm}
                    onCancel={handleCancel}></ConfirmPopup>
    </header>
  );
};

export default Header;
