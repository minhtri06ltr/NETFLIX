import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import "./protectedroute.scss";
const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.loading || (!auth.auth && localStorage.getItem("auth"))) {
    return (
      <div className="spinnerContainer">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  } else
    return localStorage.getItem("auth") ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
