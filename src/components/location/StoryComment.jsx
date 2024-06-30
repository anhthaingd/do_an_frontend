import React from "react";
import CommentItem from "./CommentItem";
import "../../Css/StoryComments.css";

const StoryComments = ({
  commentList,
  count,
  activeUser,
  getLocationComments,
  numberRate,
  setCommentCount,
  isPost,
  isUserPost
}) => {
  return (
    <>
      {count !== 0 ? (
        <div className="storyComments">
          <h5>Bình luận mới nhất</h5>
          <div className="comment-Wrapper">
            {commentList.map((comment) => {
              return (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  activeUser={activeUser}
                  getLocationComments={getLocationComments}
                  count={count}
                  numberRate={numberRate}
                  setCommentCount={setCommentCount}
                  isPost={isPost}
                  isUserPost={isUserPost}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-response">
          Chưa có bình luận nào. Hãy là người đầu tiên.{" "}
        </div>
      )}
    </>
  );
};

export default StoryComments;
