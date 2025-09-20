// src/components/Modal.jsx
export default function Modal({ open, title, message, onClose, confirmText = "확인" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-xl p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-black text-white"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
