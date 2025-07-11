import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Modal from "react-modal";
import {
  FiEye,
  FiPrinter,
  FiX,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiList,
  FiActivity,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setOrders(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          toast.error(
            "Error fetching orders: " +
              (e.response?.data?.message || "Unknown error")
          );
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="inline mr-1" />;
      case "pending":
        return <FiClock className="inline mr-1" />;
      case "cancelled":
        return <FiAlertCircle className="inline mr-1" />;
      default:
        return null;
    }
  };
  

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a751c9] focus:border-[rgb(144,47,193)] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2  focus:ring-[#a751c9] focus:border-[rgb(144,47,193)]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.orderId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {order.total.toLocaleString("en-LK", {
                            style: "currency",
                            currency: "LKR",
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setActiveOrder(order);
                              setIsModalOpen(true);
                            }}
                            className="text-[#a751c9] hover:text-[rgb(144,47,193)] mr-3 cursor-pointer"
                            title="View Details"
                          >
                            <FiEye className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No orders found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto my-12 p-8 outline-none transition-all duration-300 ease-in-out transform"
          overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-12 animate-fadeIn"
        >
          {activeOrder && (
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {" "}
                    <span className="text-[rgb(144,47,193)]">{activeOrder.orderId}</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(activeOrder.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                    <FiUser className="mr-2 text-[rgb(144,47,193)]" />
                    Customer Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start">
                      <FiUser className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-900">Name:</span>{" "}
                        {activeOrder.name}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <FiMail className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-900">
                          Email:
                        </span>{" "}
                        {activeOrder.email}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <FiPhone className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-900">
                          Phone:
                        </span>{" "}
                        {activeOrder.phone}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                      <span>
                        <span className="font-medium text-gray-900">
                          Address:
                        </span>{" "}
                        {activeOrder.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200/50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                    <FiShoppingBag className="mr-2 text-[rgb(144,47,193)]" />
                    Order Summary
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 flex items-center">
                        <FiActivity className="mr-2 text-gray-400" />
                        Status:
                      </span>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`font-semibold px-2 py-1 rounded-full text-sm ${
                            activeOrder.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : activeOrder.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getStatusIcon(activeOrder.status)}
                          {activeOrder.status.charAt(0).toUpperCase() +
                            activeOrder.status.slice(1)}
                        </span>
                        <select
                          onChange={async (e) => {
                            const updatedValue = e.target.value;
                            try {
                              const token = localStorage.getItem("token");
                              await axios.put(
                                import.meta.env.VITE_BACKEND_URL +
                                  "/api/orders/" +
                                  activeOrder.orderId +
                                  "/" +
                                  updatedValue,
                                {},
                                {
                                  headers: {
                                    Authorization: "Bearer " + token,
                                  },
                                }
                              );

                              setIsLoading(true);
                              const updatedOrder = { ...activeOrder };
                              updatedOrder.status = updatedValue;
                              setActiveOrder(updatedOrder);
                            } catch (e) {
                              toast.error("Error updating order status");
                              console.log(e);
                            }
                          }}
                          className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[rgb(144,47,193)]"
                        >
                          <option selected disabled>
                            Change status
                          </option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="returned">Returned</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        Subtotal:
                      </span>
                      <span>
                        {activeOrder.total.toLocaleString("en-LK", {
                          style: "currency",
                          currency: "LKR",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        Shipping:
                      </span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="font-bold text-[rgb(144,47,193)]">
                        {activeOrder.total.toLocaleString("en-LK", {
                          style: "currency",
                          currency: "LKR",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiList className="mr-2 text-[rgb(144,47,193)]" />
                  Order Items
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeOrder.products.map((item, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <img
                                  className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                  src={item.productInfo.images[0]}
                                  alt={item.productInfo.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.productInfo.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  SKU: {item.productInfo.sku || "N/A"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.productInfo.price.toLocaleString("en-LK", {
                              style: "currency",
                              currency: "LKR",
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {(
                              item.productInfo.price * item.quantity
                            ).toLocaleString("en-LK", {
                              style: "currency",
                              currency: "LKR",
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(144,47,193)] transition-all duration-200 cursor-pointer"
                >
                  <FiPrinter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Print
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[rgb(144,47,193)] to-[rgb(149,65,190)] hover:from-[rgb(146,56,190)] hover:to-[rgb(144,47,193)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(144,47,193)] transition-all duration-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
