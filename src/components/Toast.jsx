import { createContext, useContext, useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { cn } from "../utils/cn";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, description, variant = "default", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant, duration }]);
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ title, description, variant, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const variants = {
    default: {
      bg: "bg-white border-gray-200",
      icon: <FaInfoCircle className="text-gray-500" />,
    },
    success: {
      bg: "bg-white border-green-200",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    error: {
      bg: "bg-white border-red-200",
      icon: <FaExclamationCircle className="text-red-500" />,
    },
    warning: {
      bg: "bg-white border-yellow-200",
      icon: <FaExclamationCircle className="text-yellow-500" />,
    },
    info: {
      bg: "bg-white border-plum-200",
      icon: <FaInfoCircle className="text-plum-500" />,
    },
  };

  const config = variants[variant] || variants.default;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border-2 shadow-lg",
        "transition-all duration-300",
        isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0",
        config.bg
      )}
    >
      <div className="text-xl mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold text-gray-800 text-sm mb-1">{title}</p>}
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default Toast;
