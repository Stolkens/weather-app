import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = props => {

  const handleCityChange = useCallback(city => {
    console.log('cityName', city)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=24464b13da7514c1c9fa4b29864114bf&units=metric`)
   .then(res => res.json())
   .then(data => {
     const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].description,

    }
    console.log(weatherData.city, weatherData.temperature, weatherData.icon, weatherData.description)
   });


  }, []);
  

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;