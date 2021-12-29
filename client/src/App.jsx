import "./app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import NotFound from "./pages/notfound/NotFound";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={auth.auth ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={auth.auth ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
