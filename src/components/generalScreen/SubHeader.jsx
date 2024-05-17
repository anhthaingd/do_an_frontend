import React from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { items } from "../../utils/sport";
const sports = [
  "Bóng đá",
  "Cầu lông",
  "Tennis",
  "Bóng bàn",
  "Bóng chuyền",
  "Bóng rổ",
  "Golf",
  "Võ thuật",
  "Đua xe",
  "Liên hệ",
];

const SubHeader = () => {
  const navigate = useNavigate();
  const formatSportName = (sport) => {
    return slugify(sport.toLowerCase(), {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      locale: "vi",
    });
  };
  const handleChange = (sport) => {
    navigate({
      pathname: `/${sport.path}`,
      search: createSearchParams({
        page: 1,
      }).toString(),
    });
  };
  return (
    <div className="flex justify-center bg-blue-500 p-3 ">
      <div className="flex space-x-10">
        {items.map((sport) => (
          <button
            key={sport.id}
            onClick={() => handleChange(sport)}
            className="text-white hover:bg-red-100 hover:text-red-600 p-1 rounded transition-colors duration-200"
          >
            {sport.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;
