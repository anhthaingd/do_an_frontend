import React, { useEffect, useState } from "react";
import { getLocationByType, getLocationByTypeLimit } from "../apis/locationApi";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import LocationList from "../components/LocationList";
const Football = () => {
  const [params] = useSearchParams();
  const page = params.get("page");
  const [listLocation, setListLocation] = useState([]);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const sport = location.pathname;
  const fetchLocation = async () => {
    try {
      const response = await getLocationByTypeLimit(0, page);
      setCount(response.data.count);
      setListLocation(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, [params]);
  return (
    <div className="pt-2 ">
      <div className="flex justify-center p-2 ">
        <div className="w-3/5 pr-2 rounded h-full">
          <img src="football.jpg" alt="Football" className="h-full" />
        </div>
        <div className="w-2/5 text-left">
          <div>
            <h2 className="text-xl font-bold mb-2">
              Giới thiệu về môn bóng đá
            </h2>
            <p>
              Bóng đá là môn thể thao đồng đội được chơi với một quả bóng cầu
              giữa hai đội, mỗi bên gồm 11 cầu thủ. Có hơn 250 triệu người chơi
              tại hơn 200 quốc gia và vùng lãnh thổ, trở thành môn thể thao phổ
              biến nhất. Bóng đá là môn thể thao phổ biến nhất trên thế giới. Nó
              được chơi trên một sân hình chữ nhật được gọi là sân bóng với một
              bàn thắng ở mỗi đầu. Mục đích là ghi bàn thắng vào khung thành đối
              phương. Đội nào ghi được nhiều bàn thắng nhất sẽ thắng.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Lịch sử hình thành</h2>
            <p>
              Bóng đá là một trong những môn thể thao đã xuất hiện từ lâu với
              nhiều phiên bản. Mỗi phiên bản có các hình thức, kỹ thuật và quy
              tắc khác nhau. Vì vậy, hãy nói về nguồn gốc của môn thể thao này.
              Điều này cũng gây nhiều tranh cãi. Đến thời FIFA, Liên đoàn bóng
              đá thế giới chính thức công nhận môn bóng đá là phiên bản lâu đời
              nhất của môn xúc cúc, nguồn gốc của môn thể thao này mới rõ ràng.
            </p>
            <p>
              Để trở thành một môn thể thao được nhiều người biết đến và yêu
              thích như ngày nay, bóng đá đã có một lịch sử giáo dục và phát
              triển tương đối lâu đời. Hãy cùng điểm qua một số dấu mốc quan
              trọng trong lịch sử phát triển của môn thể thao này.
            </p>
            <p>
              Năm 1848, bộ môn bóng đá hiện đại được biết đến lâu đời nhất của
              Cambridge được ra đời trong khuôn viên trường Cao đẳng Trinity của
              trường đại học sau khi năm trường cao đẳng Eton, Harrow, Rugby,
              Winchester và Shrewbury gặp nhau.
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold pl-6 pt-1">Danh sách sân bóng</p>
        <LocationList
          listLocation={listLocation}
          count={count}
          page={page}
          sport={sport}
        />
      </div>
    </div>
  );
};

export default Football;
