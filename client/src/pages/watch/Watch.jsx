import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import mp4 from "../../assets/mp4/ina.mp4";

const Watch = () => {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined /> Home
      </div>
      <video
        src={mp4}
        autoPlay
        progress="true"
        controls
        className="video"
      ></video>
    </div>
  );
};

export default Watch;
