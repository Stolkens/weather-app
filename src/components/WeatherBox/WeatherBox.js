import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    // console.log('cityName', city)
    setPending(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=24464b13da7514c1c9fa4b29864114bf&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            setPending(false);
            setError(false);
            const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
        };
    // console.log(weatherData.city, weatherData.temperature, weatherData.icon, weatherData.description)
    setWeatherData(weatherData)
   });
  }
  else {
    // alert('City not found');
    setError(true);
    setPending(false);
    setWeatherData('');
  }
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
      { error &&
      <ErrorBox setError={setError}/>}
    </section>
  )
};

export default WeatherBox;