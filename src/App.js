import hotbg from './assets/Hot.jpg'
import coldbg from './assets/Cold.jpg'
import Spring from './assets/spring.jpeg'
import './App.css';
import Descriptions from './Componenets/Descriptions'
import { useEffect, useState  } from 'react';
import { getWatherData} from './Watherservice'

function App() {
const [weather,setweather]=useState(null);
const [units,setunits]=useState('metric');
const [City, setCity]= useState('Paris')
const [bg,setbg]=useState(hotbg)

 useEffect(()=>{
  const fetchwatherdata = async()=>{
    const data = await getWatherData(City,units)
    setweather(data)

    const threshold = units === "metric" ? 15 : 59;
    const thresspring = units === "metric" ? 30 : 85;
      if (data.temp <= threshold) 
      setbg(coldbg);
      else if(data.temp >= threshold && data.temp<= thresspring)
      setbg(Spring)
      else setbg(hotbg);
  };
  fetchwatherdata();
 },[units,City])

const handelunitsClick =(e) =>{
  const button = e.currentTarget;
  const currentUnit = button.innerText.slice(1);

  const isCelsius = currentUnit === "C";
  button.innerText = isCelsius ? "°F" : "°C";
  setunits(isCelsius ? "metric" : "imperial");
}
  const enterkeypressed =(e)=>{
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }
  return (
    <div className="App" style={{
      backgroundImage : `url(${bg})`
    }}>
     <div className='overlay'>
      {
        weather &&(
        <div className='container'>
        <div className='section section__inputs'>
          <input onKeyDown={enterkeypressed} placeholder='Enter City...' type='text'/>
          <button onClick={(e) => handelunitsClick(e)}>*F</button>
        </div>
        <div className='section section__temperature'>
          <div className='icon'>
            <h3>{`${weather.name},${weather.country}`}</h3>
            <img src={weather.iconURL} alt='wathericon'/> 
            <h3>{weather.description}</h3>
          </div>
          <div className='temperature'> 
          <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C':'F'}`}</h1>
          </div>
        </div>
        <Descriptions weather={weather} units={units}/>
      </div>)
      }
     </div>
    </div>
  );
}

export default App;
