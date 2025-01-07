import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherData";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
