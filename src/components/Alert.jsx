/**
 * Alert Component
 *
 * Props:
 * - variant: "info" | "success" | "warning" | "error" (default: "info")
 * - title: string
 * - icon: ReactNode — override default icon
 * - dismissible: boolean — show close button
 * - onDismiss: () => void
 * - className, children
 */
export default function Alert({
  variant = "info",
  title,
  icon,
  dismissible = false,
  onDismiss,
  className = "",
  children,
}) {
  const variants = {
    info: {
      wrapper: "bg-cyan-50 border border-cyan-200 text-cyan-700",
      icon: "ℹ️",
    },
    success: {
      wrapper: "bg-green-50 border border-green-200 text-green-700",
      icon: "✅",
    },
    warning: {
      wrapper: "bg-yellow-50 border border-yellow-200 text-yellow-700",
      icon: "⚠️",
    },
    error: {
      wrapper: "bg-red-50 border border-red-200 text-red-700",
      icon: "❌",
    },
  };

  const v = variants[variant];

  return (
    <div className={`rounded-2xl px-4 py-3 flex gap-3 items-start ${v.wrapper} ${className}`}>
      <span className="text-base mt-0.5 shrink-0">{icon ?? v.icon}</span>

      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm">{title}</p>}
        {children && (
          <p className="text-sm mt-0.5 opacity-90">{children}</p>
        )}
      </div>

      {dismissible && (
        <button
          onClick={onDismiss}
          className="text-lg leading-none opacity-60 hover:opacity-100 shrink-0"
          aria-label="Tutup"
        >
          ×
        </button>
      )}
    </div>
  );
}
