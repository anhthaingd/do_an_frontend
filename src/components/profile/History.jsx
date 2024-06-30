import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchByUserID } from "../../apis/matchApi";
import MatchCard from "../cards/MatchCard";

const History = () => {
  const userID = useParams().id;
  const [listMatch, setListMatch] = useState([]);
  const fetchMatch = async () => {
    try {
      const response = await getMatchByUserID(userID);
      setListMatch(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMatch();
  }, []);
  return (
    <div className="w-4/5">
      <div className="w-full gap-2 pt-3 pb-3">
        {listMatch?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center "
              style={{ zIndex: 20 }}
            >
              <MatchCard match={item} index={index} fetchMatch={fetchMatch} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
