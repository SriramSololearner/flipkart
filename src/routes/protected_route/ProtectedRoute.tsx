import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = localStorage.getItem("authToken");
  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;
