/**
 * Select Component
 *
 * Props:
 * - label: string
 * - options: Array<{ value: string, label: string }> | Array<string>
 * - error: string
 * - hint: string
 * - placeholder: string
 * - value, onChange, disabled, required, className, ...rest
 */
export default function Select({
  label,
  options = [],
  error,
  hint,
  placeholder,
  className = "",
  ...props
}) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <select
        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition appearance-none bg-white
          ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          }
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {normalizedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
