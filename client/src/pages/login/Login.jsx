import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  facebookLogin,
  githubLogin,
  googleLogin,
  login,
} from "../../actions/auth";
import "./login.scss";
import CircularProgress from "@mui/material/CircularProgress";
import ReCAPTCHA from "react-google-recaptcha";
import Toast from "../../components/modals/toast/Toast";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";

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
    setOpen(false);
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
  const responseGoogle = async (response) => {
    setOpen(false);
    const res = await dispatch(googleLogin(response.tokenId));
    if (!res.success) {
      setAlert({
        type: "error",
        message: res.message,
      });
      setOpen(true);
    } else {
      navigate("/");
    }
  };
  const responseFacebook = async (response) => {
    setOpen(false);
    const res = await dispatch(
      facebookLogin(response.userID, response.accessToken)
    );
    if (!res.success) {
      setAlert({
        type: "error",
        message: res.message,
      });
      setOpen(true);
    } else {
      navigate("/");
    }
  };
  const responseGithub = async (response) => {
    setOpen(false);

    const res = await dispatch(githubLogin(response.code));
    if (!res.success) {
      setAlert({
        type: "error",
        message: res.message,
      });
      setOpen(true);
    } else {
      console.log("true");
    }
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
            size="normal"
            data-theme="dark"
            sitekey="6LeKiv8dAAAAAOgIKw09Gxah4QiWTgat3o-8n53D"
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
            New to Netflix?
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
            <FacebookLogin
              appId="1057376915012807"
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <div
                  className="facebook"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <Facebook />
                </div>
              )}
            />

            <GoogleLogin
              clientId="1084168512136-ldd3bu07ir8hgal7rov98dgtthifdoeq.apps.googleusercontent.com"
              render={(renderProps) => (
                <div
                  className="google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <Google className="googleLogoColor" />
                </div>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <GitHubLogin
              clientId="97b37a75f5dd8e310837"
              onSuccess={responseGithub}
              onFailure={responseGithub}
              redirectUri=""
              scope="user"
              className="github"
            >
              <GitHub sx={{ fontSize: 40 }} />
            </GitHubLogin>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
