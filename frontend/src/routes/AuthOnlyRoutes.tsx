import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function AuthOnlyRoutes() {
  const token = getToken();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
