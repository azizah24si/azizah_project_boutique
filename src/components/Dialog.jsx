import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { cn } from "../utils/cn";

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showClose = true,
  className,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={cn(
          "bg-white rounded-2xl shadow-2xl w-full animate-slideUp",
          sizes[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex-1">
            {title && (
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {showClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4 shrink-0"
              aria-label="Close dialog"
            >
              <FaTimes className="text-xl" />
            </button>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">{children}</div>

        {/* FOOTER */}
        {footer && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Dialog Variants
export function DialogConfirm({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "danger",
}) {
  const variants = {
    danger: "bg-red-500 hover:bg-red-600",
    primary: "bg-cyan-500 hover:bg-cyan-600",
    success: "bg-green-500 hover:bg-green-600",
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-xl font-semibold text-white transition-colors",
              variants[variant]
            )}
          >
            {confirmText}
          </button>
        </div>
      }
    />
  );
}
