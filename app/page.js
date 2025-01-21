"use client";
import { useState } from "react";
import { fetchWeather, addCity } from "./store/slices/weatherData";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import WeatherDataChart from "./components/WeatherDataChart";

export default function Home() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weather.data);
  const cities = useSelector((state) => state.weather.cities);

  const onChange = (e) => {
    setCity(e.target.value);
  };

  const onSearch = async () => {
    const cityData = await dispatch(fetchWeather(city));
    dispatch(addCity({ data: cityData.payload }));
    setCity("");
  };

  console.log(cities);

  // Forecast data is stored in three hour intervals. This fetches the data every 4 intervals, or 12 hours
  const twelveHourIntervals = [0, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39];
  const fiveDayForecast = twelveHourIntervals.map(
    (interval) => data?.list[interval].main
  );

  const convertKelvinToFahrenheit = (deg) => {
    return Math.round((deg - 273) * 1.8 + 32);
  };
  const temperatureData = fiveDayForecast?.map((day) =>
    convertKelvinToFahrenheit(day?.temp)
  );
  const humidityData = fiveDayForecast?.map((day) => day?.humidity);
  const pressureData = fiveDayForecast?.map((day) => day?.pressure);
  const temperatureAverage =
    Math.round(
      temperatureData.reduce((a, b) => a + b) / temperatureData.length
    ).toString() + "\u00b0F";
  const humidityAverage =
    Math.round(
      humidityData.reduce((a, b) => a + b) / humidityData.length
    ).toString() + "%";
  const pressureAverage =
    Math.round(
      pressureData.reduce((a, b) => a + b) / pressureData.length
    ).toString() + "hPa";

  return (
    <main>
      <div className="d-flex justify-content-center">
        <SearchBar
          onChange={onChange}
          city={city}
          onSearch={onSearch}
        ></SearchBar>
      </div>
      {data && (
        <div className="container border">
          <div className="row">
            <div className="col-sm d-flex align-items-center">
              <h2>{data?.city?.name}</h2>
            </div>
            <WeatherDataChart
              data={temperatureData}
              color={"orange"}
              text={temperatureAverage}
            />
            <WeatherDataChart
              data={pressureData}
              color={"green"}
              text={pressureAverage}
            />
            <WeatherDataChart
              data={humidityData}
              color={"black"}
              text={humidityAverage}
            />
          </div>
        </div>
      )}
    </main>
  );
}
