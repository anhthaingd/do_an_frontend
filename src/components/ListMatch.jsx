import React, { useEffect, useState } from "react";
import { getMatchByDateAndLocationID } from "../apis/matchApi";
import { useParams } from "react-router-dom";
import MatchCard from "./cards/MatchCard";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const ListMatch = () => {
  const locationID = useParams().id;
  const [listMatch, setListMatch] = useState([]);
  const fetchMatch = async (date, locationID) => {
    try {
      const matchResponse = await getMatchByDateAndLocationID(date, locationID);
      setListMatch(matchResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const defaultDate = dayjs().format("DD-MM-YYYY");
  const [date, setDate] = useState(defaultDate);

  useEffect(() => {
    fetchMatch(date, locationID);
  }, []);
  console.log(listMatch);
  return (
    <div className="pt-5 ">
      <DatePicker
        status="error"
        format={dateFormatList}
        defaultValue={dayjs()}
        onChange={(e) => {
          setDate(e?.format("DD-MM-YYYY"));
          fetchMatch(String(e?.format("DD-MM-YYYY")), locationID);
        }}
      />
      <div className="grid grid-cols-2 gap-2 pt-3">
        {listMatch?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center "
              style={{ zIndex: 20 }}
            >
              <MatchCard
                match={item}
                index={index}
                fetchMatch={fetchMatch}
                date={date}
                locationID={locationID}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMatch;
