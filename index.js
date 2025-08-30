import { favorites } from "./favorites.js"
import { motivationalQuotes } from "./frases.js"

const topic = ["weight workout","cyberpunk","landscape","code","hacker","mistery","darkness","neon","architecture","monuments"]
let favorito = ""


fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${topic[Math.floor(Math.random()*topic.length )]}`)
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.6)0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0)20%),
    linear-gradient(to bottom, rgba(0,0,0,0.8)0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0)50%), url(${data.urls.full})`
		document.getElementById("location").innerHTML =  data.location.name
        console.log(data.location)
    })
    .catch(err => {
        // Use a default background image
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    })

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.thumb} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>${data.market_data.current_price.usd.toLocaleString("es")}$</p>
            <p id="red">${(data.market_data.price_change_percentage_24h).toFixed(2)}%</p>
        `
        if(data.market_data.price_change_percentage_24h > 0){
            document.getElementById("red").style.color = " rgb(3, 226, 3)"
        }else{
            
        }

    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("es", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});


for( let favorite of favorites){ 
    favorito += `
    <a href="${favorite.url}"><img class="fav" src="${favorite.fav}">${favorite.name}</a>`  
}
document.getElementById("favorites").innerHTML = favorito

document.getElementById("quote").textContent = `"${motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"`

