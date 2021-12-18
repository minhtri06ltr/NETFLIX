import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";

const Featured = () => {
  return (
    <div className="featured">
      <img
        width="100%"
        src="https://i.pinimg.com/originals/9c/74/52/9c7452da204cea4cb7a0f9a8ce12f126.jpg"
        alt=""
      />
      <div className="info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/95/Hololive_Production.png"
          alt=""
        />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet esse
          minima in commodi cum quis dolor repellendus dolorum unde? Ab. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          consectetur adipisci esse accusantium sapiente officiis soluta,
          explicabo voluptatem delectus quae!
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
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
