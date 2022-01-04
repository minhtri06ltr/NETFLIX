import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./resetpassword.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../../components/modals/toast/Toast";
import { resetPassowrd } from "../../actions/auth";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const params = useParams();
    const auth = useSelector(state=>state.auth)
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [resetForm, setResetForm] = useState({
    password: "",
    cfPassword: "",
  });
  const resetFormChange = (e) => {
    setOpen(false);
    setResetForm({
      ...resetForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetForm.password !== resetForm.cfPassword) {
      setAlert({
        type: "warning",
        message: "Password and confirm password incorrect",
      });
      setOpen(true);
    } else if (resetForm.password === "" || resetForm.cfPassword === "") {
      setAlert({
        type: "warning",
        message: "Missing password or confirm password",
      });
      setOpen(true);
    } else {
      const response = await dispatch(resetPassowrd(resetForm.password,params.resetToken));
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
    <div className="resetPassword">
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
        <form onSubmit={handleSubmit}>
          <h1>Reset your password</h1>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={resetFormChange}
          />
          <input
            type="password"
            name="cfPassword"
            id=""
            placeholder="Confirm password"
            onChange={resetFormChange}
          />

          <button className="resetButton">
            {auth.loading ? <CircularProgress style={{ color: "white" }} /> : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
