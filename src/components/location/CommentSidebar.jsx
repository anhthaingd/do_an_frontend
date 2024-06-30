import React, { useState, useEffect, useRef } from "react";
// import StoryComments from "./StoryComment";
import axios from "axios";
import "../../Css/AddComment.css";
import AddComment from "./AddComment";
import { getCommentsByLocationID } from "../../apis/commentLocationApi";
import StoryComments from "./StoryComment";
import { getCommentsByPostID } from "../../apis/commentPostApi";
import { getCommentsByUserPostID } from "../../apis/commentUserPostApi";
const CommentSidebar = ({
  locationID,
  sidebarShowStatus,
  setSidebarShowStatus,
  activeUser,
  numberRate,
  setCommentCount,
  isPost,
  isUserPost,
  aveStar,
}) => {
  const [count, setCount] = useState(0);
  const [commentList, setCommentList] = useState([]);

  const sidebarRef = useRef(null);

  const getLocationComments = async () => {
    if (isPost === false) {
      try {
        const response = await getCommentsByLocationID(locationID);
        if (response?.data) {
          setCommentList(response.data);
          setCount(response.data.length);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    } else if (isPost === true && isUserPost === false) {
      try {
        const response = await getCommentsByPostID(locationID);
        if (response?.data) {
          setCommentList(response.data);
          setCount(response.data.length);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    } else if (isPost === true && isUserPost === true) {
      try {
        const response = await getCommentsByUserPostID(locationID);
        console.log(response);
        if (response?.data) {
          setCommentList(response.data);
          setCount(response.data.length);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    getLocationComments();
    const checkIfClickedOutside = (e) => {
      if (
        sidebarShowStatus &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarShowStatus(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [sidebarShowStatus, count]);
  return (
    <div
      ref={sidebarRef}
      className={
        sidebarShowStatus
          ? "Inclusive-comment-sidebar visible"
          : "Inclusive-comment-sidebar hidden "
      }
    >
      <div className="sidebar-wrapper">
        <AddComment
          setSidebarShowStatus={setSidebarShowStatus}
          slug={locationID}
          getLocationComments={getLocationComments}
          activeUser={activeUser}
          count={count}
          numberRate={numberRate}
          setCommentCount={setCommentCount}
          isPost={isPost}
          aveStar={aveStar}
          isUserPost={isUserPost}
        />
        <StoryComments
          commentList={commentList}
          activeUser={activeUser}
          count={count}
          getLocationComments={getLocationComments}
          numberRate={numberRate}
          setCommentCount={setCommentCount}
          isPost={isPost}
          isUserPost={isUserPost}
        />
      </div>
    </div>
  );
};

export default CommentSidebar;
