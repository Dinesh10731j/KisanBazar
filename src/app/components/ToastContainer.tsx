"use client"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import Toast from "./Toast";
import { removeToast } from "@/lib/store/slices/toastSlice";

const ToastContainer = () => {
  const toasts = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
};

export default ToastContainer;