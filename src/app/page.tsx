import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f9f7b1fb3dc465f8ec204708252602&units=metric`);
      setWeatherData([...weatherData, response.data]);
      setCity('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleRemove = (index: number) => {
    const newWeatherData = [...weatherData];
    newWeatherData.splice(index, 1);
    setWeatherData(newWeatherData);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
          Search
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {weatherData.map((data, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', margin: '10px', position: 'relative', width: '200px' }}>
            <button onClick={() => handleRemove(index)} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
            <h3>{data.name}</h3>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;