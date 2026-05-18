/**
 * Modal Component
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - title: string
 * - description: string
 * - size: "sm" | "md" | "lg" | "xl" (default: "md")
 * - children
 * - footer: ReactNode — custom footer content
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col`}
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-xl font-bold text-gray-700">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none mt-0.5 shrink-0"
            aria-label="Tutup modal"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto px-6 py-6 flex-1">{children}</div>

        {/* FOOTER */}
        {footer && (
          <div className="border-t border-gray-100 px-6 py-4 rounded-b-2xl bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
