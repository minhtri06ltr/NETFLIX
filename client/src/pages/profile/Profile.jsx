import "./profile.scss";
import Topbar from "../../components/topbar/Topbar";
import { useSelector } from "react-redux";
import { CameraAltOutlined } from "@mui/icons-material";
const Profile = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="profilePage">
      <Topbar />
      <div className="profileContainer">
        <h1 className="containerTitle">Edit profile</h1>
        <div className="line"></div>
        <div className="center">
          <div className="centerLeft">
            <img src={auth.info.profileImg} alt="" className="avatar" />
            <CameraAltOutlined className="uploadIcon" />
          </div>
          <div className="centerRight">
            <form>
              <div className="field">
                <label htmlFor="">Email</label>
                <input type="email" name="email" />
              </div>
              <div className="field">
                <label htmlFor="">Username</label>
                <input type="text" name="username" />
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
