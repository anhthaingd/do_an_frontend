import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditableField = ({ label, value, onChange, canEdit, user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };
  const navigate = useNavigate();
  return (
    <div className="flex items-center my-2">
      <p className="font-semibold">{label}:</p>
      {isEditing ? (
        <input
          className="ml-2 border border-gray-300 rounded p-1 text-gray-900 flex-1"
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : user ? (
        <Link
          className="ml-2 cursor-pointer hover:text-blue-500"
          to={`/profile/${user.id}`}
          target="_blank"
        >
          {value}
        </Link>
      ) : (
        <p className="ml-2">{value}</p>
      )}
      <button
        className="text-blue-500 hover:text-blue-700 ml-2"
        onClick={handleEditClick}
      >
        {canEdit ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 17h2m-1-7a3 3 0 013 3v3m-6 0v-3a3 3 0 013-3m0 0L7 7l-4 4m0 0l4 4m4-4H3"
            />
          </svg>
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default EditableField;
