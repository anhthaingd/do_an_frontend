import React from "react";
import avatar from "../../images/avatar.jpg";
const PostCard = ({ post }) => {
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
  return (
    <div className="p-4 bg-white mb-4 rounded-md">
      <div className="flex items-center">
        <img src={avatar} alt="" className="w-10 rounded-full" />
        <div>
          <p className="ml-1 font-semibold " style={{ fontSize: "17px" }}>
            {post?.user.username}
          </p>
          <p className="ml-1 text-gray-500" style={{ fontSize: "13px" }}>
            {editDate(post.createdAt)}
          </p>
        </div>
      </div>
      {post.image ? (
        <div>
          <p>{post.content}</p>
          <img
            src={post.image}
            alt=""
            className="w-full h-5/6 rounded-md mt-4 "
          />
        </div>
      ) : (
        <div className="" style={{ height: "300px" }}>
          <div
            className="relative w-full h-full bg-cover bg-center rounded-md mt-4 "
            style={{
              backgroundImage: "linear-gradient(red, yellow, blue)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-black text-3xl font-bold">{post.content}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
