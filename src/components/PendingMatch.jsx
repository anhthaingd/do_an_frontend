import React, { useEffect, useState } from "react";
import { getMatchByStatus, updateMatch } from "../apis/matchApi";
import { useParams } from "react-router-dom";
import { AimOutlined } from "@ant-design/icons";
import { getLocationById } from "../apis/locationApi";

const PendingMatch = () => {
  const locationID = useParams().id;
  const [location, setLocation] = useState({});
  const [listMatch, setListMatch] = useState([]);
  const fetchMatch = async () => {
    const data = { status: 2, locationID };
    const res = await getMatchByStatus(data);
    const locationResponse = await getLocationById(locationID);
    setLocation(locationResponse.data);
    setListMatch(res.data);
    console.log(res);
  };
  const handleOk = async (match) => {
    await updateMatch(match?.id, { status: 1 });
    fetchMatch();
  };
  const checkDate = (match) => {
    const today = new Date();
    const dateParts = match.date.split("-");
    const day = parseInt(dateParts[0]); // Lấy ngày
    const month = parseInt(dateParts[1]) - 1; // Lấy tháng và trừ đi 1
    const year = parseInt(dateParts[2]); // Lấy năm
    const matchTimeParts = match.start_time.split(":");
    const matchTime = new Date(
      year,
      month,
      day,
      parseInt(matchTimeParts[0]),
      parseInt(matchTimeParts[1])
    );
    if (today > matchTime) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    fetchMatch();
  }, []);
  return (
    <div className="p-5">
      <div>
        <p className="text-2xl font-bold">{location.name}</p>
        <div className="flex text-center">
          <AimOutlined className="pt-1 pr-3" style={{ fontSize: "26px" }} />
          <p className="text-md pt-1 flex text-center w-full">
            {location.location_detail}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pt-5">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sân
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giờ bắt đầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giờ kết thúc
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Công khai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listMatch.map((item) => (
              <tr key={item?.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item?.owner?.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.owner?.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.playground?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.start_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.end_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.isPublic ? "Có" : "Không"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {checkDate(item) ? (
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOk(item)}
                      >
                        Xác nhận
                      </button>
                      <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Từ chối
                      </button>
                    </div>
                  ) : (
                    "Đã quá hạn"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingMatch;
