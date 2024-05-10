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
import { getAllPost } from "../../apis/postApi";
import PostCard from "../card/PostCard";
import NoStories from "../card/NoStories";
const Home = () => {
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get("search");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchPosts = async () => {
    try {
      const response = await getAllPost();
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  // useEffect(() => {
  //   const getStories = async () => {

  //     setLoading(true)
  //     try {

  //       const { data } = await axios.get(`/story/getAllStories?search=${searchKey || ""}&page=${page}`)

  //       if (searchKey) {
  //         navigate({
  //           pathname: '/',
  //           search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
  //         });
  //       }
  //       else {
  //         navigate({
  //           pathname: '/',
  //           search: `${page > 1 ? `page=${page}` : ""}`,
  //         });

  //       }
  //       setStories(data.data)
  //       setPages(data.pages)

  //       setLoading(false)
  //     }
  //     catch (error) {
  //       setLoading(true)
  //     }
  //   }
  //   getStories()
  // }, [setLoading, search, page, navigate])

  // useEffect(() => {
  //   setPage(1)
  // }, [searchKey])
  console.log(posts);
  return (
    <div className="Inclusive-home-page">
      <div>
        <div className="story-card-wrapper">
          {posts.length !== 0 ? (
            posts?.map((post) => {
              return <PostCard key={uuidv4()} post={post} />;
            })
          ) : (
            <NoStories />
          )}
          <img className="bg-planet-svg" src="planet.svg" alt="planet" />
          <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
          <img className="bg-planet3-svg" src="planet3.svg" alt="planet" />
        </div>
        {/* <Pagination page={page} pages={pages} changePage={setPage} /> */}
      </div>

      <br />
    </div>
  );
};

export default Home;
