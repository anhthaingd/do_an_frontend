import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../apis/groupApi";
import { Button, Tabs } from "antd";
import ListPost from "../components/group/ListPost";
import ListMember from "../components/group/ListMember";
import ownerPNG from "../images/owner.png";
import avatar from "../images/avatar.jpg";
import {
  createMember,
  deleteMember,
  getMemberByGroupID,
} from "../apis/memberApi";
import "../Css/Group.css";
import { list } from "postcss";
const Group = () => {
  const groupID = useParams().id;
  const [group, setGroup] = useState({});
  const userID = localStorage.getItem("userId");
  const [joinStatus, setJoinStatus] = useState(false);
  const [totalMember, setTotalMember] = useState(0);
  const [listMember, setListMember] = useState([]);
  const fetchGroup = async () => {
    try {
      const response = await getGroupById(groupID);
      setGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountMember = async () => {
    try {
      const response = await getMemberByGroupID(groupID);
      setListMember(response.data);
      const isJoinedArray = response.data.map((join) => {
        return join.userID == userID && join.groupID == groupID;
      });
      const isJoined = isJoinedArray.some((joined) => joined);
      setJoinStatus(isJoined);
      setTotalMember(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoin = async () => {
    const data = { userID: parseInt(userID), groupID };
    if (joinStatus === false) {
      await createMember(data);
    } else {
      await deleteMember(data);
    }
    // setTimeout(() => {
    //   setLikeStatus(!likeStatus);
    // }, 1500);
    setJoinStatus(!joinStatus);
    fetchCountMember();
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    fetchGroup();
    fetchCountMember();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [totalMember, groupID]);
  const items = [
    {
      key: "1",
      label: "Bài viết",
      children: <ListPost group={group} />,
    },
    {
      key: "2",
      label: "Thành viên",
      children: <ListMember listMember={listMember} group={group} />,
    },
  ];
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };
  return (
    <div>
      <div
        className="flex justify-center bgOfGroup"
        // style={{ backgroundColor: "#e5ecf7" }}
      >
        <div className="flex">
          <div style={{ width: "940px" }}>
            <img
              src={group.image}
              className="border-2 border-blue-500 rounded "
              style={{ width: "940px", height: "300px" }}
              alt=""
            />
            <div className="flex justify-between">
              <div className="w-1/2">
                <p className="text-2xl font-bold pt-3">{group.name}</p>
                <p>{totalMember} thành viên</p>
                <div className="flex items-center space-x-2">
                  {listMember.slice(0, 5).map((member, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={member.user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ))}
                  {listMember.length > 5 && (
                    <div className="relative">
                      <div
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        +{listMember.length - 5}
                      </div>
                      {isTooltipVisible && (
                        <div className="absolute top-12 left-0 w-40 bg-white shadow-lg rounded-md p-2 z-10">
                          {listMember.slice(5).map((member, index) => (
                            <div key={index} className="text-sm text-gray-700">
                              {member.user.username}
                            </div>
                          ))}
                          <div className="text-sm text-gray-700">
                            {listMember.length - 5} người khác
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                {userID == group.ownerID ? (
                  <div className="pt-3 pr-10 flex items-center justify-center">
                    <div className="tooltip pr-2">
                      <img src={ownerPNG} alt="a" className="w-12" />
                      <span className="tooltiptext">Bạn là chủ nhóm</span>
                    </div>
                    <Button
                      type="primary"
                      danger
                      ghost
                      // onClick={() => deleteU(user)}
                    >
                      Xóa nhóm
                    </Button>
                  </div>
                ) : (
                  <div className="pt-3 pr-10 flex items-center justify-center">
                    <div style={{ width: "200px" }}>
                      {joinStatus ? (
                        <div
                          className="relative inline-block text-right"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={toggleDropdown}
                            className=" rounded-md border border-gray-500 bg-red-300 hover:bg-red-400 hover:font-semibold  px-4 py-2  text-sm font-medium "
                          >
                            Đã tham gia
                          </button>

                          {isOpen && (
                            <div className="origin-top-right absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                              <div
                                className="py-1 hover:bg-gray-300 "
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <button
                                  className="flex items-center px-4 py-2 text-sm w-full"
                                  onClick={handleJoin}
                                >
                                  <span className="mr-3">🚪</span>
                                  Rời nhóm
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          className="text-white w-full hover:font-semibold text-sm font-medium hover:bg-blue-600 bg-blue-500 p-2 rounded-md text-center inline-block"
                          onClick={handleJoin}
                        >
                          Tham gia nhóm
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
