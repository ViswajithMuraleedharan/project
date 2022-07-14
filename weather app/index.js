const form = document.querySelector('form')
const search = document.getElementById('search')
const weather=document.getElementById('weather')
const API_KEY = '3265874a2c77ae4a04bb96236a642d2f'

const getWeather = async (city)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response= await fetch(url)
    console.log(`response:${response}`);
    const data= await response.json();
    console.log(data);
    showWeather(data);
}

const showWeather =(data)=>{
    if(data.cod=404){
        weather.innerHTML=`<p>Oops the city is not found</p>`
    }
    weather.innerHTML=`
    <div>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather">
</div>
<div>
    <h2>${data.main.temp}°C</h2>
    <h4>${data.weather[0].main}</h4>
</div>`
}

form.addEventListener('submit',function(event){
    console.log(search.value);
    getWeather(search.value);
    event.preventDefault()
})