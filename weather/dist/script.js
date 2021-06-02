const input = document.querySelector('#inputvalue');
const btn = document.querySelector('#searchbtn');
const loader = document.querySelector('#loader');
const container = document.querySelector('#container');
const errorText = document.querySelector('#error');


// create html tags for weather valus:
const cityName = document.createElement('h2');
cityName.classList.add('con-heading');
const temperature = document.createElement('h2');
temperature.classList.add('con-temperature');
const conditonContainer = document.createElement('div');
conditonContainer.classList.add('condition-container');
const condition = document.createElement('h2');
condition.classList.add('con-condition');
const icon = document.createElement('img');
icon.classList.add('con-icon');
conditonContainer.appendChild(condition);
conditonContainer.appendChild(icon);
container.appendChild(cityName);
container.appendChild(temperature);
container.appendChild(conditonContainer)


btn.addEventListener('click',()=>{
    if(input.value === '' || input.value === 'null') return
    const city = input.value;
    const key = 'b131a60bab8b41fdb6095949212705';
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
    showWeather(url,city);
    input.value = ''; //clear previous input value
    errorText.innerText = '';
});


async function showWeather(url,city){
    loader.style.display = "block";
    loader.style.animation = "1s rotation linear infinite";
    await fetch(url,{
        mode: 'cors'
    })
        .then(response => response.json())
        .then(response => {
            cityName.innerText = response.location.name;
            temperature.innerText = response.current.temp_c +' °C';
            condition.innerText = response.current.condition.text;
            icon.src = response.current.condition.icon; 
            container.style.display = "block";
        })
        .catch(error => {
            container.style.display = 'none';
            console.log(error);
            errorText.innerText = `${city} not found!`;
        });
    loader.style.display = "none";
    loader.style.animation = "1s rotation linear";
}
