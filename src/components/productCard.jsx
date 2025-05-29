import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to ={"/overview/"+ product.productId}
      className="
        w-[240px] h-[360px] bg-white shadow-lg rounded-lg m-3 overflow-hidden border border-gray-200
        flex flex-col transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer
      "
      style={{ minWidth: 240, minHeight: 360 }}
    >
      {/* Image */}
      <div className="w-full h-[160px] bg-gray-100 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            style={{ aspectRatio: "1 / 1" }} // Ensures square crop in all browsers
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-3">
        {/* Product Name & ID */}
        <div>
          <h2 className="text-base font-bold text-gray-900 truncate">
            {product.name || "No Name"}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {product.productId && `ID: ${product.productId}`}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 my-1 h-[32px] overflow-hidden leading-snug">
          {product.description || "No description available."}
        </p>

       {/* Pricing */}
<div className="mb-2">
  <span className="text-lg font-extrabold text-[#982fc1] block">
    Rs. {product.price?.toLocaleString() || "0"}
  </span>

  {product.labellePrice !== product.price && (
    <div className="flex items-center gap-5">
      <span className="text-xs line-through text-gray-400">
        Rs. {product.labellePrice?.toLocaleString() || "0"}
      </span>
      <span className="px-1 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded">
        {product.labellePrice
          ? Math.round(100 - (product.price / product.labellePrice) * 100)
          : 0}
        % OFF
      </span>
    </div>
  )}
</div>

        {/* Spacer to push button down */}
        <div className="flex-1"></div>

        {/* Stock & Action */}
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
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
