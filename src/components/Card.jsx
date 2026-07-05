/**
 * Card Component
 *
 * Props:
 * - title: string
 * - subtitle: string
 * - icon: ReactNode
 * - iconColor: "plum" | "pink" | "green" | "orange" | "purple" (default: "plum")
 * - value: string | number — large stat value
 * - trend: string — e.g. "+55%" shown in green/red based on sign
 * - footer: ReactNode
 * - className, children
 */
export default function Card({
  title,
  subtitle,
  icon,
  iconColor = "plum",
  value,
  trend,
  footer,
  className = "",
  children,
}) {
  const iconColors = {
    plum: "bg-gradient-to-br from-plum-500 to-gold-500",
    pink: "bg-gradient-to-br from-pink-400 to-rose-400",
    green: "bg-gradient-to-br from-green-400 to-emerald-400",
    orange: "bg-gradient-to-br from-orange-400 to-amber-400",
    purple: "bg-gradient-to-br from-purple-400 to-violet-400",
  };

  const isPositive = typeof trend === "string" && trend.startsWith("+");

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-xs text-gray-400 font-bold uppercase mb-1 truncate">
              {title}
            </p>
          )}

          {value !== undefined && (
            <h2 className="text-xl font-bold text-gray-700">{value}</h2>
          )}

          {trend && (
            <p
              className={`text-sm mt-1 font-bold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend}
            </p>
          )}

          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div
            className={`w-12 h-12 rounded-xl ${iconColors[iconColor]} text-white flex items-center justify-center text-xl shrink-0`}
          >
            {icon}
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
}
