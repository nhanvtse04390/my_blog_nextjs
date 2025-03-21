"use client";

interface ConfirmPopupProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Nội dung popup */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 my-3">{message}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Xác nhận
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition cursor-pointer"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
