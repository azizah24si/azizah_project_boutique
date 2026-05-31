import { cn } from "../utils/cn";

export default function Skeleton({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-gray-200",
    card: "bg-gray-100 rounded-xl p-4",
    text: "bg-gray-200 h-4 rounded",
    circle: "bg-gray-200 rounded-full",
    avatar: "bg-gray-200 rounded-full w-10 h-10",
  };

  return (
    <div
      className={cn(
        "animate-pulse",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// Skeleton Presets
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b border-gray-50 flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-6 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonProduct() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}
