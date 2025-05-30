import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-white pt-[90px] pb-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Featured Products
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          Discover the latest deals and best sellers, just for you!
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-[250px] h-[360px] rounded-xl shadow bg-gray-100 p-4 animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
}
