import { useEffect } from "react";
import { useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Topbar from "../../components/topbar/Topbar";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  //get list
  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
        );
        if (res.data.success) {
          setLists(res.data.list);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]); //when we change type or genra useEffect will trigger

  return (
    <div className="home">
      <Topbar />

      <Featured type={type} setGenre={setGenre} />

      {lists.map((list, index) => {
        return <List list={list} key={index} />;
      })}
    </div>
  );
};

export default Home;
