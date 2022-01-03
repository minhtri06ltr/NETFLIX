import "./topbar.scss";
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
const Topbar = () => {
  const auth = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  //when we scroll -> trigger this function
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    //reset
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "topbar scrolled" : "topbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span className="">New and Popular</span>
          <span className="">My List</span>
        </div>
        <div className="right">
          <Search className="topbar-icon" />
          <span>KID</span>
          <Notifications className="topbar-icon" />
          <img src={auth.info.profileImg} alt="" />
          <div className="profile">
            <ArrowDropDown className="topbar-icon" />
            <div className="options">
              <span>Profile</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
