/**
 * EmptyState Component
 *
 * Props:
 * - icon: ReactNode — large icon/illustration
 * - title: string
 * - description: string
 * - action: ReactNode — e.g. a Button component
 * - className
 */
export default function EmptyState({
  icon,
  title = "Tidak ada data",
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      {icon && (
        <div className="w-20 h-20 bg-cyan-50 rounded-2xl flex items-center justify-center text-4xl text-cyan-400 mb-5">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
}
