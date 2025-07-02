
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // You should store this on login

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
