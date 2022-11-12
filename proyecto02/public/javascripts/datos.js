let circuitos = [
    {pais:"Bahrain", nombre:"BAHRAIN INTERNATIONAL CIRCUIT",url:"/images/bahrain.png"},
    {pais:"Saudi Arabia", nombre:"JEDDAH CORNICHE CIRCUIT",url:"/images/saudiArabia.png"},
    {pais:"Australia", nombre:"ALBERT PARK CIRCUIT",url:"/images/australia.png"},
    {pais:"Italy", nombre:"AUTODROMO ENZO E DINO FERRARI",url:"/images/italy.png"},
    {pais:"United States", nombre:"MIAMI INTERNATIONAL AUTODROME",url:"/images/miami.png"},
    {pais:"Spain", nombre:"CIRCUIT DE BARCELONA-CATALUNYA",url:"/images/barcelona.png"},
    {pais:"Monaco", nombre:"CIRCUIT DE MONACO",url:"/images/monaco.png"},
    {pais:"Azerbaijan", nombre:"BAKU CITY CIRCUIT",url:"/images/baku.png"},
    {pais:"Canada", nombre:"CIRCUIT GILLES-VILLENEUVE",url:"/images/canada.png"},
    {pais:"Great Britain", nombre:"SILVERSTONE CIRCUIT",url:"/images/silverstone.png"},
    {pais:"Austria", nombre:"RED BULL RING",url:"/images/austria.png"},
    {pais:"France", nombre:"CIRCUIT PAUL RICARD",url:"/images/france.png"},
    {pais:"Hungary", nombre:"HUNGARORING",url:"/images/hungary.png"},
    {pais:"Belgium", nombre:"CIRCUIT DE SPA-FRANCORCHAMPS",url:"/images/spa.png"},
    {pais:"Netherlands", nombre:"CIRCUIT ZANDVOORT",url:"/images/netherlands.png"},
    {pais:"Italy", nombre:"AUTODROMO NAZIONALE MONZA",url:"/images/monza.png"},
    {pais:"Singapore", nombre:"MARINA BAY STREET CIRCUIT",url:"/images/singapore.png"},
    {pais:"Japan", nombre:"SUZUKA INTERNATIONAL RACING COURSE",url:"/images/japan.png"},
    {pais:"United States", nombre:"CIRCUIT OF THE AMERICAS",url:"/images/americas.png"},
    {pais:"Mexico", nombre:"AUTÓDROMO HERMANOS RODRÍGUEZ",url:"/images/mexico.png"},
    {pais:"Brazil", nombre:"AUTÓDROMO JOSÉ CARLOS PACE",url:"/images/brasil.png"},
    {pais:"Abu Dhabi", nombre:"YAS MARINA CIRCUIT",url:"/images/abudhabi.png"}

]

let carousel = document.getElementsByClassName('carousel-inner')[0]
let galeria = document.getElementsByClassName("carousel-indicators")[0]
//console.log(carousel)
let cont = 0

for (const key in circuitos) {
    const element = circuitos[key];

    if (element.nombre == "BAHRAIN INTERNATIONAL CIRCUIT") {
        galeria.innerHTML += `<li data-target="#carouselCircuitos" data-slide-to="`+cont+`" class="active"></li>`

        carousel.innerHTML += 

        `
        <div class="carousel-item active" data-bs-interval="5000">
            <img src="`+ element.url + `" class="d-block w-35">
            <div class="carousel-caption d-none d-md-block">
                <h3>` + element.nombre + `</h3>
                <p>` + element.pais + `</p>
            </div>
        </div>
        `
    } else {
        galeria.innerHTML += `<li data-target="#carouselCircuitos" data-slide-to="`+cont+`"></li>`

        carousel.innerHTML += 

        `
        <div class="carousel-item" data-bs-interval="5000">
            <img src="`+ element.url + `" class="d-block w-35">
            <div class="carousel-caption d-none d-md-block">
                <h3>` + element.nombre + `</h3>
                <p>` + element.pais + `</p>
            </div>
        </div>
        `

    }
    cont++
    
}


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};



let buscarTabla = function() {

    let etiqueta = document.getElementsByName("displayPilotos")[0]

    let boton = document.getElementsByName("buscarPiloto")[0]

    boton.addEventListener('click', () => {

        let year = document.getElementById('anio').value
        //console.log(year)

        fetch("http://ergast.com/api/f1/"+ year +"/drivers.json", requestOptions)
            .then(res => res.json())
            .then(data => {
                obj = data['MRData']['DriverTable']['Drivers'];
                //console.log(obj)
                etiqueta.innerHTML = ""

                for (const key in obj) {
                    if (Object.hasOwnProperty.call(obj, key)) {
                        const element = obj[key];
                        //console.log(element)

                        etiqueta.innerHTML += 
                        `
                        <tr>
                            <td scope="row">` + element['givenName'] + `</td>
                            <td>` + element['familyName'] + `</td>
                            <td>` + element['permanentNumber'] + `</td>
                        </tr>
                        `
                        
                    }
                }

            })
        .catch(error => console.log('error', error));

    })

}

buscarTabla()