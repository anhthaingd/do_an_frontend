import * as React from "react";
import { useState } from "react";
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "@goongmaps/goong-map-react";

import mapStyle from "./mapStyle.json";
import { useEffect } from "react";
import { useCallback } from "react";
import Pin from "./Pin";
import { apiGetGeocodingByLatLng } from "../../apis/mapApi";

const TOKEN = "z0Xl89Ez5cmF5Vg4WeLdwlkTNLL58ECozEjKDpIl";
const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

const Map = ({ viewport, setViewport, setResultClick, nearByLocation }) => {
  //   const [viewport, setViewport] = useState({
  //     latitude: 21.0065649,
  //     longitude: 105.8431364,
  //     zoom: 13,
  //     bearing: 0,
  //     transitionDuration: 1000,
  //   });

  //   function getCurrentLocation() {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const latitude = position.coords.latitude;
  //           const longitude = position.coords.longitude;
  //           setViewport((prevViewport) => {
  //             return {
  //               ...prevViewport,
  //               latitude,
  //               longitude,
  //               zoom: 16,
  //             };
  //           });
  //         },
  //         (error) => {
  //           console.error("Lỗi khi lấy tọa độ:", error.message);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 1000,
  //           maximumAge: 0,
  //         }
  //       );
  //     } else {
  //       console.error("Trình duyệt của bạn không hỗ trợ API Geolocation.");
  //     }
  //   }
  const handleSelectLocation = useCallback(
    async (event) => {
      const [lng, lat] = event.lngLat;
      const latlng = `${lat}, ${lng}`;
      const response = await apiGetGeocodingByLatLng({
        latlng,
      });

      if (response.status === "OK") {
        if (response.results.length > 0) {
          const location = response.results[0];
          // setInput(location.formatted_address);
          setResultClick(response.results);
        }
        setViewport((prev) => {
          return {
            ...prev,
            latitude: lat,
            longitude: lng,
            zoom: 16,
          };
        });
      }

      //   updateSearchParams({
      //     latitude: lat,
      //     longitude: lng,
      //   });
    },
    [setViewport]
  );

  const handleClick = (event) => {
    const { lngLat } = event;
  };

  const getCursor = ({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "default";
  };
  return (
    <MapGL
      className="rounded-md"
      {...viewport}
      width="100%"
      height="100%"
      clickRadius={2}
      onViewportChange={setViewport}
      goongApiAccessToken={TOKEN}
      getCursor={getCursor}
      // mapStyle={mapStyle}
      onClick={handleSelectLocation}
    >
      <Pin
        latitude={viewport?.latitude}
        longitude={viewport?.longitude}
        fill="#4d83f0"
      />
      {nearByLocation?.data?.map((location) => {
        return (
          <Pin
            latitude={location?.coordinates.coordinates[1]}
            longitude={location?.coordinates.coordinates[0]}
          />
        );
      })}
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </MapGL>
  );
};

export default Map;
