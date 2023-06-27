import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const apiKey = '39ed41e4c5df579bc0614b29cc7f5932';

  function searchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    axios.get(url).then((response) => {
      setData(oldData => [...oldData, response.data]);
      setLocation('');
    });
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      searchWeather();
    }
  }

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const clearData = () => {
    setData([]);
  };

  const enrichedData = data.map(cityData => {
    const cityTime = new Date(Date.now() + cityData.timezone * 1000);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'GMT'
    };
    const localTime = cityTime.toLocaleString('en-US', options);
    return {
      ...cityData,
      localTime
    };
  });
  
  
  
  

  return (
    <div className='min-h-screen min-w-full bg-color1 flex flex-col items-center justify-center font-roboto'>
      <div className='flex flex-col sm:flex-row justify-center w-full sm:w-auto mb-10 gap-3'>
        <input className='p-3 rounded-lg w-full sm:w-auto h-12 outline-none'
          onChange={handleInputChange}
          value={location}
          onKeyDown={handleKeyDown}
          placeholder="Enter city here"
        />
        <button className= ' bg-color2 p-3 sm:ml-4 rounded-lg w-full sm:w-auto h-12 text-white font-medium' onClick={searchWeather}>Search</button>
        <button className=' bg-color3 p-3 rounded-lg w-full sm:w-auto h-12  text-white font-medium' onClick={clearData}>Clear</button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 '>
        {enrichedData.map((cityData, index) => (
          <div key={index} className='bg-white rounded-lg shadow-lg p-4 mt-10'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-semibold text-color2'>{cityData.name}</h2>
              <img 
                src={`https://flagsapi.com/${cityData.sys.country}/shiny/64.png`}
                alt={`${cityData.sys.country} flag`} 
                className='w-9 h-9  mx-2'
              />
              <div className='flex items-center shadow-md p-2'>
                <img 
                  src={`http://openweathermap.org/img/w/${cityData.weather[0].icon}.png`} 
                  alt="weather-icon" 
                  className='mr-2'
                />
                <div className='text-5xl text-color2'>{Math.round(cityData.main.temp)}°</div>
              </div>
            </div>
            <p className='text-gray-500 text-center mb-4 capitalize'>{cityData.weather[0].description}</p>
            <div className='grid grid-cols-4 gap-4'>
              <div className='text-center'>
                <p className=' font-medium'>Humidity</p>
                <p>{cityData.main.humidity}%</p>
              </div>
              <div className='text-center'>
                <p className='font-medium'>Wind</p>
                <p>{cityData.wind.speed} m/s</p>
              </div>
              <div className='text-center'>
                <p className='font-medium'>Feels Like</p>
                <p>{cityData.main.feels_like}</p>
              </div>
              <div className='text-center'>
                 <p className='font-medium'>Local Time</p>
                 <p>{cityData.localTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
