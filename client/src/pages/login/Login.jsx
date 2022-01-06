import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import "./login.scss";
import CircularProgress from "@mui/material/CircularProgress";
import ReCAPTCHA from "react-google-recaptcha";
import Toast from "../../components/modals/toast/Toast";
import { Facebook, GitHub, Google } from "@mui/icons-material";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [verifyCaptcha, setVerifyCaptcha] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const formChange = (e) => {
    setOpen(false);
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = async (e) => {
    e.preventDefault();

    if (loginForm.email === "" || loginForm.password === "") {
      setAlert({
        type: "warning",
        message: "Missing email or password",
      });
      setOpen(true);
    } else if (!verifyCaptcha) {
      setAlert({
        type: "warning",
        message: "Missing captcha",
      });
      setOpen(true);
    } else {
      const response = await dispatch(login(loginForm));

      if (!response.success) {
        setAlert({
          type: "error",
          message: response.message,
        });
        setOpen(true);
      } else {
        navigate("/");
      }
    }
  };
  const handleCaptcha = (value) => {
    setVerifyCaptcha(true);
  };

  return (
    <div className="login">
      {open && <Toast info={alert} open={open} setOpen={setOpen} />}
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
          <ReCAPTCHA
            style={{ margin: "0 auto" }}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptcha}
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
          <Link
            style={{ textAlign: "center", color: "tomato" }}
            to="/forgot-password"
            className="link"
          >
            <b>Forgot your password?</b>
          </Link>
          <div className="iconList">
            <div className="facebook">
              <Facebook />
            </div>
            <div className="google">
              <Google className="googleLogoColor" />
            </div>
            <div className="github">
              <GitHub sx={{ fontSize: 40 }} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
