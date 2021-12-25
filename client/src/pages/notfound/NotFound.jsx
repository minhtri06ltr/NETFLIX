import { ArrowBack } from "@material-ui/icons";
import "./notfound.scss";

const NotFound = () => {
  return (
    <div className="notFound">
      <img
        src="https://klizos.com/wp-content/uploads/funny-404-error-page-GIF-klizo-solutions.gif"
        alt=""
      />
      <button>
        <ArrowBack className="homeIcon" /> Home
      </button>
    </div>
  );
};

export default NotFound;
