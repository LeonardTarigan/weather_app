let weather = {
    apiKey: "087db5cb3305065ead660de8e1fa75a4",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const starter = document.querySelector(".starter");

        console.log(name, icon, description, temp, humidity, speed);

        if (document.body.contains(starter)) {
            starter.remove();
        }

        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".weather").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = `Humidity : ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed : ${speed} km/h`;

        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}-city')`
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document.querySelector(".btn").addEventListener("click", () => {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        weather.search();
    }
});