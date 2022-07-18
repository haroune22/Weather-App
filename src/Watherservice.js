

const API_KEY = '5a2d98115c9ff9423f3587851aada06d'

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWatherData = async(city, Units='metric')=>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${Units}`
    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data)
   const {weather,main:{temp, feels_like, temp_min,temp_max,pressure,humidity},wind:{speed},
   sys:{country},
   name,
} = data;
const {description, icon}= weather[0]
return{
     temp,
     feels_like,
     temp_min,
     temp_max,
     pressure,
     humidity,
     description,
     iconURL: makeIconURL(icon),
     speed,
     country,
     name,
};
};
export {getWatherData};