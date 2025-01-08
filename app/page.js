"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { fetchWeather } from "./store/slices/weatherData";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weather.data);

  const onChange = (e) => {
    setCity(e.target.value);
  };

  const onSearch = () => {
    dispatch(fetchWeather(city));
    setCity("");
  };

  console.log(data);
  return (
    <main className={styles.main}>
      <h1>{data?.city?.name}</h1>
      <p>Temperature (in Kelvin): {data?.list[0].main?.temp} </p>
      <p>Humidity: {data?.list[0].main?.humidity} </p>
      <p>Pressure: {data?.list[0].main?.pressure} </p>
      <SearchBar
        onChange={onChange}
        city={city}
        onSearch={onSearch}
      ></SearchBar>
    </main>
  );
}
