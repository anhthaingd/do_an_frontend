import { HomeOutlined, WifiOutlined } from "@ant-design/icons";
import React from "react";
import { getLocationById } from "../../apis/locationApi";
import { useNavigate } from "react-router-dom";

const LocationCard = (props) => {
  const location = props.location;
  const navigate = useNavigate();
  function removeWords(location) {
    const district = location.district
      .replace(/Huyện|Thành Phố|Quận/gi, "")
      .trim();
    const province = location.province.replace(/Tỉnh|Thành Phố/gi, "").trim();
    return { ...location, district, province };
  }
  const cleanedLocation = removeWords(location);
  return (
    <div className=" bg-red-100 rounded p-1" style={{ width: "90%" }}>
      <div className="">
        <div
          href=""
          className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div className="relative pb-48 overflow-hidden w-full">
            <img
              src={
                location.image
                  ? location.image
                  : "https://phuongnam24h.com/img_data/images/nhung-san-bong-da-dep-nhat-the-gioi.jpg"
              }
              alt=""
              className="absolute inset-0 h-full w-full object-cover cursor-pointer"
              onClick={() => navigate(`/location/${location.id}`)}
            />
          </div>
          <div className="p-4">
            <div className="flex items-center text-sm text-gray-600">
              {location.rating}
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className=" w-4 fill-current text-yellow-500"
              >
                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="mt-2 mb-2  font-bold">{location.name}</h2>
              {location.sale !== null && location.sale > 0 ? (
                <p className="bg-red-500 px-2 text-white rounded">
                  -{location.sale}%
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="text-sm"></p>
            <div className="mt-3 flex items-center">
              <span className=" font-semibold">Khu vuc:</span>
              <span className="ml-1">
                {cleanedLocation.district} - {cleanedLocation.province}
              </span>
            </div>
            <div className="flex justify-between pt-2 pb-2">
              <div className="flex">
                <WifiOutlined />
                <p className="ml-1">Wifi</p>
              </div>
              <div className="flex">
                <HomeOutlined />
                <p className="ml-1">Căng tin</p>
              </div>
            </div>
            <button
              className="text-white w-full hover:font-semibold  hover:bg-blue-600 bg-blue-500 p-2 rounded-md text-center"
              onClick={() => navigate(`/location/${location.id}`)}
            >
              Xem chi tiet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
