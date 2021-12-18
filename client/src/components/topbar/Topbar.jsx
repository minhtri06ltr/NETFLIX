import "./topbar.scss";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
const Topbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <span className="">Homepage</span>
          <span className="">Series</span>
          <span className="">Movies</span>
          <span className="">New and Popular</span>
          <span className="">My List</span>
        </div>
        <div className="right">
          <Search className="topbar-icon" />
          <span>KID</span>
          <Notifications className="topbar-icon" />
          <img
            src="https://i.pinimg.com/originals/9c/74/52/9c7452da204cea4cb7a0f9a8ce12f126.jpg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="topbar-icon" />
            <div className="options">
              <span>Settings</span>
              <span>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
