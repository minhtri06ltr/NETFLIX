import "./watch.scss";
import { ArrowBackOutlined } from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";
const Watch = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined /> Home
        </div>
      </Link>
      <iframe
        className="video"
        src="https://www.youtube.com/embed/sYF3SiX5-WY"
        title={location.state.movie._id}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Watch;
