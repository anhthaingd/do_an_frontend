import { Avatar, Form } from "antd";
import React, { useEffect, useState } from "react";
import avatar from "../../images/avatar.jpg";
import { FileImageTwoTone } from "@ant-design/icons";
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getUserById } from "../../apis/userApi";
import { useParams } from "react-router-dom";
import { createPost, getPostByGroupID } from "../../apis/postApi";
import PostCard from "../cards/PostCard";

const ListPost = ({ group }) => {
  const userID = localStorage.getItem("userId");
  const groupID = useParams().id;
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      savePost();
      // window.location.reload();
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchUser = async () => {
    try {
      const response = await getUserById(userID);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPost = async () => {
    try {
      const response = await getPostByGroupID(groupID);
      setPostList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [test, setTest] = useState({ imgFile: null, imgSrc: "" });
  const handleChangeFile = (e) => {
    // Lấy file từ event
    let file = e.target.files[0];
    setTest({ imgFile: file, imgSrc: "" });

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setTest({ imgFile: file, imgSrc: e.target.result });
      };
    }
  };
  const [file, setFile] = useState("");
  const savePost = async (e) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "jay3krzh");
      data.append("cloud_name", "dshzlfayf");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dshzlfayf/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const imageData = await res.json();
      const img = !imageData.secure_url ? null : imageData.secure_url;
      const post = {
        userID: userID,
        groupID: groupID,
        content,
        image: img,
      };
      try {
        const response = await createPost(post);
        if (response.success) {
          fetchPost();
          setContent("");
          setTest({ imgFile: null, imgSrc: "" });
        }
        // openNotificationWithIcon(
        //   "SUCCESS",
        //   "Successfully created a new attack",
        //   "success"
        // );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPost();
  }, []);
  return (
    <div>
      <div className="flex ">
        <div className="w-2/3 pr-3 ">
          <div className="border-2 border-gray-200 rounded-lg p-2 bg-white ">
            <div className=" flex items-center  pb-3 p-2">
              <img src={avatar} alt="Football" className="rounded-full w-10" />
              <div className="ml-3 text-lg text-gray-500  w-full">
                <button
                  className="p-1 hover:bg-gray-200 w-full rounded-lg text-left"
                  onClick={showModal}
                >
                  Bạn viết gì đi....
                </button>
              </div>
            </div>
            <div
              className="flex justify-center items-center p-2 border-t-2 cursor-pointer"
              onClick={showModal}
            >
              <FileImageTwoTone style={{ fontSize: "25px" }} />
              <p className="text-gray-500 font-semibold ml-1">Ảnh</p>
            </div>
          </div>
          <div className="pt-6">
            {postList.map((item, index) => {
              return (
                <div key={index} className="gap-2  " style={{ zIndex: 20 }}>
                  <PostCard post={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/3 pb-3">
          <div className="p-3 border-2 border-gray-200 rounded-lg bg-white">
            <p className="font-semibold text-lg">Giới thiệu</p>
            <p className="pb-2">{group.description}</p>
            <div className=" flex text-center justify-center bg-gray-300 rounded-lg">
              <button className="p-2 font-medium">Tìm hiểu thêm</button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="flex justify-center text-xl font-semibold">
            Tạo bài viết
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        footer={[
          <Button
            key="link"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: "#1677ff" }}
            loading={loading}
          >
            Tạo
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <div className="flex items-center">
          <img src={avatar} alt="" className="w-10 rounded-full" />
          <p className="ml-1 font-semibold">{user?.username}</p>
        </div>
        <div className="pt-4 pb-4">
          <TextArea
            className="pt-2"
            placeholder="Tạo bài viết ...."
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          name="url"
          placeholder="Choose file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            handleChangeFile(e);
          }}
        />
        <br />
        {test.imgSrc ? (
          <img
            style={{ width: 100, height: 100 }}
            src={test.imgSrc}
            alt="..."
            className="pt-2"
          />
        ) : (
          <></>
        )}
        {/* {id && !test.imgSrc ? (
          <img style={{ width: 200, height: 100 }} src={image} alt="..." />
        ) : (
          <></>
        )} */}
      </Modal>
    </div>
  );
};

export default ListPost;
