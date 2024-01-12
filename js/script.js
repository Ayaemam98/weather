let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function search(a) {
    let temp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=619a08ea89b540e5b7e191254232912&q=${a}&days=3`);
    if (temp.ok && 400 != temp.status) {
        let a = await temp.json();
        displayCurrent(a.location, a.current)
        displayAnother(a.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", a => {
    search(a.target.value)
});


function displayCurrent(a, temp) {

    if ('' != temp) {
        let e = new Date(temp.last_updated.replace('', ''));
        let temp1 = `
       <div class="col-md-4 rounded-start-top-10 px-0 bg-323544">
    <div class="today forecast">
    <div class="forecast-header d-flex p-2 rounded-start-top-10 justify-content-between"
        id="today">
        <div class="day">${days[e.getDay()]}</div>
        <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>
    </div>
    <div class="forecast-content" id="current">
        <div class="location">${a.name}</div>
        <div class="degree d-flex align-items-center">
            <div class="num">${temp.temp_c}<deg>o</deg>C</div>

            <div class="forecast-icon">
                <img src="https:${temp.condition.icon}" alt="" width="90">
            </div>

        </div>
        <div class="custom">${temp.condition.text}</div>
        <span class="forecast-alt"><img class="forecast-alt" src="images/icon-umberella.png"
                alt="">20%</span>
        <span class="forecast-alt"><img class="forecast-alt" src="images/icon-wind.png"
                alt="">18km/h</span>
        <span class="forecast-alt"><img class="forecast-alt" src="images/icon-compass.png"
                alt="">East</span>
    </div>
</div>
</div> 
       `
        document.getElementById("forecast").innerHTML = temp1
    }
}



function displayAnother(a) {
    let temp2 = "";
    for (let i = 1; i < a.length; i++) 
    temp2+=`
    <div class="col-md-4 bg-262936 px-0 text-center">
    <div class="forecast">
        <div class="forecast-header p-2">
            <div class="day">${days[new Date(a[i].date.replace(" ", "T")).getDay()]}</div>
            
        </div> 
        <div class="forecast-content m-5">
            <div class="forecast-icon">
                <img src="${a[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree p-3 fs-4 fw-bold">${a[i].day.maxtemp_c}<deg>o</deg>C</div>
            <small>${a[i].day.mintemp_c}<deg>o</deg></small>
            <div class="custom">${a[i].day.condition.text}</div>
        </div>
    </div>
</div> 
    `
    document.getElementById("forecast").innerHTML += temp2




    
}
search("cairo");