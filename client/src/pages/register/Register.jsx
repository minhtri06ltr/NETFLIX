import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./register.scss";
import Toast from "../../components/modals/toast/Toast";
import { register } from "../../actions/auth";
import CircularProgress from "@mui/material/CircularProgress";
const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const [open, setOpen] = useState(false);

  const emailRef = useRef();

  const formChange = (e) => {
    setAlert(null);
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleStart = async () => {
    const response = await dispatch(
      register({ email: emailRef.current.value })
    );

    if (!response.success) {
      setRegisterForm({
        ...registerForm,
        email: "",
      });

      setAlert({
        type: "error",
        message: response.message,
      });
      setOpen(true);
    } else {
      setRegisterForm({
        ...registerForm,
        email: emailRef.current.value,
      });
    }
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    if (registerForm.password === "" || registerForm.username === "") {
      setAlert({
        type: "warning",
        message: "Missing user name or password",
      });
      setOpen(true);
    }
    const response = await dispatch(register(registerForm));
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
  };

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
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!registerForm.email ? (
          <div className="input">
            <input
              type="email"
              onChange={() => setOpen(false)}
              placeholder="Email address"
              ref={emailRef}
            />
            <button className="registerButton" onClick={handleStart}>
              {auth.loading ? (
                <CircularProgress
                  style={{ color: "white", margin: "5px 0px" }}
                />
              ) : (
                "Get started"
              )}
            </button>
          </div>
        ) : (
          <form onSubmit={handleFinish} className="input">
            <input
              type="username"
              placeholder="User name"
              onChange={formChange}
              name="username"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={formChange}
              name="password"
            />
            <button className="registerButton">
              {auth.loading ? (
                <CircularProgress
                  style={{ color: "white", margin: "5px 0px" }}
                />
              ) : (
                "Register"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
