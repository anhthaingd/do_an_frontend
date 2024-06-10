import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../Css/Profile.css";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getUserById } from "../apis/userApi";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileNavBar from "../components/profile/ProfileNavBar";
import PostList from "../components/profile/PostList";

const Profile = () => {
  const [user, setUser] = useState({});
  const userIDparam = useParams().id;
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const editDate = (createdAt) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(createdAt);
    var datestring =
      d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear();
    return datestring;
  };

  const navigate = useNavigate();
  const getUserProfile = async () => {
    try {
      const response = await getUserById(userId);
      setUser(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUserProfile();
  }, [setLoading]);

  return (
    <div className="flex justify-center ">
      <div className=" " style={{ width: "940px" }}>
        <ProfileHeader />
        <ProfileNavBar userId={userId} />
        <div className="flex justify-between">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
