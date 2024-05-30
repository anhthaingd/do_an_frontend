import React from "react";
import styleSlick from "./multiple.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationCard from "../cards/LocationCard";
const MultipleLocation = (props) => {
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-next`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };
  const { listLocation } = props;
  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  const renderSystem = (listLocation) => {
    return listLocation.map((item, index) => {
      return (
        <div
          key={index}
          style={{ height: "300", width: "100px" }}
          className={`${styleSlick["width-item"]} ${styleSlick["height-item"]} px-5  `}
        >
          <LocationCard location={item} />
        </div>
      );
    });
  };
  return (
    <div
      className="container"
      style={{ paddingRight: "6rem", paddingLeft: "6rem" }}
    >
      <Slider {...settings}>{renderSystem(listLocation)}</Slider>
    </div>
  );
};

export default MultipleLocation;
