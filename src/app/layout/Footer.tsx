export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1: Logo & Giới thiệu */}
          <div>
            <h2 className="text-lg font-semibold text-white">LEOSHOP</h2>
            <p className="mt-2 text-sm">
              Mua sắm dễ dàng, nhanh chóng và tiện lợi. Luôn đồng hành cùng bạn!
            </p>
          </div>

          {/* Cột 2: Điều hướng */}
          <div>
            <h3 className="text-lg font-semibold text-white">Điều hướng</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Liên hệ a
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Mạng xã hội */}
          <div>
            <h3 className="text-lg font-semibold text-white">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white">
                🌐 Facebook
              </a>
              <a href="#" className="hover:text-white">
                🐦 Twitter
              </a>
              <a href="#" className="hover:text-white">
                📸 Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} ShopNext. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
