import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(city => {
    // console.log('cityName', city)
    setPending(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=24464b13da7514c1c9fa4b29864114bf&units=metric`)
   .then(res => res.json())
   .then(data => {
    setPending(false)
     const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      
    }
    // console.log(weatherData.city, weatherData.temperature, weatherData.icon, weatherData.description)
    setWeatherData(weatherData)
   });


  }, []);
  

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weatherData && 
      <WeatherSummary
      city={weatherData.city}
      temperature={weatherData.temperature}
      icon={weatherData.icon}
      description={weatherData.description} setWeatherData={setWeatherData}/>}
      { pending && 
      <Loader />}
    </section>
  )
};

export default WeatherBox;