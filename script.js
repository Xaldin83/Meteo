async function affichage_favoris(nom){
    const section_fav = document.getElementById("favoris");
    const url1 = `https://geocoding-api.open-meteo.com/v1/search?name=${nom}&count=1&language=fr&format=json`;
    try {
        const reponse = await fetch(url1);
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }
        const resultat = await reponse.json();

        element=resultat.results[0];
            const url2= `https://api.open-meteo.com/v1/forecast?latitude=${element.latitude}&longitude=${element.longitude}&current_weather=true`;

            try {
                const reponse = await fetch(url2);
                if (!reponse.ok) {
                    throw new Error(`Statut de réponse : ${reponse.status}`);
                }
                const resultat2 = await reponse.json();
                const temperature=resultat2.current_weather.temperature;
                const weathercode=resultat2.current_weather.weathercode;

                

                const tab=[
            "Unknow",
            "Sunny",
            "Sunny_intervals",
            "Mostly_cloudy",
            "White_cloud",
            "Cloudy_with_heavy_rain",
            "Cloud_with_sleet",
            "Cloudy_with_heavy_snow",
            "Light_rain_showers",
            "Cloudy_with_heavy_snow",
            "Cloudy_with_sleet",
            "Mist",
            "Fog",
            "Freezing_rain",
            "Thunderstorms",
            "Drizzle",
            "Sandstorm"
        ]
            section_fav.innerHTML+=(`<h2>${nom}</h2><p> ${temperature}°C, <img src="img/${tab[weathercode]}.png" alt="image météo"></img></p><br>`)
        }catch{
        };
    }catch{
        }
}

async function calcWeatherCode(longitude, latitude){
    const url2= `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const reponse = await fetch(url2);
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }
        const resultat = await reponse.json();
        return (resultat.current_weather.weathercode);

    } catch (erreur) {
  }
}

class Ville{
    constructor(name,longitude, latitude, temperature, weathercode){
        this.name=name;
        this.longitude=longitude;
        this.latitude=latitude;
        



    }

    get Afficher(){
        const tab=[
            "Indéterminée",
            "Ciel clair",
            "Légèrement nuageux",
            "Partiellement nuageux",
            "Nuageux",
            "Pluie",
            "Pluie et Neige",
            "Neige",
            "Averse",
            "Averse de neige",
            "Averse pluie et neige",
            "Brouillard léger",
            "Brouillard",
            "Pluie Verglaçante",
            "Orage",
            "Bruine",
            "Tempête de Sable"
        ]
        const div_affichage=document.getElementById('favoris');

        div_affichage.innerHTML=`<h2>${this.name}</h2><p></p><button class="fav" data-name = ${this.name}>Rajouter aux favoris</button><br>`
    }
}


const button = document.getElementById("Rechercher");

button.addEventListener('click',async ()=>{
    const cityNameElement = document.getElementById("cityName");
    const cityName=cityNameElement.value;

    const url1 = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`;
    try {
        const reponse = await fetch(url1);
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }
        const resultat = await reponse.json();

        element=resultat.results[0];
            const url2= `https://api.open-meteo.com/v1/forecast?latitude=${element.latitude}&longitude=${element.longitude}&current_weather=true`;

            try {
                const reponse = await fetch(url2);
                if (!reponse.ok) {
                    throw new Error(`Statut de réponse : ${reponse.status}`);
                }
                const resultat2 = await reponse.json();
                const temperature=resultat2.current_weather.temperature;
                const weathercode=resultat2.current_weather.weathercode;

                const ville = new Ville(element.name,element.longitude,element.latitude);
                        
                ville.Afficher;

                const paragraph = document.querySelector('p')
                const tab=[
            "Unknow",
            "Sunny",
            "Sunny_intervals",
            "Mostly_cloudy",
            "White_cloud",
            "Cloudy_with_heavy_rain",
            "Cloud_with_sleet",
            "Cloudy_with_heavy_snow",
            "Light_rain_showers",
            "Cloudy_with_heavy_snow",
            "Cloudy_with_sleet",
            "Mist",
            "Fog",
            "Freezing_rain",
            "Thunderstorms",
            "Drizzle",
            "Sandstorm"
        ]
            paragraph.innerHTML+=(`${temperature}°C, <img src="img/${tab[weathercode]}.png" alt="image météo">`)

            const buttons_save=document.getElementsByClassName('fav');


            const button_save=buttons_save[0]

            button_save.addEventListener('click',()=>{
                var fav = localStorage.getItem("favoris");

                if(fav !== null){
                    const list=fav.split(',')
                    list.push(button_save.dataset.name);

                    
                    localStorage.setItem("favoris", `${list}`);
                }else{
                    localStorage.setItem("favoris", `${button_save.dataset.name}`);
                    }
            })
                
            } catch (erreur) {
                console.error(erreur.message);
                }
    } catch (erreur) {
        console.error(erreur.message);
  }
})


const button_fav = document.getElementById("button_fav");

button_fav.addEventListener('click',async ()=>{
    var fav = localStorage.getItem("favoris");
    if(fav!== null){
        const list=fav.split(',')

        list.forEach(element => {
            affichage_favoris(element);
            })}});