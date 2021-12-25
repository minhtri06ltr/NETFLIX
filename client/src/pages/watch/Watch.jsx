import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";

import { Link, useLocation } from "react-router-dom";
const Watch = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined /> Home
        </div>
      </Link>
      <video
        src={location.state.movie.video}
        autoPlay
        progress="true"
        controls
        className="video"
      ></video>
    </div>
  );
};

export default Watch;
