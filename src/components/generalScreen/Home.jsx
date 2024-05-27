import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import SkeletonStory from "../Skeletons/SkeletonStory";
// import CardStory from "../StoryScreens/CardStory";
// import NoStories from "../StoryScreens/NoStories";
// import Pagination from "./Pagination";
import "../../Css/Home.css";

import { useNavigate } from "react-router-dom";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import { Carousel } from "antd";
const Home = () => {
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get("search");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  return (
    <div className="Inclusive-home-page">
      <div className="">
        <Carousel autoplay>
          <div className="h-96 w-full">
            <img src={banner1} alt="" className="w-full h-full" />
          </div>
          <div>
            <img src={banner2} alt="" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
