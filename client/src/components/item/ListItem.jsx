import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import "./listitem.scss";

const ListItem = () => {
  return (
    <div className="listItem">
      <img
        src="https://i.pinimg.com/originals/9c/74/52/9c7452da204cea4cb7a0f9a8ce12f126.jpg"
        alt=""
      />
      <div className="itemInfo">
        <div className="icons">
          <PlayArrow />
          <Add />
          <ThumbUpAltOutlined />
          <ThumbDownAltOutlined />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
