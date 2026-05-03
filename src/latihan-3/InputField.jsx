export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error
}) {
  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      {/* Error */}
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-600 text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
}