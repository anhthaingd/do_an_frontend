import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import {
  MdOutlineWavingHand,
  MdWavingHand,
  MdDeleteOutline,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment } from "../../apis/commentLocationApi";
import { getLocationById } from "../../apis/locationApi";
import { deleteCommentPost } from "../../apis/commentPostApi";
// import { getPostById } from "../../apis/postApi";
// import { deleteComment } from "../../apis/commentApi";

const CommentItem = ({
  comment,
  activeUser,
  getLocationComments,
  count,
  numberRate,
  setCommentCount,
  isPost,
}) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [likeStatus, setLikeStatus] = useState(false);
  const [au, setAu] = useState("");
  const [location, setLocation] = useState({});
  const locationID = useParams().id;
  const userID = localStorage.getItem("userId");
  useEffect(() => {
    const getDetailLocation = async () => {
      const response = await getLocationById(locationID);
      // setPost(response.data);
    };
    getDetailLocation();
  }, []);

  const editDate = (createdAt) => {
    const now = new Date();
    const d = new Date(createdAt);
    const diff = now - d;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `Vừa xong`;
    } else if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      return `${days} ngày trước`;
    }
  };
  const handleDeleteComment = async () => {
    const comment_id = comment.id;
    if (isPost === false) {
      try {
        await deleteComment(comment_id);
        setTimeout(() => {
          // if (comment.star !== 0) {
          //   document.querySelector(".rateCount").textContent = numberRate - 1;
          // }
          // document.querySelector(".commentCount").textContent = count - 1;
          setCommentCount(count - 1);
        }, 650);
        getLocationComments();
      } catch (error) {
        console.log("delete fail");
      }
    } else {
      try {
        await deleteCommentPost(comment_id);
        setTimeout(() => {
          // if (comment.star !== 0) {
          //   document.querySelector(".rateCount").textContent = numberRate - 1;
          // }
          // document.querySelector(".commentCount").textContent = count - 1;
          setCommentCount(count - 1);
        }, 650);
        getLocationComments();
      } catch (error) {
        console.log("delete fail");
      }
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-top-block">
        <section>
          <img
            src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
            alt={comment.user?.username}
            width="35"
          />

          <div>
            <span className="comment-author-username">
              {comment.user?.username}
            </span>
            <span className="comment-createdAt">
              {editDate(comment.createdAt)}
            </span>
          </div>
        </section>

        <section>
          {activeUser?.id === comment?.user.id ? (
            <MdDeleteOutline onClick={() => handleDeleteComment()} />
          ) : null}
        </section>
      </div>

      <div className="comment-content">
        <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
      </div>

      <div className="comment-bottom-block">
        <div className="commentLike-wrapper">
          {/* <i className="biLike" onClick={() => handleCommentLike()}>
            {likeStatus ? <MdWavingHand /> : <MdOutlineWavingHand />}
          </i> */}
        </div>

        {isPost === false ? (
          <div className="comment-star flex">
            {[...Array(5)].map((_, index) => {
              return (
                <FaStar
                  key={index}
                  className="star"
                  size={15}
                  color={comment.star > index ? "#0205b1" : "grey"}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentItem;
