import { Navigate } from "react-router";

export default function AuthProtectedRouted({ children }) {
  return localStorage.getItem("token") ? <Navigate to="/posts" /> : children;
}
