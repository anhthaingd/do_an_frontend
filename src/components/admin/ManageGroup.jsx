import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { deleteGroup, getAllGroup } from "../../apis/groupApi";
import { Link, useNavigate } from "react-router-dom";
import { getMemberByGroupID } from "../../apis/memberApi";
import { toast } from "react-toastify";

const ManageGroup = () => {
  const [groups, setGroups] = useState([]);
  const [listMember, setListMember] = useState([]);
  const [count, setCount] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupID, setGroupID] = useState(null);
  const handleOk = async () => {
    setIsModalOpen(false);
    await deleteGroup(groupID);
    toast.success("Xóa nhóm thành công");
    // fetchMatch(date, locationID);
    fetchGroup();
    navigate("/admin");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickDelete = (groupID) => () => {
    setIsModalOpen(true);
    setGroupID(groupID);
  };
  const fetchGroup = async () => {
    try {
      const response = await getAllGroup();
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountMember = async (groupID) => {
    const response = await getMemberByGroupID(groupID);
    return response.data.length;
  };
  const columns = [
    {
      title: "Tên nhóm",
      key: "action",
      render: (data) => {
        return (
          <Link to={`/group/${data.id}`} target="_blank">
            {data.name}
          </Link>
        );
      },
    },
    {
      title: "Quản trị viên",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    // {
    //   title: "Số lượng thành viên",
    //   key: "action",
    //   render: (data) => {
    //     fetchCountMember(data.id)
    //       .then((ketQua) => {
    //         return ketQua;
    //       })
    //       .catch((error) => {
    //         console.error("Lỗi khi lấy số lượng thành viên:", error);
    //       });
    //   },
    // },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (data) => (
        <img
          src={data}
          style={{ width: "100px", height: "100px", borderRadius: "5px" }}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (group) => (
        <>
          <Button
            type="primary"
            ghost
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/group/${group.id}`)}
            className="mb-2"
          >
            Xem
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={handleClickDelete(group.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];
  const data = groups.map((item) => ({
    id: item.id,
    name: item.name,
    ownerName: item.owner.username,
    image: item.image,
  }));
  useEffect(() => {
    fetchGroup();
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
        title="Bạn có chắc chắn muốn xóa nhóm này?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      ></Modal>
    </div>
  );
};

export default ManageGroup;
