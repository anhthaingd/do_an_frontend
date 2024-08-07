import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getAllUser } from "../../apis/userApi";
import { toast } from "react-toastify";

const ManageUser = ({ type }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // [1
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userID, setUserID] = useState(null);
  const handleOk = async () => {
    setIsModalOpen(false);
    await deleteUser(userID);
    toast.success("Xóa người dùng thành công");
    // fetchMatch(date, locationID);
    fetchUser();
    navigate("/admin");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickDelete = (userID) => () => {
    setIsModalOpen(true);
    setUserID(userID);
  };
  const fetchUser = async () => {
    try {
      const response = await getAllUser();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Username",
      //   dataIndex: "name",
      key: "action",
      render: (data) => {
        return (
          <Link to={`/profile/${data.key}`} target="_blank">
            {data.username}
          </Link>
        );
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.NRrEYS-5-HeNRNH8qyscEwHaHw&pid=Api&P=0&h=180"
          alt="Avatar"
          style={{ width: "100px", height: "100px", borderRadius: "5px" }}
        />
      ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (user) => (
        <>
          <Button
            type="primary"
            ghost
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/profile/${user.key}`)}
            className="mb-2"
          >
            Xem
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={handleClickDelete(user.key)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];
  const data = users
    .filter((item) => item.role === type)
    .map((item) => ({
      key: item.id,
      username: item.username,
      fullName: item.firstName
        ? item.firstName + " " + item.lastName
        : "Chưa nhập tên",
      phone: item.phone,
      image: item.image,
      role: item.role === 0 ? "User" : "Manager",
    }));
  const deleteU = async (user) => {
    try {
      const response = await deleteUser(user.key);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="mr-5">
      <div
        style={{
          marginTop: "10px",
          border: "1px solid gray",
          borderRadius: "15px",
          padding: "20px",
          height: "auto",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <div className="mt-1">
          <Table
            columns={columns}
            dataSource={data}
            style={{ gap: "20px", height: "auto" }}
            pagination={{
              pageSize: 5,
              onChange: (page) => {},
            }}
            loading={false}
          />
        </div>
      </div>
      <Modal
        title="Bạn có chắc chắn muốn xóa người dùng này?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      ></Modal>
    </div>
  );
};

export default ManageUser;
