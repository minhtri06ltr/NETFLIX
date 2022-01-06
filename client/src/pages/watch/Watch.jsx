import "./watch.scss";
import { ArrowBackOutlined } from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";
const Watch = () => {
  const location = useLocation();

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
