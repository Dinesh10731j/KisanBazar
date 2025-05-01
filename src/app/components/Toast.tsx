"use client";
import { useEffect, useState } from "react";
import { XCircle, CheckCircle, X } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-14 right-5 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
        show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      } ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
    >
      {type === "success" ? <CheckCircle className="w-6 h-6 mr-2" /> : <XCircle className="w-6 h-6 mr-2" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;