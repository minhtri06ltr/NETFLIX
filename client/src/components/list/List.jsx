import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItem from "../item/ListItem";
import "./list.scss";

const List = ({ list }) => {
  const [slideNumber, setSlideNumber] = useState(0);

  const [isMove, setIsMove] = useState(false);
  //get element by hook
  const listRef = useRef();
  const handleClick = (direction) => {
    //get component height, weight, position,...
    // - container margin
    setIsMove(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${260 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - window.innerWidth / 260) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        {isMove && (
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
          />
        )}
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => {
            return <ListItem index={index} key={index} item={item} />;
          })}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
