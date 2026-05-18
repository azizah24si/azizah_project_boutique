/**
 * Table Component
 *
 * Props:
 * - columns: Array<{ key: string, label: string, render?: (value, row) => ReactNode }>
 * - data: Array<object>
 * - emptyText: string (default: "Tidak ada data")
 * - className
 */
export default function Table({
  columns = [],
  data = [],
  emptyText = "Tidak ada data",
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-4 font-bold tracking-wide">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-gray-100 hover:bg-cyan-50 transition"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-sm text-gray-600">
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
