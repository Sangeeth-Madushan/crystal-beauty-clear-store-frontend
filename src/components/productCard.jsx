import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={"/overview/" + product.productId}
      className="
        w-60 h-96 bg-white shadow-md overflow-hidden border border-gray-200
        flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer
      "
    >
      {/* Image Container */}
      <div className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Product Name */}
        <h2 className="text-sm font-semibold text-gray-900 truncate mb-1">
          {product.name || "No Name"}
        </h2>

        {/* Pricing Section */}
        <div className="mt-2">
          <span className="text-lg font-bold text-[#982fc1]">
            Rs. {product.price?.toLocaleString() || "0"}
          </span>

          {product.labellePrice !== product.price && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs line-through text-gray-400">
                Rs. {product.labellePrice?.toLocaleString() || "0"}
              </span>
              <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 font-semibold rounded">
                {product.labellePrice
                  ? Math.round(100 - (product.price / product.labellePrice) * 100)
                  : 0}
                % OFF
              </span>
            </div>
          )}
        </div>

        {/* Spacer to push stock status to bottom */}
        <div className="flex-1"></div>

        {/* Stock Status */}
        <div className="mt-2">
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded ${
              product.isAvailable && product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.isAvailable && product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}