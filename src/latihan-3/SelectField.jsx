export default function SelectField({
  label,
  value,
  onChange,
  options,
  error
}) {
  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-600 text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
}