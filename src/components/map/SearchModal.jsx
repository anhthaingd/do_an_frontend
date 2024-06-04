import React, { useEffect, useState } from "react";
import Map from "./Map";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getLocationByGeoCodingAndRadius } from "../../apis/locationApi";
import { getGeocodingByInput, getGeocodingByPlaceId } from "../../apis/mapApi";

const SearchModal = ({ isOpen, onClose, type }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [locationDetail, setLocationDetail] = useState("");
  const [nearByLocation, setNearByLocation] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 21.0065649,
    longitude: 105.8431364,
    zoom: 16,
    bearing: 0,
    transitionDuration: 1000,
  });
  const [resultClick, setResultClick] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const handleInputChange = async (e) => {
    if (e.target.value === "") {
      setResultClick();
      setPredictions();
      setNearByLocation();
    }
    setLocationDetail(e.target.value);
    setResultClick(null);
    const response = await getGeocodingByInput({ input: e.target.value });
    if (response.status === "OK") {
      setPredictions(response.predictions);
    }
  };
  const fetchLocation = async (log, lat, type) => {
    try {
      const response = await getLocationByGeoCodingAndRadius({
        longitude: log,
        latitude: lat,
        type,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickPlace = async (place) => {
    if (!place.description) {
      setLocationDetail(place.formatted_address);
    } else {
      setLocationDetail(place.description);
    }
    const response = await getGeocodingByPlaceId({ placeId: place.place_id });
    if (response.status === "OK") {
      setLatitude(response.result.geometry.location.lat);
      setLongitude(response.result.geometry.location.lng);
      setViewport((prev) => {
        return {
          ...prev,
          latitude: response.result.geometry.location.lat,
          longitude: response.result.geometry.location.lng,
          zoom: 16,
        };
      });
      const locations = await fetchLocation(
        response.result.geometry.location.lng,
        response.result.geometry.location.lat,
        type
      );
      setNearByLocation(locations.data);
    }
    setPredictions([]);
    setResultClick(null);
  };
  useEffect(() => {
    // fetchLocation();
  }, [type]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 h-5/6">
        <div className="flex justify-end pb-2">
          <button
            onClick={() => {
              onClose();
              setLocationDetail("");
              setNearByLocation([]);
            }}
            className=" text-gray-400 hover:text-red-500"
          >
            ✖
          </button>
        </div>
        <div className=" w-full h-full flex">
          <div className="w-2/3 p-2" style={{ height: "90%" }}>
            <Map
              viewport={viewport}
              setViewport={setViewport}
              setResultClick={setResultClick}
              nearByLocation={nearByLocation}
            />
          </div>
          <div className="w-1/3 p-2 relative">
            <input
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
              type="text"
              placeholder="Nhập địa điểm..."
              onChange={handleInputChange}
              value={locationDetail}
            />
            <div className="absolute z-40 bg-white border rounded-lg border-gray-300">
              {resultClick?.length > 0 &&
                resultClick?.map((item) => {
                  return (
                    <div
                      key={item.place_id}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => handleClickPlace(item)}
                    >
                      {item.formatted_address}
                    </div>
                  );
                })}
              {predictions?.length > 0 &&
                predictions?.map((item) => {
                  return (
                    <div
                      key={item.place_id}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => handleClickPlace(item)}
                    >
                      {item.description}
                    </div>
                  );
                })}
            </div>
            <div style={{ height: "400px", overflowY: "auto" }}>
              {nearByLocation?.data?.map((location) => {
                return (
                  <Link
                    key={location._id}
                    className="flex items-center gap-2 p-2"
                    to={`/location/${location?.id}`}
                    target="_blank"
                  >
                    <img
                      src={location && location.image}
                      alt="location"
                      className="w-16 h-16"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{location.name}</h2>
                      <p>{location.location_detail}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
