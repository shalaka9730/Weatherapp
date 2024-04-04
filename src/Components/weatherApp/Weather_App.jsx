import React from "react";
import '../weatherApp/weather.css';
import { useState } from "react";
import clearsky from '../Assets/clearsky.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.png';
import search_icon from '../Assets/search.png';
import snow from '../Assets/snow.png';
//import weather from '../Assets/weather.webp';
import wind from '../Assets/wind.png';



//functional component

const WeatherApp =()=>{
    let api_key = "e1affc823aca0e0aa9e9c75b7a99e650";
    const [wicon, setWicon] = useState(clearsky);


const search = async() => {
    const element = document.getElementsByClassName('CityInput');
    if(element[0].value === " "){
        return 0;
    }

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    
    let data = await response.json(); //converts response into json(java script object notation i.e. key-value pair)

    const humidity=document.getElementsByClassName("humidity");
    const wind=document.getElementsByClassName("wind");
    const temperature=document.getElementsByClassName("weather_temprature");
    const location=document.getElementsByClassName("weather_location");

    humidity[0].innerHTML=data.main.humidity+"%";
    wind[0].innerHTML=Math.floor(data.wind.speed)+"km/h";
    temperature[0].innerHTML=Math.floor(data.main.temp)+"<sup>o</sup>C";
    location[0].innerHTML=data.name;

    if(data.weather[0].icon ==="01d" || data.weather[0].icon === "01d"){
        setWicon(clearsky);
    }
    else if(data.weather[0].icon ==="02d" || data.weather[0].icon === "02d"){
        setWicon(cloud);
    }
    else if(data.weather[0].icon ==="03d" || data.weather[0].icon === "04d"){
        setWicon(drizzle);
    }
    else if(data.weather[0].icon ==="09d" || data.weather[0].icon === "10d"){
        setWicon(rain);
    }
    else if(data.weather[0].icon ==="13d" || data.weather[0].icon === "13d"){
        setWicon(snow);
    }
    // else
    // {
    //     setWicon(clearsky);
    // }
}
    return(
        <div className="container">
            <div className="top-bar">
                <input type="text" className="CityInput" placeholder="Search" />
                <div className="search-icon" onClick={()=> {search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="weather-pic" />
            </div>
            <div className="weather_temprature"></div>
            <div className="weather_location"></div>

            <div className="data-container">
                <div className="element">
                    <img src={humidity} alt="humidity" style={{height :"50px" ,width:"50px" }} />
                    <div className="data">
                        <div className="humidity">humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind} alt="wind speed" />
                    <div className="data">
                        <div className="wind">wind</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherApp;