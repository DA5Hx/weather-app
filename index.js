var images = {
    rain: ['./images/rain.jpg', './images/rain2.webp', './images/rain3.jpg', './images/rain4.webp', './images/rain5.jpg'],
    thunderstorm: ['./images/thunderstorm.jpg', './images/thunderstorm2.jpg', './images/thunderstorm3.jfif', './images/thunderstorm4.jpg', './images/thunderstorm6.jpg'],
    drizzle: ['./images/drizzle.jpg', './images/drizzle2.jpg', './images/drizzle3.jpg', './images/drizzle4.jpg', './images/drizzle5.webp'],
    snow: ['./images/snow.webp', './images/snow2.jfif', './images/snow4.jpg', './images/snow5.png', './images/snow6.jfif'],
    mist: ['./images/mist.jfif', './images/mist2.webp', './images/fog.jpg', './images/haze.jpg', './images/haze2.webp'],
    dust: ['./images/sand.jpg', './images/sand2.jpg', './images/sand3.jpg', './images/sand4.jpg', './images/sand5.jpeg'],
    tornado: ['./images/tornado.webp', './images/tornado.webp', './images/tornado.webp', './images/tornado.webp', './images/tornado.webp'],
    clearsky: ['./images/clearsky.jpg', './images/clearsky2.jpg', './images/clearsky3.jfif', './images/clearsky4.jpg', './images/clearsky5.jpg'],
    cloudy: ['./images/cloudy.jfif', './images/cloudy2.jfif', './images/cloudy3.jpg', './images/cloudy4.jpg', './images/cloudy5.jpg']
}

const apikey = '8a7efec5e7f95bd9bd48eb564a16316b';
function getdata(city) {
    let weeklyWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apikey;
    fetch(weeklyWeatherUrl).then(response => response.json())
        .then(data => updatedisplay(data));
}

function shadeHexColor(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function randColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}


document.querySelector(".search-icon").addEventListener('click', e => {
    const city = document.querySelector(".search-bar").value;
    getdata(city);
})

window.addEventListener('keydown', e => {
    var city = document.querySelector(".search-bar").value;
    if (e.key == 'Enter' && city.length)
        getdata(city);
})

function updatedisplay(data) {
    if (data.cod == "404") {
        document.querySelector(".temp").innerHTML = "NO DATA";
        document.querySelector(".city").innerHTML = "";
        document.querySelector(".ico-desc").innerHTML = "";
        document.querySelector(".wind-desc").innerHTML = "";
        document.querySelector(".humid-desc").innerHTML = "";
        document.querySelector(".icon").src = "";
        document.querySelector(".wind-icon").style.visibility = "hidden";
        document.querySelector(".humid-icon").style.visibility = "hidden";
        return;
    }
    const name = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const icodesc = data.weather[data.weather.length - 1].description;
    const icon = data.weather[data.weather.length - 1].icon.slice(0, -1) + 'n';
    const wind = data.wind.speed;
    const humid = data.main.humidity;
    const id = data.weather[data.weather.length - 1].id;
    var img;
    if (id >= 200 && id < 300) {
        img = 'thunderstorm';
    }
    else if (id >= 300 && id < 400) {
        img = 'drizzle';
    }
    else if (id >= 500 && id < 600) {
        img = 'rain';
    }
    else if (id == 701 || id == 711 || id == 721 || id == 741) {
        img = 'mist';
    }
    else if (id == 731 || (id > 741 && id < 781)) {
        img = 'sand';
    }
    else if (id > 800) {
        img = 'cloudy';
    }
    else if (id == 781) {
        img = 'tornado';
    }
    else if (id == 800) {
        img = 'clearsky';
    }
    document.querySelector(".temp").innerHTML = temp + " °C";
    if (country != undefined)
        document.querySelector(".city").innerHTML = name + ',' + country;
    else
        document.querySelector(".city").innerHTML = name;
    document.querySelector(".ico-desc").innerHTML = icodesc;
    document.querySelector(".wind-desc").innerHTML = wind + " m/s";
    document.querySelector(".humid-desc").innerHTML = humid + " %";
    if (img != 'clearsky')
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".wind-icon").style.visibility = "visible";
    document.querySelector(".humid-icon").style.visibility = "visible";
    const col = shadeHexColor(randColor(), -.6);
    const ind = Math.floor(Math.random() * 5);
    document.querySelector("body").style.background = "linear-gradient( " + col + "88 100%," + col + "88 100%), url(" + images[img][ind] + ") no-repeat";
    document.querySelector("body").style.backgroundSize = "cover";
}

function firsttime() {
    const col = shadeHexColor(randColor(), -.6);
    const ind = Math.floor(Math.random() * 5);
    document.querySelector("body").style.background = "linear-gradient( " + col + "88 100%," + col + "88 100%), url(" + images['rain'][ind] + ") no-repeat";
    document.querySelector("body").style.backgroundSize = "cover";
}