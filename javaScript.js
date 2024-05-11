let cityName=document.getElementById("city");
let cityTime=document.getElementById("time");
let forecast=document.querySelector(".weather_forecast");
let weatherIcon=document.querySelector(".weather_icon");
let weatherData=document.querySelector(".weather_data");
let myName=document.getElementById("searchCity");
let minTemp=document.querySelector(".min");
let maxTemp=document.querySelector(".max");
let div1=document.getElementById("temperature");
let div2=document.getElementById("humidity");
let div3=document.getElementById("wind");
let div4=document.getElementById("pressure");
let submit=document.getElementById("searchBar");


console.log(myName.value);
let city="kota";
// city=myName.value;
// cityName.textContent="Kota, India";
let temp;
submit.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log(myName.value);
    city=myName.value;
    getData();
    myName.value=null;
});

const getCountryNames=(code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};
const getCountryTime=(date)=>{
    const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    date=new Date(date*1000);
    let cur=new Intl.DateTimeFormat('en-US', options).format(date);
    return cur;
};

const getData=async()=>{
    try{
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dbe0462629298937c774a927318dadaa`;
        const api=await fetch(apiUrl);
        const data=await api.json();
        console.log(data);
        const{main,name,weather,wind,sys,dt}=data;
        console.log(name);
        cityName.textContent=`${name}, ${getCountryNames(sys.country)}`;
        cityTime.textContent=`${getCountryTime(dt)}`;

        forecast.textContent=`${weather[0].main}`;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Construct the URL for the icon image
        weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon" id="weatherIcon">`; // Set the HTML content to display the image
        weatherData.innerHTML=`${(main.temp/10).toFixed(1)}&#176C`;

        minTemp.innerHTML=`Max: ${(main.temp_max/10).toFixed(1)}&#176C`;
        maxTemp.innerHTML=`Min: ${(main.temp_min/10).toFixed(1)}&#176C`;


        div1.innerHTML=`${(main.feels_like/10).toFixed(1)}&#176C`;
        div2.innerHTML=`${main.humidity}%`;
        div3.innerHTML=`${wind.speed} m/s`;
        div4.innerHTML=`${main.pressure}hPa`;

    }
    catch(error){
        console.log(error);
    }




};

// setInterval(()=>{
//     let time=new Date();
//     cityTime.textContent=`${time.toLocaleTimeString()}      ${getData.dt}`;
// },1000);

document.addEventListener("DOMContentLoaded", getData);
