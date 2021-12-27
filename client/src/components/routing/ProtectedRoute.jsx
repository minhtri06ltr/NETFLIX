import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ element: Element, ...rest }) => {
  //change element name to protected
  const user = false;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
