import React, { useEffect, useState } from "react";
import avatar from "../../images/avatar.jpg";
import {
  AimOutlined,
  CommentOutlined,
  LikeOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import {
  createLikePost,
  deleteLikePost,
  getLikeByPostID,
} from "../../apis/likePost";
import { useParams } from "react-router-dom";
import { getUserById } from "../../apis/userApi";
import CommentSidebar from "../location/CommentSidebar";
import { getCommentsByPostID } from "../../apis/commentPostApi";
import { getMatchByID } from "../../apis/matchApi";
import EditableField from "../modal/EditableField";
const PostItem = ({ post }) => {
  const userID = localStorage.getItem("userId");
  const [activeUser, setActiveUser] = useState({});
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [detailMatch, setDetailMatch] = useState({});
  const fetchActiveUser = async () => {
    try {
      const response = await getUserById(userID);
      setActiveUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  const fetchCountLike = async () => {
    const response = await getLikeByPostID(post.id);
    const isLikedArray = response.data.map((like) => {
      return like.userID == activeUser.id && like.postID == post.id;
    });
    const isLiked = isLikedArray.some((liked) => liked);
    setLikeStatus(isLiked);
    setLikeCount(response.data.length);
  };
  const handleLike = async () => {
    const data = { userID: activeUser.id, postID: post.id };
    if (likeStatus === false) {
      await createLikePost(data);
    } else {
      await deleteLikePost(data);
    }
    // setTimeout(() => {
    //   setLikeStatus(!likeStatus);
    // }, 1500);
    setLikeStatus(!likeStatus);
    fetchCountLike();
  };
  const getPostComments = async () => {
    try {
      const { data } = await getCommentsByPostID(post.id);
      if (data) {
        setCommentCount(data.length);
        const filteredData = data.filter((comment) => comment.star !== 0);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  const fetchDetailMatch = async () => {
    try {
      const response = await getMatchByID(post?.matchID);
      setDetailMatch(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(detailMatch);
  useEffect(() => {
    fetchActiveUser();
    fetchCountLike();
    getPostComments();
    fetchDetailMatch();
  }, [likeCount]);

  return (
    <div className="p-4 bg-white mb-4 rounded-md">
      <div className="flex items-center">
        <img src={avatar} alt="" className="w-10 rounded-full" />
        <div>
          <p className="ml-1 font-semibold " style={{ fontSize: "17px" }}>
            {post?.writer?.username}
          </p>
          <p className="ml-1 text-gray-500" style={{ fontSize: "13px" }}>
            {editDate(post.createdAt)}
          </p>
        </div>
      </div>
      {post.matchID ? (
        <div className="" style={{ height: "370px" }}>
          <div className="relative w-full h-full bg-cover bg-center rounded-md mt-4 bg-blue-500 ">
            <div className="mb-4 p-2">
              <p className="text-lg font-bold text-white">
                {detailMatch?.location?.name} ({detailMatch?.playground?.name})
              </p>
              <div className="flex items-center mt-2 text-white">
                <AimOutlined
                  className=" text-white"
                  style={{ fontSize: "20px" }}
                />
                <p className=" ml-2">
                  {detailMatch?.location?.location_detail}
                </p>
              </div>
              <div className="flex justify-center mb-4 pt-2">
                <p className="text-lg font-semibold text-white">
                  Thông tin trận đấu
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <EditableField
                  label="Chủ nhà"
                  value={detailMatch?.owner?.username}
                  canEdit={false}
                />
                <EditableField
                  label="Đối thủ"
                  value={detailMatch?.opponent?.username}
                  canEdit={false}
                />
                <EditableField
                  label="Tỉ số"
                  value={detailMatch?.result}
                  canEdit={false}
                />
                <EditableField
                  label="Thời gian"
                  value={`${detailMatch?.start_time} - ${detailMatch?.end_time}`}
                  canEdit={false}
                />
                <EditableField label="Giá" value={detailMatch?.price} />
                <EditableField
                  label="Ghi chú"
                  value={detailMatch?.note}
                  canEdit={false}
                />
              </div>
            </div>
          </div>
        </div>
      ) : post.image ? (
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
              <h1 className="text-black text-3xl font-bold">{post?.content}</h1>
            </div>
          </div>
        </div>
      )}
      {/* {post.image ? (
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
              <h1 className="text-black text-3xl font-bold">{post?.content}</h1>
            </div>
          </div>
        </div>
      )} */}
      <div className="border-2 pb-2 border-b-gray-300">
        {/* <div className="flex justify-between pt-1">
          <div className="flex pl-4">
            <LikeTwoTone style={{ fontSize: "20px" }} />

            {likeStatus === true ? (
              <p className="font-semibold text-gray-800 ml-1">
                Bạn và {likeCount - 1} người khác
              </p>
            ) : (
              <p className="font-semibold text-gray-800 ml-1">{likeCount}</p>
            )}
          </div>
          <div className="flex">
            <p className="font-semibold text-gray-800 mr-1">{commentCount}</p>
            <CommentOutlined style={{ fontSize: "20px" }} className="pr-5" />
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-2 border-2 border-b-gray-300">
        {/* <div className=" p-1 rounded-md" onClick={handleLike}>
          {likeStatus ? (
            <div className="flex justify-center items-center cursor-pointer hover:bg-gray-300 p-1 rounded-md">
              <LikeOutlined style={{ fontSize: "24px", color: "blue" }} />
              <p className="font-semibold ml-1 text-blue-800">Thích</p>
            </div>
          ) : (
            <div className="flex justify-center items-center cursor-pointer hover:bg-gray-300 p-1 rounded-md">
              <LikeOutlined style={{ fontSize: "24px" }} />
              <p className="font-semibold ml-1">Thích</p>
            </div>
          )}
        </div>
        <div
          className="flex justify-center items-center cursor-pointer hover:bg-gray-300 p-1 rounded-md"
          onClick={() => {
            setSidebarShowStatus(!sidebarShowStatus);
          }}
        >
          <CommentOutlined style={{ fontSize: "24px" }} />
          <p className="font-semibold ml-1">Bình luận</p>
        </div>
        <div className="CommentFieldEmp">
          <CommentSidebar
            locationID={post.id}
            sidebarShowStatus={sidebarShowStatus}
            setSidebarShowStatus={setSidebarShowStatus}
            activeUser={activeUser}
            setCommentCount={setCommentCount}
            isPost={true}
          />
        </div> */}
      </div>
    </div>
  );
};

export default PostItem;
