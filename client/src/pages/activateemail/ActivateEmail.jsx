import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activateEmail } from "../../actions/auth";
import Toast from "../../components/modals/toast/Toast";
import "./activateemail.scss";
const ActivateEmail = () => {
  const [alert, setAlert] = useState(null);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const active = async () => {
      if (params.activationToken) {
        const response = await dispatch(activateEmail(params.activationToken));
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
    active();
  }, [params.activationToken, dispatch]);
  return (
    <div className="activeEmail">
      {open && <Toast info={alert} open={open} setOpen={setOpen} />}
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link className="link" to="/login">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivateEmail;
