import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import "./listitem.scss";

const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 255 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        <div className="itemInfoTop">
          <span>1 hour 14 mins</span>
          <span className="limit">+16</span>
          <span>1999</span>
        </div>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          consequatur error cumque nihil natus necessitatibus ullam, dolorem
          autem repellendus. Officia.
        </div>
        <div className="genra">Action</div>
      </div>
    </div>
  );
};

export default ListItem;
