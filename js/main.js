const mainDiv = document.getElementById('mainDiv');
const city = document.getElementById('city');
const tempKel = document.getElementById('kel');
const tempF = document.getElementById('far');
const tempC = document.getElementById('cels');
const cond = document.getElementById('cond');
const pic = document.getElementById('pic');
const alertZip = document.getElementById('alert');
const alertText = document.getElementById('alertText');
const spin = document.getElementById('spin');
const infoLoad = document.getElementById('infoLoad');

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

locationData.onclick = getCurrentLocationData;
//locationData.onclick = navigator.geolocation.getCurrentPosition(success, error, options);
sendZipCode.addEventListener('click',getWeather);

function success(event) {
    console.log(event);
    auto = event;
    lat = auto.coords.latitude
    lon = auto.coords.longitude
    getWeatherAuto();


}

function getCurrentLocationData() {
    infoLoad.classList.add('d-none');
    locationData.classList.add('d-none');
    spin.classList.remove('d-none');
    navigator.geolocation.getCurrentPosition(success);
}

function getWeather() {
    infoLoad.classList.add('d-none');
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
    let apiUrlA = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    fetch(apiUrlA)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            weatherInfo = data
            spin.classList.add('d-none')
            locationData.classList.remove('d-none');
            display()
        })
        .catch(error => {
            console.log('Error:', error);
            errorText = error.message
            alertZip.classList.remove('d-none')
            alertText.innerHTML = `There seems to be an issue: ${errorText}`
        });
}

function display() {
    city.innerHTML = weatherInfo.name;
    let tempInK = weatherInfo.main.temp;
    let icon = weatherInfo.weather[0].icon;
    tempKel.innerHTML = (tempInK + '&deg K');
    tempF.innerHTML = Math.round(tempInK - 273.15) * 9/5 + 32 + '&deg F';
    tempC.innerHTML = Math.round(tempInK - 273.15) + '&deg C';
    cond.innerHTML = 'Currently ' + weatherInfo.weather[0].main + '<br><em> with ' + weatherInfo.weather[0].description + ' in the area.</em>';
    pic.src = 'https://openweathermap.org/img/wn/' + icon + '@4x.png';
    alertZip.classList.add('d-none');
    infoLoad.classList.remove('d-none');
}