import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search6.png';
import sun from '../Assets/sun.png';
import cloud from '../Assets/cloud.png';
import dustbin from '../Assets/dustbin2.png';
import historySearchIcon from '../Assets/search7.png'


export const WeatherApp = () => {
    let api_key = "dd94f859a0e52d6e4767fddf735f04a7";
    const[wicon,setWicon] = useState(sun)
    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        updateWeatherData(data);
        const historyDustbins = document.querySelectorAll('.historyDustbin');
        historyDustbins.forEach(historyDustbin => {
            historyDustbin.addEventListener('click', () => {
                historyDustbin.parentElement.remove(); // Remove corresponding historyRow
            });
            historyDustbin.removeEventListener('click', () => {
                historyDustbin.parentElement.remove(); // Remove corresponding historyRow
            });
        });
        const historySearchIcons = document.querySelectorAll('.historySearchIcon');
        historySearchIcons.forEach(historySearchIcon => {
            historySearchIcon.addEventListener('click',handleHistorySearch(data.name));
            historySearchIcon.removeEventListener('click',handleHistorySearch(data.name))
        })       
    };

    const updateWeatherData = (data) => {
        const humidity = document.getElementsByClassName("humidity-percent");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("location");
        const h = document.getElementsByClassName("h-temp");
        const l = document.getElementsByClassName("l-temp");
        const mainWeather = document.getElementsByClassName("cloud");
        const time = document.getElementsByClassName('time');
        const d = new Date();
        d.setUTCSeconds(data.timezone-28800);
        const timestring = d.toLocaleDateString().replace(/\//g, '-') +" "+d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        time[0].innerHTML =  timestring;
        humidity[0].innerHTML = "Humidity: "+data.main.humidity + "%";
        temperature[0].innerHTML = parseInt(data.main.temp) + "°";
        location[0].innerHTML = data.name;
        h[0].innerHTML = parseInt(data.main.temp_max)+ "°";
        l[0].innerHTML = parseInt(data.main.temp_min)+ "°";

        mainWeather[0].innerHTML = data.weather[0].main;

        if(data.weather[0].main==="Clouds"||data.weather[0].main==="Thunderstorm"||data.weather[0].main==="Drizzle"){
            setWicon(cloud);
        }
        else if(data.weather[0].main==="Clear"){
            setWicon(sun);
        }
        else{
            setWicon(cloud);
        }
        const searchHistory = document.getElementById("historyRowWrap");
        searchHistory.appendChild(addHistoryRow(data,timestring));
    }
    const handleHistorySearch = (city) => {
        search(city);
    }
    const addHistoryRow = (data, timestring) => {
        const historyRow = document.createElement("div");
        historyRow.classList.add("historyRow");
    
        const cityHistory = document.createElement("div");
        cityHistory.classList.add("cityHistory");
        cityHistory.textContent = data.name;
    
        const timeHistory = document.createElement("div");
        timeHistory.classList.add("timeHistory");
        timeHistory.textContent = timestring;
    
        const historySearchIcon = document.createElement("div");
        historySearchIcon.classList.add("historySearchIcon");
        const searchIconImage = document.createElement("img");
        searchIconImage.src = historySearchIcon;
        searchIconImage.alt = "";
        historySearchIcon.appendChild(searchIconImage);
    
        const historyDustbin = document.createElement("div");
        historyDustbin.classList.add("historyDustbin");
        const dustbinImage = document.createElement("img");
        dustbinImage.src = dustbin;
        dustbinImage.alt = "";
        historyDustbin.appendChild(dustbinImage);
    
        historyRow.appendChild(cityHistory);
        historyRow.appendChild(timeHistory);
        historyRow.appendChild(historySearchIcon);
        historyRow.appendChild(historyDustbin);
    
        return historyRow;
    }

    return (
    <div className = "container">
        <div className='top-bar'>
            <input type="text" className="cityInput" multiline={true} float='Auto' placeholder='Country' aria-multiline/>
            <div className="search-icon" onClick ={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>

        <div className="alldata">
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-data">
                <div className="todaysweather">Today's Weather</div>
                <div className="weather-temp">24°</div>
                <div className='text'> H: </div>
                <div className="h-temp">26° </div>
                <div className='text'> L: </div>
                <div className="l-temp"> 24° </div>
            </div>
            <div className="secondline-data">
                <div className="location">place</div>
                <div className='time'>time</div>
                <div className="humidity-percent">humidity</div>
                <div className="cloud">cloud</div>
            </div>
            <div id="searchHistory">
                <p className='textSH'>Search History</p>
                <div id="historyRowWrap">
                
                </div>

            </div>
        </div>
        
    </div>
  )
}
// export default WeatherApp;
