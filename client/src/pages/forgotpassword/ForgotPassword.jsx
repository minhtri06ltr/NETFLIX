import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./forgotpassword.scss";
import Toast from "../../components/modals/toast/Toast";

import CircularProgress from "@mui/material/CircularProgress";
const ForgotPassword = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(null);

  const [open, setOpen] = useState(false);

  return (
    <div className="register">
      {open && <Toast info={alert} open={open} setOpen={setOpen} />}
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link className="link" to="/login">
            <button className="loginButton">Sign in</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Forgot your password?</h1>
        <h2>Enter your email</h2>
        <div className="input">
          <input
            type="email"
            onChange={() => setOpen(false)}
            placeholder="Email address"
          />
          <button className="registerButton">
            {auth.loading ? (
              <CircularProgress style={{ color: "white", margin: "5px 0px" }} />
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
