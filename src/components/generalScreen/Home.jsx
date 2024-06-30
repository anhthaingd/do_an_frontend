import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import SkeletonStory from "../Skeletons/SkeletonStory";
// import CardStory from "../StoryScreens/CardStory";
// import NoStories from "../StoryScreens/NoStories";
// import Pagination from "./Pagination";
import "../../Css/Home.css";
import sale from "../../images/sale.png";
import { useNavigate } from "react-router-dom";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import { Carousel } from "antd";
import { getAllLocation } from "../../apis/locationApi";
import MultipleLocation from "../location/MultipleLocation";
const Home = () => {
  const search = useLocation().search;
  const [listLocation, setListLocation] = useState([]);
  const fetchLocation = async () => {
    try {
      const response = await getAllLocation();
      setListLocation(response.data);
    } catch (error) {
      console.error("Fetch location error: ", error);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  const saleLocation = listLocation
    ?.filter((location) => location.sale !== null && location.sale > 0)
    .sort((a, b) => b.sale - a.sale) // Sắp xếp giảm dần theo thuộc tính sale
    .slice(0, 8);
  return (
    <div className="Inclusive-home-page">
      <div className="">
        <Carousel autoplay>
          <div className="h-96 w-full">
            <img src={banner1} alt="" className="w-full h-full" />
          </div>
          <div className="h-96 w-full">
            <img src={banner2} alt="" className="w-full h-full" />
          </div>
        </Carousel>
      </div>
      <div className=" pt-4 mb-5 pl-4">
        <div className="flex">
          <img src={sale} alt="" className="w-10 mr-1" />
          <span className="line-text text-3xl font-bold">Flash Sale</span>
        </div>
      </div>
      <MultipleLocation
        listLocation={saleLocation}
        className="border-2 border-red-500"
      />
    </div>
  );
};

export default Home;
