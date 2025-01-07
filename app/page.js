"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import { fetchWeather } from "./store/slices/weatherData";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const data = useSelector((state) => state.weather.data);
  const log = () => {
    console.log(data);
  };
  return (
    <main className={styles.main}>
      <button type="button" onClick={log}>
        Click Me
      </button>
    </main>
  );
}
