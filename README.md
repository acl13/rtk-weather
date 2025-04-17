## Weather Project

This project is a simple weather dashboard that allows users to search for a city's 5-day forecast and view key weather metrics in a visual format. The application is built using React and Redux, leveraging React Sparklines for the charting functionality.

## Features

1. **City Search:**

   - Users can input a city name and click the search button to retrieve weather data for that city.

2. **Visualized Weather Data:**

   - The dashboard displays three separate charts:
     - **Temperature (in °F)**
     - **Pressure**
     - **Humidity**

3. **5-Day Forecast:**

   - Each chart represents the 5-day weather forecast for the selected city.

4. **Average Reference Line:**
   - Each chart includes a reference line that shows the average value for the respective data metric.

## Technologies Used

- **React:** Front-end library for building the user interface.
- **Redux:** State management for handling city searches and weather data.
- **React Sparklines:** Library for rendering simple and elegant charts.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/acl13/rtk-weather.git
   cd rtk-weather
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).

   - Sign up for a free account if you don’t already have one.
   - Use the API key in the application.

4. Create a `.env` file in the project root:
   ```bash
   NEXT_PUBLIC_API_KEY=your_openweathermap_api_key
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000` to use the app.

## Project Structure

```
rtk-weather/
├── app/
   ├── components/         # Reusable UI components
   ├── store/              # Redux slices and related logic
   ├── page.js             # Main app component
   ├── layout.js           # Entry point of the app
```

## Key Components

### SearchBar

- Input field to enter a city name and trigger a search.
- Dispatches actions to update the Redux store with the selected city.

### WeatherDataChart

- Displays the weather data for a specific metric (e.g., temperature, pressure, humidity).
- Utilizes React Sparklines for rendering.
- Includes a reference line showing the average value.

## API Integration

- Weather data is fetched from the OpenWeatherMap API using the 5-day forecast endpoint.
- Example API call:
  ```
  https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=imperial
  ```

## State Management

- The Redux store manages:
  - The cities searched by the user
  - The fetched weather data

## Customization

- To modify the chart styles or add new features, refer to the [React Sparklines documentation](https://github.com/borisyankov/react-sparklines).

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.
