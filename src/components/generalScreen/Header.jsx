import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import "../../Css/Header.css";
import { RiPencilFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// import SkeletonElement from '../Skeletons/SkeletonElement';
// import { AuthContext } from '../../Context/AuthContext';
import * as actions from "../../store/actions";
import Modal from "antd/es/modal/Modal";
import { Button, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createGroup } from "../../apis/groupApi";
import { createMember } from "../../apis/memberApi";
import GroupSidebar from "../group/GroupSidebar";
import useQueryParams from "../../hooks/useQueryParams";
import { createInformation } from "../../apis/informationApi";
import { toast } from "react-toastify";
const Header = () => {
  const { queryParams, navigate } = useQueryParams();
  const userID = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const bool = localStorage.getItem("authToken") ? true : false;
  const { role } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState(bool);
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { activeUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const saveGroup = async (e) => {
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
      const img = !imageData.secure_url
        ? "https://www.clipartkey.com/mpngs/m/60-600299_group-clipart-youth-group-of-friends-animated.png"
        : imageData.secure_url;
      const group = {
        ownerID: userID,
        name,
        description,
        image: img,
      };
      try {
        const response = await createGroup(group);
        if (response.success) {
          setDescription("");
          setName("");
          setTest({ imgFile: null, imgSrc: "" });
          const data = { userID: parseInt(userID), groupID: response.data.id };
          const res = await createMember(data);
          toast.success("Tạo nhóm thành công");
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      saveGroup();
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setAuth(bool);
    setTimeout(() => {
      setLoading(false);
    }, 1600);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bool]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    dispatch(actions.logout());
    navigate("/");
  };
  // const handleChange = () => {
  //   navigate({
  //     pathname: "/cves/",
  //     search: createSearchParams({
  //       page: 1,
  //     }).toString(),
  //   });
  // };
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <header>
      <div className="averager">
        <Link to="/" className="logo">
          <h5>SPORTY TOWN</h5>
        </Link>
        <SearchForm />

        <div className="header_options">
          {isLoggedIn ? (
            <div className="auth_options">
              <button
                className="addStory-link pt-2"
                onClick={() => navigate("/search")}
              >
                Tìm kiếm người chơi
              </button>
              <button className="addStory-link pt-2" onClick={showModal}>
                Tạo nhóm mới
              </button>
              <button
                className="addStory-link pt-2 pb-2"
                onClick={() => navigate("/chat")}
              >
                Chat
              </button>
              <button
                className="addStory-link pt-2 pb-2"
                onClick={toggleSidebar}
              >
                Nhóm
              </button>
              <GroupSidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                dropdownRef={dropdownRef}
              />
              <div>
                {role == 1 ? (
                  <button
                    className="addStory-link pt-2"
                    onClick={() => navigate("/my_location")}
                  >
                    Sân của tôi
                  </button>
                ) : null}
              </div>

              <div className="header-profile-wrapper ">
                {/* {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                    <SkeletonElement type="minsize-avatar" />

                                } */}
                <img
                  src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                  alt="thai"
                />
                <div className="sub-profile-wrap  ">
                  <div>
                    <p
                      className="profile-link cursor-pointer flex items-center  "
                      onClick={() => navigate(`/profile/${userID}`)}
                    >
                      {" "}
                      <FaUserEdit style={{ fontSize: "20px" }} />{" "}
                      <p className=""> Profile </p>
                    </p>
                  </div>

                  <button
                    className="logout-btn flex items-center"
                    onClick={handleLogout}
                  >
                    {" "}
                    <BiLogOut style={{ fontSize: "20px" }} /> Thoát
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="noAuth_options">
              <Link className="login-link" to="/login">
                {" "}
                Login{" "}
              </Link>

              <Link className="register-link" to="/register">
                {" "}
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
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
        <Form
          // onSubmitCapture={(e) => saveLocation(e)}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
        >
          <Form.Item label="Name">
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </Form.Item>

          <Form.Item label="Image ">
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
              />
            ) : (
              <></>
            )}
            {/* {id && !test.imgSrc ? (
              <img style={{ width: 200, height: 100 }} src={image} alt="..." />
            ) : (
              <></>
            )} */}
          </Form.Item>
        </Form>
      </Modal>
    </header>
  );
};

export default Header;
