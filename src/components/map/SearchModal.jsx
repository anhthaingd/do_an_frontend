import React, { useEffect, useState } from "react";
import Map from "./Map";
import {
  Link,
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getLocationByGeoCodingAndRadius } from "../../apis/locationApi";
import { getGeocodingByInput, getGeocodingByPlaceId } from "../../apis/mapApi";
import { Select } from "antd";
import useQueryParams from "../../hooks/useQueryParams";
import { searchPlayground } from "../../apis/playgroundApi";

const SearchModal = ({ isOpen, onClose, type }) => {
  const [longitude, setLongitude] = useState(null);
  const { queryParams, navigate } = useQueryParams();
  const [latitude, setLatitude] = useState(null);
  const [locationDetail, setLocationDetail] = useState("");
  const [nearByLocation, setNearByLocation] = useState([]);
  const [isOutdoor, setIsOutdoor] = useState("Vị trí");
  const [yardSurface, setYardSurface] = useState("Mặt sân");
  const [quantity, setQuantity] = useState("Số lượng");
  const [tempList, setTempList] = useState([]);
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
  const fetchPlayground = async () => {
    const res = await searchPlayground({ ...queryParams });
    const temp = res.data;
    const listPlayground = temp?.filter(
      (item) => item?.location?.type === type
    );
    if (listPlayground?.length > 0) {
      // const notMyGroup = listGroup.filter(
      //   (group) => !myGroup.some((myGrp) => myGrp.groupID === group.id)
      // );
      console.log(nearByLocation);
      const thai = nearByLocation?.filter((item) =>
        listPlayground?.some(
          (playground) => playground?.location?.id === item?.id
        )
      );
      setTempList(thai);
    } else {
      setTempList(nearByLocation);
    }
  };
  const handleType = (type) => {
    if (type === 0) {
      return "bong-da";
    } else if (type === 3) {
      return "bong-ban";
    } else if (type === 1) {
      return "cau-long";
    } else if (type === 4) {
      return "bong-chuyen";
    } else if (type === 5) {
      return "bong-ro";
    } else if (type === 2) {
      return "tennis";
    }
  };
  const handleClickPosition = (e) => {
    setIsOutdoor(e);
    let newSearchParams = {
      ...queryParams,
      position: e,
    };

    if (e === "Vị trí") {
      delete newSearchParams.position;
    }

    const link = handleType(type);
    navigate({
      pathname: `/${link}`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleClickYardSurface = (e) => {
    setYardSurface(e);
    let newSearchParams = {
      ...queryParams,
      yard_surface: e,
    };
    if (e === "Mặt sân") {
      delete newSearchParams.yard_surface;
    }
    const link = handleType(type);
    navigate({
      pathname: `/${link}`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleClickQuantity = (e) => {
    setQuantity(e);
    let newSearchParams = {
      ...queryParams,
      quantity: e,
    };
    if (e === "Số lượng") {
      delete newSearchParams.quantity;
    }
    const link = handleType(type);
    navigate({
      pathname: `/${link}`,
      search: createSearchParams(newSearchParams).toString(),
    });
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
      console.log(locations);
      setNearByLocation(locations?.data?.data);
      setTempList(locations?.data?.data);
    }
    setPredictions([]);
    setResultClick(null);
  };
  useEffect(() => {
    // fetchLocation();
    fetchPlayground();
  }, [type, queryParams]);
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
        <div className="flex pb-3" style={{ paddingLeft: "400px" }}>
          <div className="w-32">
            <Select
              value={isOutdoor}
              onChange={handleClickPosition}
              className="w-full"
            >
              <Select.Option key="v" value="Vị trí">
                Vị trí
              </Select.Option>
              <Select.Option key="t" value="Trong nhà">
                Trong nhà
              </Select.Option>
              <Select.Option key="n" value="Ngoài trời">
                Ngoài trời
              </Select.Option>
            </Select>
          </div>
          <div className="w-40 pl-5">
            {type == 0 ? (
              <Select
                // defaultValue={getTypeLabel(type)}
                onChange={handleClickYardSurface}
                value={yardSurface}
                className="w-full"
              >
                <Select.Option key="m" value="Mặt sân">
                  Mặt sân
                </Select.Option>
                <Select.Option key="a" value="Sân futsal">
                  Sân futsal
                </Select.Option>
                <Select.Option key="b" value="Sân cỏ tự nhiên">
                  Sân cỏ tự nhiên
                </Select.Option>
                <Select.Option key="c" value="Sân cỏ nhân tạo">
                  Sân cỏ nhân tạo
                </Select.Option>
              </Select>
            ) : type == 1 ? (
              <Select
                onChange={handleClickYardSurface}
                value={yardSurface}
                className="w-full"
              >
                <Select.Option key="m" value="Mặt sân">
                  Mặt sân
                </Select.Option>
                <Select.Option key="g" value="Sàn gỗ">
                  Sàn gỗ
                </Select.Option>
                <Select.Option key="t" value="Sàn thảm PVC">
                  Sàn thảm PVC
                </Select.Option>
              </Select>
            ) : type == 2 ? (
              <Select
                onChange={handleClickYardSurface}
                value={yardSurface}
                className="w-full"
              >
                <Select.Option key="m" value="Mặt sân">
                  Mặt sân
                </Select.Option>
                <Select.Option key="3" value="Sân đất nện">
                  Sân đất nện
                </Select.Option>
                <Select.Option key="4" value="Sân cỏ">
                  Sân cỏ
                </Select.Option>
                <Select.Option key="5" value="Sân cứng tiêu chuẩn">
                  Sân cứng tiêu chuẩn
                </Select.Option>
              </Select>
            ) : type == 4 || type == 5 ? (
              <Select
                onChange={handleClickYardSurface}
                value={yardSurface}
                className="w-full"
              >
                <Select.Option key="m" value="Mặt sân">
                  Mặt sân
                </Select.Option>
                <Select.Option key="6" value="Sân gỗ">
                  Sân gỗ
                </Select.Option>
                <Select.Option key="7" value="Sân nhựa tổng hợp">
                  Sân nhựa tổng hợp
                </Select.Option>
                <Select.Option key="8" value="Sân bê tông">
                  Sân bê tông
                </Select.Option>
              </Select>
            ) : (
              ""
            )}
          </div>
          <div className="w-40 pl-5">
            {type == 0 ? (
              <Select
                // defaultValue={getTypeLabel(type)}
                onChange={handleClickQuantity}
                value={quantity}
                className="w-40"
              >
                <Select.Option key="12" value="Số lượng">
                  Số lượng
                </Select.Option>
                <Select.Option key="9" value="Sân 5 người">
                  Sân 5 người
                </Select.Option>
                <Select.Option key="10" value="Sân 7 người">
                  Sân 7 người
                </Select.Option>
                <Select.Option key="11" value="Sân 11 người">
                  Sân 11 người
                </Select.Option>
              </Select>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className=" w-full h-full flex">
          <div className="w-2/3 p-2" style={{ height: "90%" }}>
            <Map
              viewport={viewport}
              setViewport={setViewport}
              setResultClick={setResultClick}
              nearByLocation={tempList}
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
              {tempList?.map((location) => {
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
