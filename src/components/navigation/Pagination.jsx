import React, { useEffect, useState } from "react";
import PageNumber from "./PageNumber";
import { SlControlForward, SlControlRewind } from "react-icons/sl";

const Pagination = ({ number, count, sport }) => {
  const [currentPage, setCurrentPage] = useState(+number);
  const [arrPage, setArrPage] = useState([]);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  useEffect(() => {
    let max = Math.ceil(count / 12); // Sử dụng Math.ceil() để làm tròn lên
    let end = currentPage + 1 > max ? max : currentPage + 1;
    let start = currentPage - 1 < 1 ? 1 : currentPage - 1;
    let temp = [];

    // Nếu count <= 12, chỉ có một trang, nên hiển thị trang 1
    if (count <= 12) {
      temp.push(1);
    } else {
      for (let i = start; i <= end; i++) {
        temp.push(i);
      }
      // Kiểm tra xem có cần hiển thị trang đầu và trang cuối
      // setIsHideStart(start === 1);
      // setIsHideEnd(end === max);
      currentPage >= max - 1 ? setIsHideEnd(true) : setIsHideEnd(false);
      currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false);
    }
    setArrPage(temp);
  }, [count, currentPage]);
  return (
    <div className="flex items-center justify-center gap-2 mt-2 mb-2">
      {!isHideStart && (
        <PageNumber
          icon={<SlControlRewind />}
          text={1}
          setCurrentPage={setCurrentPage}
          sport={sport}
        />
      )}
      {!isHideStart && arrPage[0] !== 2 && <PageNumber text={"..."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => (
          <PageNumber
            key={item}
            text={item}
            currentPage={number || 1}
            setCurrentPage={setCurrentPage}
            sport={sport}
          />
        ))}
      {!isHideEnd &&
        arrPage[arrPage.length - 1] !== Math.floor(count / 12) - 1 && (
          <PageNumber text={"..."} />
        )}
      {!isHideEnd && (
        <PageNumber
          icon={<SlControlForward />}
          text={Math.floor(count / 12) || 1}
          type="end"
          setCurrentPage={setCurrentPage}
          sport={sport}
        />
      )}
    </div>
  );
};

export default Pagination;
