/**
 * Spinner Component
 *
 * Props:
 * - size: "sm" | "md" | "lg" | "xl" (default: "md")
 * - color: "plum" | "white" | "gray" | "pink" | "green" (default: "plum")
 * - label: string — accessible screen-reader text (default: "Loading...")
 * - fullScreen: boolean — center in viewport
 * - className
 */
export default function Spinner({
  size = "md",
  color = "plum",
  label = "Loading...",
  fullScreen = false,
  className = "",
}) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colors = {
    plum: "border-plum-200 border-t-plum-500",
    white: "border-white/30 border-t-white",
    gray: "border-gray-200 border-t-gray-500",
    pink: "border-pink-200 border-t-pink-500",
    green: "border-green-200 border-t-green-500",
  };

  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={`${sizes[size]} ${colors[color]} rounded-full animate-spin ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
