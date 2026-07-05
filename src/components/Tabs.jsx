/**
 * Tabs Component
 *
 * Props:
 * - tabs: Array<{ key: string, label: string, icon?: ReactNode, badge?: string | number }>
 * - activeTab: string — key of the active tab
 * - onChange: (key: string) => void
 * - variant: "underline" | "pill" (default: "underline")
 * - className
 */
export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = "underline",
  className = "",
}) {
  if (variant === "pill") {
    return (
      <div className={`flex gap-2 flex-wrap ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${
                activeTab === tab.key
                  ? "bg-plum-700 text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.key
                    ? "bg-white/30 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // underline variant
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all -mb-px
              ${
                activeTab === tab.key
                  ? "border-plum-600 text-plum-700"
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
              }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.key
                    ? "bg-plum-100 text-plum-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
