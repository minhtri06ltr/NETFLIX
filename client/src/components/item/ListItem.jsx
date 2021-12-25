import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../helpers/constants";
import { Link } from "react-router-dom";
import "./listitem.scss";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getMovie = async () => {
      try {
        const res = await userRequest.get(`/movies/find/${item}`, {
          signal: signal,
        });

        if (res.data.success) {
          setMovie(res.data.movie);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
    return () => controller.abort();
  }, []);

  return (
    <Link to="/watch" state={{ movie: movie }}>
      <div
        className="listItem"
        //absolute with list and move to away from left = item width to center preview
        style={{ left: isHovered && index * 255 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
