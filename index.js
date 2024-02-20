let lat, longitude;
let loading = '<img src="./images/icons8-loading.gif" alt="">';

async function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        longitude = position.coords.longitude;
        getCity();
    },
        (err) => {
            console.log(err);
        }
    )
}

getLocation();

const getCity = async () => {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${longitude}&apiKey=yourAPI`)
        .then(res => res.json())
        .then(res => getWeather(res.features[0].properties.city))
        .catch(err => console.log(err));
}

const getWeather = async (city) => {
    let cityText = document.querySelector('#weatherCard #city');
    let tempText = document.querySelector('#weatherCard #temp');
    cityText.innerHTML = loading;
    fetch('https://api.api-ninjas.com/v1/weather?city=' + city, {
        method: 'GET',
        headers: {
            'X-Api-Key': "yourAPI",
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            tempText.innerHTML = res.temp + "C";
            cityText.innerHTML = city
        });
}

function showTemp(city) {
    let cityText = document.querySelector('#weatherCard #city');
    let tempText = document.querySelector('#weatherCard #temp');
    tempText.innerHTML = '';
    cityText.innerHTML = loading;
    console.log(city);
    fetch('https://api.api-ninjas.com/v1/weather?city=' + city, {
        method: 'GET',
        headers: {
            'X-Api-Key': "yourAPI",
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            if (res.error) {
                cityText.innerHTML = 'Check Spelling'
            } else {
                tempText.innerHTML = res.temp + "C";
                cityText.innerHTML = city
            }
        });
}

function searchTemp() {
    if (document.getElementById('inpCity').value.trim() === '') return;
    showTemp(document.getElementById('inpCity').value);
}