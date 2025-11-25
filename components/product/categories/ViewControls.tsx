"use client"
interface ViewControlsProps {
  viewMode: "grid" | "list" | "compact"
  setViewMode: (mode: "grid" | "list" | "compact") => void
}

export function ViewControls({
  viewMode,
  setViewMode
}: ViewControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center space-x-2 self-end sm:self-auto">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 border ${viewMode === "grid" ? "bg-gray-200" : "bg-white"}`}
          aria-label="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 border ${viewMode === "list" ? "bg-gray-200" : "bg-white"}`}
          aria-label="List view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="14" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="1" y="7" width="14" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="1" y="13" width="14" height="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
        <button
          onClick={() => setViewMode("compact")}
          className={`p-2 border ${viewMode === "compact" ? "bg-gray-200" : "bg-white"}`}
          aria-label="Compact view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="2" x2="15" y2="2" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

