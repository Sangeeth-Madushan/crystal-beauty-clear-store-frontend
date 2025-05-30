export default function Loading() {
  return (
    <div className="w-full h-screen flex pt-[80px] animate-pulse">
      {/* Image Slider Skeleton */}
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[500px] h-[28rem] bg-gray-300 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gray-300 rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="w-full md:w-1/3 pt-[80px] px-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>

          {/* Alt Names */}
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-300 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
            ))}
          </div>

          {/* Product ID */}
          <div className="h-4 bg-gray-300 w-1/2 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>

          {/* Description */}
          <div className="h-24 bg-gray-300 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>

          {/* Price */}
          <div className="h-8 bg-gray-300 w-1/2 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 w-full sm:w-1/2 bg-gray-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="h-12 w-full sm:w-1/2 bg-gray-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Extra Info */}
          <div className="flex gap-4 mt-4">
            <div className="h-4 w-24 bg-gray-300 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 w-28 bg-gray-300 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
