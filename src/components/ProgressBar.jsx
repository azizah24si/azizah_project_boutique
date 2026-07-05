/**
 * ProgressBar Component
 *
 * Props:
 * - value: number (0–100)
 * - label: string — shown above the bar
 * - showValue: boolean — show percentage text (default: true)
 * - color: "plum" | "green" | "pink" | "orange" | "purple" (default: "plum")
 * - size: "sm" | "md" | "lg" (default: "md")
 * - className
 */
export default function ProgressBar({
  value = 0,
  label,
  showValue = true,
  color = "plum",
  size = "md",
  className = "",
}) {
  const clamped = Math.min(100, Math.max(0, value));

  const colors = {
    plum: "bg-plum-400",
    green: "bg-green-400",
    pink: "bg-pink-400",
    orange: "bg-orange-400",
    purple: "bg-purple-400",
  };

  const textColors = {
    plum: "text-plum-500",
    green: "text-green-500",
    pink: "text-pink-500",
    orange: "text-orange-500",
    purple: "text-purple-500",
  };

  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-medium text-gray-600">{label}</span>
          )}
          {showValue && (
            <span className={`text-xs font-bold ${textColors[color]}`}>
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
