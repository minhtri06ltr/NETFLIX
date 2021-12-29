import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  //change element name to protected
  const auth = useSelector((state) => state.auth);
  return auth.auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
