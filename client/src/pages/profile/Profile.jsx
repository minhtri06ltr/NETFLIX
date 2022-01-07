import "./profile.scss";
import Topbar from "../../components/topbar/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Toast from "../../components/modals/toast/Toast";
import CircularProgress from "@mui/material/CircularProgress";
import { CameraAlt } from "@mui/icons-material";
import { changeImg, updateProfile } from "../../actions/user";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const [profileForm, setProfileForm] = useState({
    password: "",
    cfPassword: "",
    img: "",
    username: "",
  });

  const profileFormChange = (e) => {
    setOpen(false);
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeImg = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    setLoading(true);
    const response = await dispatch(changeImg(formData));
    if (!response.success) {
      setLoading(false);

      setAlert({
        type: "error",
        message: response.message,
      });
      setOpen(true);
    } else {
      setLoading(false);
      setPreview(response.url);
      setAlert({
        type: "success",
        message: response.message,
      });
      setOpen(true);
    }
  };
  const updateInfo = async () => {
    setLoading(true);
    const response = await dispatch(
      updateProfile({
        username: profileForm.username
          ? profileForm.username
          : auth.info.username,
        profileImg: preview ? preview : auth.info.profileImg,
      })
    );
    if (!response.success) {
      setLoading(false);
      setAlert({
        type: "error",
        message: response.message,
      });
      setOpen(true);
    } else {
      setLoading(false);
      setAlert({
        type: "success",
        message: response.message,
      });
      setOpen(true);
    }
  };
  const updatePassword = async () => {
    if (
      (profileForm.password !== profileForm.cfPassword &&
        profileForm.password !== "") ||
      (profileForm.password !== profileForm.cfPassword &&
        profileForm.cfPassword.length !== 0)
    ) {
      setAlert({
        type: "warning",
        message: "Password or confirm password incorrect",
      });
      setOpen(true);
    } else {
      setLoading(true);
      const response = await dispatch(
        updateProfile({ password: profileForm.password })
      );
      if (!response.success) {
        setLoading(false);
        setAlert({
          type: "error",
          message: response.message,
        });
        setOpen(true);
      } else {
        setLoading(false);
        setAlert({
          type: "success",
          message: response.message,
        });
        setOpen(true);
      }
    }
  };
  const handleUpdate = () => {
    setOpen(false);
    if (profileForm.password || profileForm.cfPassword) updatePassword();
    if (preview || profileForm.username) updateInfo();
  };
  return (
    <div className="profilePage">
      {open && <Toast info={alert} open={open} setOpen={setOpen} />}
      <Topbar />
      <div className="profileContainer">
        <h1 className="containerTitle">Edit profile</h1>
        <div className="line"></div>
        <div className="center">
          <div className="centerLeft">
            <div className="avatar">
              <img src={preview ? preview : auth.info.profileImg} alt="" />
              <label htmlFor="icon-button-file">
                <input
                  type="file"
                  accept="image/*"
                  id="icon-button-file"
                  style={{ display: "none" }}
                  name="img"
                  onChange={handleChangeImg}
                />
                <CameraAlt className="uploadIcon" />
              </label>
            </div>
          </div>
          <div className="centerRight">
            <form>
              <div className="field">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  defaultValue={auth.info.email}
                  name="email"
                  disabled
                />
              </div>
              <div className="field">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  defaultValue={auth.info.username}
                  name="username"
                  onChange={profileFormChange}
                />
              </div>
              <div className="field">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={profileFormChange}
                />
              </div>
              <div className="field">
                <label htmlFor="">Confirm password</label>
                <input
                  type="password"
                  name="cfPassword"
                  onChange={profileFormChange}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="line"></div>
        <div className="bottom">
          <button
            className="updateButton"
            disable={`${loading}`}
            onClick={handleUpdate}
          >
            {loading ? (
              <CircularProgress
                style={{
                  color: "black",
                  margin: "0px",
                  height: "30px",
                  width: "30px",
                }}
              />
            ) : (
              "Update"
            )}
          </button>
        </div>
        <small className="warning">
          *If you update your password here, you won't be able to login quickly
          using Google, Facebook or Github.
        </small>
      </div>
    </div>
  );
};

export default Profile;
