import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import mp4 from "../../assets/mp4/mumei.mp4";

const Watch = () => {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
      </div>
      <video src={mp4} autoPlay progress controls className="video"></video>
    </div>
  );
};

export default Watch;
