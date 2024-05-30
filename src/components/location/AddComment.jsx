import React, { useState, useRef } from "react";
import axios from "axios";
// import StarRating from "./StarRating";
import { BsShieldCheck, BsCheckAll } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../Css/AddComment.css";
import StarRating from "./StarRating";
import { createComment } from "../../apis/commentLocationApi";
import { createCommentPost } from "../../apis/commentPostApi";
const AddComment = ({
  setSidebarShowStatus,
  slug,
  getLocationComments,
  activeUser,
  count,
  numberRate,
  setCommentCount,
  isPost,
}) => {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [star, setStar] = useState(0);
  const [starCurrentVal, setStarCurrentVal] = useState(0);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showStatus, setShowStatus] = useState(true);

  const handleSubmit = async (e) => {
    if (isPost === false) {
      e.preventDefault();
      try {
        const comment = {
          content,
          userID: activeUser.id,
          locationID: slug,
          star,
        };
        await createComment(comment);

        setSuccess("Add Comment successfully ");
        setTimeout(() => {
          setSuccess("");
        }, 2700);

        setTimeout(() => {
          // if (star !== 0) {
          //   document.querySelector(".rateCount").textContent = numberRate + 1;
          // }
          // document.querySelector(".commentCount").textContent = count + 1;
          setCommentCount(count + 1);
        }, 650);

        clearInputs();

        getLocationComments();
      } catch (error) {
        if (error.response.data.error === "Jwt expired") {
          console.log("token expired ...");
          navigate("/");
        }
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 4500);
      }
    } else {
      e.preventDefault();
      try {
        const comment = {
          content,
          userID: activeUser.id,
          postID: slug,
        };
        await createCommentPost(comment);

        setSuccess("Add Comment successfully ");
        setTimeout(() => {
          setSuccess("");
        }, 2700);

        setTimeout(() => {
          // if (star !== 0) {
          //   document.querySelector(".rateCount").textContent = numberRate + 1;
          // }
          // document.querySelector(".commentCount").textContent = count + 1;
          setCommentCount(count + 1);
        }, 650);

        clearInputs();

        getLocationComments();
      } catch (error) {
        if (error.response.data.error === "Jwt expired") {
          console.log("token expired ...");
          navigate("/");
        }
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 4500);
      }
    }
  };

  const clearInputs = () => {
    setStar(0);
    setStarCurrentVal(0);
    setContent("");
    textareaRef.current.textContent = "";
  };

  return (
    <>
      <div className="sidebar-top-block">
        <h3>
          Phản hồi ( <span className="sidebar-commentCount">{count}</span> ){" "}
        </h3>

        <div>
          <IoAdd
            onClick={() => setSidebarShowStatus(false)}
            className="ıoAddIcon"
          />
        </div>
      </div>

      {error && <div className="alert-error-message">{error}</div>}

      {
        <form className="addComment-form" onSubmit={handleSubmit}>
          {success && (
            <div className="alert-success-message">
              <BsCheckAll />
              {success}
            </div>
          )}

          <div
            className={
              showStatus
                ? "activeuser-info flex mt-1"
                : "activeuser-info hidden "
            }
          >
            <img
              src={
                "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
              }
              alt={activeUser?.username}
            />
            <span className="username mt-1">{activeUser?.username} </span>
          </div>

          <div className="textarea-wrapper">
            <div
              ref={textareaRef}
              contentEditable
              placeholder="Bạn đang nghĩ gì ?"
              id="comment"
              name="content"
              onKeyUp={(e) => {
                setContent(e.target.innerHTML);
              }}
              onFocus={() => setShowStatus(true)}
            ></div>
          </div>

          <div
            className={
              showStatus ? "form-bottom-block" : "form-bottom-block hidden"
            }
          >
            {isPost === false ? (
              <StarRating
                setStar={setStar}
                setStarCurrentVal={setStarCurrentVal}
                starCurrentVal={starCurrentVal}
              />
            ) : (
              ""
            )}

            <div className="formBtn-wrapper">
              <button
                type="button"
                className="cancel-Btn"
                onClick={() => setShowStatus(!showStatus)}
              >
                Hủy{" "}
              </button>
              <button
                type="submit"
                className={
                  content === "" ? "respond-Btn disable" : "respond-Btn"
                }
                disabled={content === "" ? true : false}
              >
                Bình luận{" "}
              </button>
            </div>
          </div>
        </form>
      }
    </>
  );
};

export default AddComment;
