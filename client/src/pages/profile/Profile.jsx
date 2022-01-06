import "./profile.scss";
import Topbar from "../../components/topbar/Topbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CameraAlt } from "@mui/icons-material";
const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const [profileForm, setProfileForm] = useState({
    email: auth.info.email,
    password: "",
    cfPassowrd: "",
    username: auth.info.username,
  });
  return (
    <div className="profilePage">
      <Topbar />
      <div className="profileContainer">
        <h1 className="containerTitle">Edit profile</h1>
        <div className="line"></div>
        <div className="center">
          <div className="centerLeft">
            <div className="avatar">
              <img src={auth.info.profileImg} alt="" />
              <label htmlFor="icon-button-file">
              <input
                  type="file"
                  accept="image/*"
                  id="icon-button-file"
                  style={{ display: "none" }}
                />
                <CameraAlt className="uploadIcon" />
                
              </label>
            </div>
          </div>
          <div className="centerRight">
            <form>
              <div className="field">
                <label htmlFor="">Email</label>
                <input type="email" value={profileForm.email} name="email" />
              </div>
              <div className="field">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  value={profileForm.username}
                  name="username"
                />
              </div>
              <div className="field">
                <label htmlFor="">Password</label>
                <input type="password" name="password" />
              </div>
              <div className="field">
                <label htmlFor="">Confirm password</label>
                <input type="password" name="cfPassword" />
              </div>
            </form>
          </div>
        </div>
        <div className="line"></div>
        <div className="bottom">
          <button className="updateButton">Update</button>
        </div>
        <small className="warning">
          *Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          eaque.
        </small>
      </div>
    </div>
  );
};

export default Profile;
