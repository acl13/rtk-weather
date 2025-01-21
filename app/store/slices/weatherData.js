import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("fetchWeather", async (city) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
    cities: [],
  },
  reducers: {
    addCity(state, action) {
      state.cities.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWeather.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { addCity } = weatherSlice.actions;

export default weatherSlice.reducer;
