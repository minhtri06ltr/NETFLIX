import Featured from "../../components/featured/Featured";
import Topbar from "../../components/topbar/Topbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Topbar />

      <Featured />
    </div>
  );
};

export default Home;
