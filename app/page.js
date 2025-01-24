"use client";
import { useState } from "react";
import { fetchWeather, addCity } from "./store/slices/weatherData";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import WeatherDataChart from "./components/WeatherDataChart";
import HeadingsRow from "./components/HeadingsRow";

export default function Home() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weather.data);
  const cities = useSelector((state) => state.weather.cities);

  const onChange = (e) => {
    setCity(e.target.value);
  };

  const onSearch = async () => {
    //Prevents user from submitting an empty search
    if (city.trim() === "") {
      alert("Please enter a valid city");
      return;
    }

    const cityData = await dispatch(fetchWeather(city));

    if (cityData.error) {
      alert(
        "Oops, something went wrong. Please check that you have entered a valid city and try again."
      );
      console.log(cityData.error);
      setCity("");
      return;
    }

    // adds searched cities to array so that the data for multiple cities can be displayed at once
    dispatch(addCity({ data: cityData.payload }));
    setCity("");
  };

  // Temperature data comes in Kelvin and needs to be converted to Fahrenheit
  const convertKelvinToFahrenheit = (deg) => {
    return Math.round((deg - 273) * 1.8 + 32);
  };

  const cityWeatherData = cities.map((city) => {
    // Forecast data is stored in three hour intervals. This fetches the data every 4 intervals, or 12 hours
    const twelveHourIntervals = [0, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39];
    const fiveDayForecast = twelveHourIntervals.map(
      (interval) => city?.data?.list[interval].main
    );
    const cityName = city.data?.city?.name;
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

    return {
      cityName,
      temperatureData,
      humidityData,
      pressureData,
      temperatureAverage,
      humidityAverage,
      pressureAverage,
    };
  });

  return (
    <main className="container">
      <SearchBar
        onChange={onChange}
        city={city}
        onSearch={onSearch}
      ></SearchBar>
      <HeadingsRow />
      {data &&
        cityWeatherData.map((city) => (
          <div className="container border-top" key={city.cityName}>
            <div className="row border-top p-1">
              <div className="col-sm d-flex align-items-center justify-content-center">
                <h2>{city.cityName}</h2>
              </div>
              <WeatherDataChart
                data={city.temperatureData}
                color={"orange"}
                text={city.temperatureAverage}
              />
              <WeatherDataChart
                data={city.pressureData}
                color={"green"}
                text={city.pressureAverage}
              />
              <WeatherDataChart
                data={city.humidityData}
                color={"black"}
                text={city.humidityAverage}
              />
            </div>
          </div>
        ))}
    </main>
  );
}
