import React, { useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { searchGroup } from "../../apis/groupApi";
import useQueryParams from "../../hooks/useQueryParams";
const SearchForm = () => {
  const { queryParams, navigate } = useQueryParams();
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef();
  const location = useLocation();
  const path = location.pathname;
  const fetchGroup = async () => {
    try {
      const response = await searchGroup({
        ...queryParams,
      });
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    let newSearchParams = {
      ...queryParams,
      name: e.target.value,
    };

    if (e.target.value === "") {
      delete newSearchParams.name;
    }
    setShowDropdown(true);
    navigate({
      pathname: path,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    fetchGroup();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [params]);
  return (
    <div
      className="border border-gray-400  w-80 rounded-md relative
    "
      ref={searchRef}
    >
      <div className="flex items-center p-2">
        <BiSearchAlt2 className=" mr-1 mt-1" style={{ fontSize: "20px" }} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSubmit}
          placeholder="Tìm kiếm nhóm..."
          style={{ outline: "none" }}
          className="w-full"
          onClick={handleSubmit}
        />
      </div>
      {showDropdown && results.length > 0 && (
        <div className="absolute w-full mt-2 border border-gray-300 bg-white z-10 max-h-60 overflow-y-auto rounded shadow-lg ">
          {results.map((group) => (
            <div
              key={group.id}
              className="p-2 cursor-pointer hover:bg-slate-300"
              onClick={() => {navigate(`/group/${group.id}`)}}
            >
              {group.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
