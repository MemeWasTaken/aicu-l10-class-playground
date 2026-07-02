export default function LoadingState() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-purple-400 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-sm text-gray-400">loading</span>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-4 h-4 bg-dark-hover rounded animate-pulse"></div>
            <div className="h-4 bg-dark-hover rounded animate-pulse w-20"></div>
            <div className="h-4 bg-dark-hover rounded animate-pulse flex-1"></div>
            <div className="h-4 bg-dark-hover rounded animate-pulse w-24"></div>
            <div className="h-4 bg-dark-hover rounded animate-pulse w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
