import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-secondary">Your Shopping Cart</h1>
        <div className="w-20 h-1 bg-accent mt-2"></div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
          <span className="text-lg font-medium text-gray-700">Total Items:</span>
          <span className="text-xl font-semibold text-secondary">{cart.length}</span>
        </div>

        <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
          <span className="text-lg font-medium text-gray-700">Order Total:</span>
          <span className="text-2xl font-bold text-accent">
            Rs. {getTotal().toFixed(2)}
          </span>
        </div>

        <Link
          to="/checkout"
          state={{ cart: cart }}
           className="w-auto min-w-[200px] bg-[#6d447d] hover:bg-[#5a3866] text-white py-3 px-8 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg mx-auto "
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Link>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Cart Items
        </h2>

        {cart.length === 0 ? (
          <div className="w-full bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is currently empty</p>
            <Link
              to="/products"
              className="text-[#6d447d] hover:text-[#5a3866] font-medium underline"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.productId}
              className="w-full bg-white rounded-lg shadow-md flex items-center p-4 relative hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.productId}</p>
                
                <div className="flex items-center">
                  {item.labelledPrice > item.price ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">
                        Rs. {item.labelledPrice.toFixed(2)}
                      </span>
                      <span className="text-accent font-bold">
                        Rs. {item.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-accent font-bold">
                      Rs. {item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center bg-gray-100 rounded-lg mx-4">
                <button
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-l-lg"
                  onClick={() => {
                    addToCart(item, -1);
                    setCart(getCart());
                  }}
                >
                  <BiMinus size={18} />
                </button>
                <span className="px-4 font-medium">{item.qty}</span>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-r-lg"
                  onClick={() => {
                    addToCart(item, 1);
                    setCart(getCart());
                  }}
                >
                  <BiPlus size={18} />
                </button>
              </div>

              <div className="w-24 text-right mr-4">
                <span className="font-bold text-gray-800">
                  Rs. {(item.price * item.qty).toFixed(2)}
                </span>
              </div>

              <button
                className="p-2 text-gray-400 hover:text-red-500"
                onClick={() => {
                  removeFromCart(item.productId);
                  setCart(getCart());
                }}
              >
                <BiTrash size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
