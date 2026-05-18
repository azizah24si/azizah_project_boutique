/**
 * Button Component
 *
 * Props:
 * - variant: "primary" | "secondary" | "danger" | "ghost" | "outline" (default: "primary")
 * - size: "sm" | "md" | "lg" (default: "md")
 * - icon: ReactNode (optional, rendered before children)
 * - iconRight: ReactNode (optional, rendered after children)
 * - loading: boolean
 * - disabled: boolean
 * - onClick, type, className, children
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-cyan-400 text-white hover:bg-cyan-500 focus:ring-cyan-300 shadow-sm",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 shadow-sm",
    ghost:
      "bg-transparent text-cyan-500 hover:bg-cyan-50 focus:ring-cyan-200",
    outline:
      "border border-cyan-400 text-cyan-500 hover:bg-cyan-50 focus:ring-cyan-200 bg-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
      {!loading && iconRight && <span>{iconRight}</span>}
    </button>
  );
}
