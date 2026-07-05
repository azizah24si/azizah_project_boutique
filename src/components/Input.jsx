/**
 * Input Component
 *
 * Props:
 * - label: string
 * - error: string — error message shown below input
 * - hint: string — helper text shown below input
 * - icon: ReactNode — icon on the left
 * - iconRight: ReactNode — icon on the right
 * - type, placeholder, value, onChange, disabled, required, className, ...rest
 */
export default function Input({
  label,
  error,
  hint,
  icon,
  iconRight,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {icon}
          </span>
        )}

        <input
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition
            ${icon ? "pl-9" : ""}
            ${iconRight ? "pr-9" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 focus:border-plum-400 focus:ring-2 focus:ring-plum-100"
            }
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
          {...props}
        />

        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {iconRight}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
