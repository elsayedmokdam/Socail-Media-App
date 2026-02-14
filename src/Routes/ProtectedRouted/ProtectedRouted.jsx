import { Navigate } from "react-router";

export default function ProtectedRouted({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}
