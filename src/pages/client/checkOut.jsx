import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  console.log(location.state.cart);

  const [cart, setCart] = useState(location.state?.cart || []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  }
  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    const orderInformation = {
      products: [],
      phone: phoneNumber,
      address: address,
    };

    for (let i = 0; i < cart.length; i++) {
      const item = {
        productId: cart[i].productId,
        qty: cart[i].qty,
      };
      orderInformation.products[i] = item;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        orderInformation,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Order placed successfully");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Error placing order");
      return;
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-secondary">Checkout</h1>
        <div className="w-20 h-1 bg-accent mt-2"></div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
          <span className="text-lg font-medium text-gray-700">Total:</span>
          <span className="text-2xl font-bold text-accent">
            Rs. {getTotal().toFixed(2)}
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium text-gray-700">
            Contact Information
          </h3>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <textarea
            placeholder="Delivery Address"
            rows={3}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          className="w-auto min-w-[200px] bg-[#6d447d] hover:bg-[#5a3866] text-white py-3 px-8 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg mx-auto "
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Items ({cart.length})
        </h2>

        {cart.map((item, index) => (
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
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.productId}</p>

              <div className="mt-2">
                {item.labelledPrice > item.price ? (
                  <div className="flex items-center">
                    <span className="text-gray-500 line-through mr-2">
                      Rs. {item.labelledPrice.toFixed(2)}
                    </span>
                    <span className="text-accent font-bold">
                      Rs. {item.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-accent font-bold">
                    Rs. {item.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg">
              <button
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-l-lg"
                onClick={() => changeQty(index, -1)}
              >
                <BiMinus size={18} />
              </button>
              <span className="px-4 font-medium">{item.qty}</span>
              <button
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-r-lg"
                onClick={() => changeQty(index, 1)}
              >
                <BiPlus size={18} />
              </button>
            </div>

            <div className="ml-6 w-24 text-right">
              <span className="font-bold text-gray-800">
                Rs. {(item.price * item.qty).toFixed(2)}
              </span>
            </div>

            <button
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
              onClick={() => removeFromCart(index)}
            >
              <BiTrash size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
