import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../item/ListItem";
import "./list.scss";

const List = () => {
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
    if (direction === "right" && slideNumber <= 6) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        {isMove && (
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
          />
        )}
        <div className="container" ref={listRef}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
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
