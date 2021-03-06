import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";
import axios from "axios";
const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          signal: signal,
        });
        if (res.data.success) {
          setContent(res.data.movie[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
    return () => controller.abort();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="Suisei">Suisei</option>
            <option value="Fubuki">Fubuki</option>
            <option value="Ina">Ina</option>
            <option value="Calli">Calli</option>
            <option value="Rushia">Rushia</option>
            <option value="Ayame">Ayame</option>
            <option value="Laphus">Laphus</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link to="/watch" state={{ movie: content }} className="link">
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
