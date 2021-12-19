import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Topbar from "../../components/topbar/Topbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Topbar />

      <Featured />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
