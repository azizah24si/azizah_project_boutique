/**
 * Avatar Component
 *
 * Props:
 * - src: string — image URL
 * - name: string — used for initials fallback and alt text
 * - size: "xs" | "sm" | "md" | "lg" | "xl" (default: "md")
 * - color: "cyan" | "pink" | "green" | "orange" | "purple" (default: "cyan") — fallback bg color
 * - status: "online" | "offline" | "busy" | null (default: null)
 * - className
 */
export default function Avatar({
  src,
  name = "",
  size = "md",
  color = "cyan",
  status = null,
  className = "",
}) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  const colors = {
    cyan: "bg-gradient-to-br from-cyan-400 to-teal-400",
    pink: "bg-gradient-to-br from-pink-400 to-rose-400",
    green: "bg-gradient-to-br from-green-400 to-emerald-400",
    orange: "bg-gradient-to-br from-orange-400 to-amber-400",
    purple: "bg-gradient-to-br from-purple-400 to-violet-400",
  };

  const statusColors = {
    online: "bg-green-400",
    offline: "bg-gray-400",
    busy: "bg-red-400",
  };

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizes[size]} ${colors[color]} rounded-full flex items-center justify-center text-white font-bold`}
        >
          {initials || "?"}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`}
        />
      )}
    </div>
  );
}
