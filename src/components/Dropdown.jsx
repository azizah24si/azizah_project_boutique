/**
 * Dropdown Component
 *
 * Props:
 * - trigger: ReactNode — the element that opens the dropdown
 * - items: Array<{ label: string, icon?: ReactNode, onClick?: () => void, danger?: boolean, divider?: boolean }>
 * - align: "left" | "right" (default: "right")
 * - className
 */
import { useState, useRef, useEffect } from "react";

export default function Dropdown({
  trigger,
  items = [],
  align = "right",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const alignClass = align === "right" ? "right-0" : "left-0";

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute ${alignClass} top-full mt-2 min-w-[160px] bg-white rounded-2xl shadow-lg border border-gray-100 py-1.5 z-50`}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="my-1.5 border-t border-gray-100" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors text-left
                  ${
                    item.danger
                      ? "text-red-500 hover:bg-red-50"
                      : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-600"
                  }`}
              >
                {item.icon && (
                  <span className="text-base">{item.icon}</span>
                )}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
