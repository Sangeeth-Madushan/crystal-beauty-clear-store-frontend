
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";

export default function SearchProductPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let res;
        if (!query.trim()) {
          res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        } else {
          res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query.trim()}`
          );
        }
        setProducts(res.data);
      } catch (err) {
        toast.error("Error fetching products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-white pt-[90px] pb-8">
      <div className="w-full bg-white py-4 md:py-6 mb-8 shadow-sm">
        <div className="w-full flex justify-center">
          <div className="w-4/5 max-w-7xl">
            <img src="/Banner1.png" alt="Company Banner" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: "350px" }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-xl text-gray-500">
              No products found.
            </p>
          ) : (
            products.map((p) => <ProductCard key={p.productId} product={p} />)
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="w-full max-w-[250px] h-[360px] rounded-xl shadow bg-gray-100 p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}
