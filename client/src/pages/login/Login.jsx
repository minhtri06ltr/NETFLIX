import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import "./login.scss";
import CircularProgress from "@mui/material/CircularProgress";
import AlertModal from "../../components/modals/AlertModal";
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const formChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = (e) => {
    e.preventDefault();

    if (loginForm.email === "" || loginForm.password === "") {
      alert("Please check input again");
    } else {
      dispatch(login(loginForm));
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>

      <div className="container">
        {auth.error && <AlertModal message={auth.message} type="error" />}
        <form onSubmit={userLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            onChange={formChange}
            name="email"
            placeholder="Email or Phone number"
          />
          <input
            type="password"
            onChange={formChange}
            name="password"
            id=""
            placeholder="Password"
          />
          <button className="loginButton">
            {auth.loading ? (
              <CircularProgress
                style={{ height: "30px", width: "30px", margin: "5px 0px" }}
              />
            ) : (
              "Sign in"
            )}
          </button>
          <span>
            New to Netflix?{" "}
            <Link to="/register" className="link">
              <b>Sign up now</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot, <b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
