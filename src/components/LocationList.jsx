import React from "react";
import LocationCard from "./cards/LocationCard";
import Pagination from "./navigation/Pagination";

const LocationList = ({ listLocation, count, page, sport }) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 pt-2">
        {listLocation.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center "
              style={{ zIndex: 20 }}
            >
              <LocationCard location={item} />
            </div>
          );
        })}
      </div>
      <Pagination count={count} number={page} sport={sport} />
    </div>
  );
};

export default LocationList;
