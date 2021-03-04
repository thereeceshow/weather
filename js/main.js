const mainDiv = document.getElementById('mainDiv');
const city = document.getElementById('city');
const tempKel = document.getElementById('kel');
const tempF = document.getElementById('far');
const tempC = document.getElementById('cels');
const cond = document.getElementById('cond');
const pic = document.getElementById('pic');
const alertZip = document.getElementById('alert');
const alertText = document.getElementById('alertText');

const sendZipCode = document.getElementById('zipCode');
const locationData = document.getElementById('locationData');
let API_key = '09c2aba1639261fe64168ee459ea3ae5';
let zip = '';
let country = '';
let weatherInfo = [];
let errorText = '';
let auto = [];
let lat;
let lon;

locationData.onclick = navigator.geolocation.getCurrentPosition(success);
//locationData.onclick = navigator.geolocation.getCurrentPosition(success, error, options);
sendZipCode.addEventListener('click',getWeather);

function success(event) {
    console.log(event);
    auto = event;
    lat = auto.coords.latitude
    lon = auto.coords.longitude
    getWeatherAuto();


}

function getWeather() {
    zip = document.getElementById('zipCodeField').value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${API_key}`
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            weatherInfo = data
            display()
        })
        .catch(error => {
            console.log('Error:', error);
            errorText = error.message
            alertZip.classList.remove('d-none')
            alertText.innerHTML = `There seems to be an issue: ${errorText}`
            

        });
}

function getWeatherAuto() {
    let apiUrlA = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    fetch(apiUrlA)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            weatherInfo = data
            display()
        })
        .catch(error => {
            console.log('Error:', error);
            errorText = error.message
        });
}

function display() {
    city.innerHTML = weatherInfo.name;
    let tempInK = weatherInfo.main.temp;
    let icon = weatherInfo.weather[0].icon;
    tempKel.innerHTML = (tempInK + ' K');
    tempF.innerHTML = Math.round(tempInK - 273.15) * 9/5 + 32 + ' F';
    tempC.innerHTML = Math.round(tempInK - 273.15) + ' C';
    cond.innerHTML = 'Currently ' + weatherInfo.weather[0].main + '<br><em> with ' + weatherInfo.weather[0].description + ' in the area.</em>';
    pic.src = 'http://openweathermap.org/img/wn/' + icon + '@4x.png';
    alertZip.classList.add('d-none');
}