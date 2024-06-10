// src/App.js
import React, { useEffect, useState } from "react";
import LivingPlace from "../../components/profile/about/LivingPlace";
import AboutNavbar from "../../components/profile/AboutNavbar";
import { Outlet, useParams } from "react-router-dom";
import { getInformation } from "../../apis/informationApi";

const About = () => {
  const [activePage, setActivePage] = useState("living");
  const userID = useParams().id;
  const [userInfo, setUserInfo] = useState({});
  const renderPage = () => {};
  const fetchUser = async () => {
    const response = await getInformation(userID);
    setUserInfo(response.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex w-full min-h-[326px]">
      <div className="w-1/4 p-2">
        <AboutNavbar userInfo={userInfo} />
      </div>
      <div className="w-3/4 p-2">
        <Outlet userInfo={userInfo} />
      </div>
    </div>
  );
};

export default About;
