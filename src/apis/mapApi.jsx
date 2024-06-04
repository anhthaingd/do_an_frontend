import axios from "axios";
import Api from "./baseApi";
const API_KEY = "cdpcuM7MSCLGhOyYofYKpMtLtEXXXMRF2hkVeMEM";

export const apiGetGeocodingByLatLng = async ({ latlng }) => {
  try {
    const response = await axios.get(`https://rsapi.goong.io/Geocode`, {
      params: {
        latlng,
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
};

export const getGeocodingByInput = async ({ input }) => {
  try {
    const response = await axios.get(
      `https://rsapi.goong.io/Place/AutoComplete`,
      {
        params: {
          input,
          api_key: API_KEY,
          limit: 10,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
};

export const getGeocodingByPlaceId = async ({ placeId }) => {
  try {
    const response = await axios.get(`https://rsapi.goong.io/Place/Detail`, {
      params: {
        place_id: placeId,
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
};

