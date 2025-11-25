import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    // redirect to correct login
    const loginPath =
      allowedRole === "BANKER" ? "/banker/login" : "/customer/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (role !== allowedRole) {
    return <div className="card">Unauthorized: Wrong role.</div>;
  }

  return children;
};

export default ProtectedRoute;
