import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./forgotpassword.scss";
import Toast from "../../components/modals/toast/Toast";

import CircularProgress from "@mui/material/CircularProgress";
import { forgotPassword } from "../../actions/auth";
const ForgotPassword = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClick = async () => {
    if (email === "") {
      setAlert({
        type: "warning",
        message: "Missing email",
      });
      setOpen(true);
    } else {
      const response = await dispatch(forgotPassword(email));
      if (!response.success) {
        setAlert({
          type: "error",
          message: response.message,
        });
        setOpen(true);
      } else {
        setAlert({
          type: "success",
          message: response.message,
        });
        setOpen(true);
      }
    }
  };
  return (
    <div className="forgotPassword">
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
            placeholder="Email address"
            onChange={(e) => {
              setOpen(false);
              setEmail(e.target.value);
            }}
          />
          <button className="verifyButton" onClick={handleClick}>
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
