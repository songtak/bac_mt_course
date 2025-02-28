// https://apihub.kma.go.kr/api/typ08/getMountainWeather?mountainNum=5&base_date=20221125&base_time=1400&authKey=RyYwM3--Q0mmMDN_vqNJHw
import axios from "axios";
import dayjs from "dayjs";

/** 기상청 정보 취득 */
const getMountainWeather = async () => {
  try {
    const response = await axios.get("/weather/api/typ08/getMountainWeather", {
      params: {
        mountainNum: 5,
        base_date: dayjs().format("YYYYMMDD"),
        base_time: "1400",
        authKey: "RyYwM3--Q0mmMDN_vqNJHw",
      },
    });

    // console.log("Mountain Weather Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mountain weather:", error);
  }
};

export { getMountainWeather };
