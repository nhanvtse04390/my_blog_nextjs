"use client";

export default function NoAccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center min-w-[500px]">
        <div className="text-red-500 text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800">Bị chặn</h1>
        <p className="text-gray-600 mt-2">
          Bạn không có quyền truy cập.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
        >
          Trang chủ
        </button>
      </div>
    </div>
  );
}
