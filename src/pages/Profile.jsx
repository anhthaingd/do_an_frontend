import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../Css/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getUserById } from "../apis/userApi";

const Profile = () => {
  const [user, setUser] = useState({});
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
    <>
      <div className="Inclusive_profile_page">
        <Link to={"/"}>
          <FiArrowLeft />
        </Link>
        <div className="profile-top-wrap">
          <span>Membership Information</span>
        </div>
        <ul>
          <li>
            <span>Username</span>
            <div>{user.username}</div>
          </li>
          <li>
            <span>E-Mail</span>
            <div>{user.email}</div>
          </li>
          <li>
            <span> Account Created Date </span>
            <div>{editDate(user.createdAt)}</div>
          </li>
        </ul>

        <div className="btns_wrap">
          <button className="profileEditBtn">
            <Link to="/edit_profile">Edit Profile</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
