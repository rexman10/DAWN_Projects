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

let ronda = 1

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

                        num = element['permanentNumber']?element['permanentNumber']:"N/A"

                        etiqueta.innerHTML += 
                        `
                        <tr>
                            <td scope="row">` + element['givenName'] + `</td>
                            <td>` + element['familyName'] + `</td>
                            <td>` + num + `</td>
                        </tr>
                        `
                        
                    }
                }

            })
        .catch(error => console.log('error', error));

    })

}

buscarTabla()


let buscarTiempos = function() {

    let etiqueta = document.getElementsByName("linePitstops")[0]

    let boton = document.getElementsByName("buscarPiloto")[0]

    boton.addEventListener('click', () => {

        let year = document.getElementById('anio').value

        let url = "http://ergast.com/api/f1/" + year + "/" + ronda + "/laps?limit=1000"

        fetch(url, requestOptions)
		    .then(response => response.text())
		    .then(result => {

                const parser = new DOMParser();
                const xml = parser.parseFromString(result, "application/xml");
                //console.log(xml)
                arreglo = xml.getElementsByTagName("Lap")
                let cuerpo = document.getElementsByName("cuerpoTabla")[0]
                let leyenda = document.getElementsByName("legend")[0]
                leyenda.innerHTML = ""
                let plantilla = ``
                for (let index = 0; index < 40; index++) {
                    const vueltas = arreglo[index];
                    const numVuelta = vueltas.getAttribute('number');
                    let tiempos = vueltas.getElementsByTagName('Timing')
                    plantilla += 
                    `
                    <tr>
                        <th scope="row">` + numVuelta + `</th>
                    `
                    for (let j = 0; j < 10; j++) {
                        const XMLtiempo = tiempos[j];
                        const driver = XMLtiempo.getAttribute('driverId');
                        const lapTime = XMLtiempo.getAttribute('time')
                        /*console.log(XMLtiempo);*/
                        //console.log(lapTime);
                        let min = parseFloat(lapTime.split(':')[0]) * 60
                        let seg = parseFloat(lapTime.split(':')[1].split('.')[0])
                        let ms = parseFloat(lapTime.split(':')[1].split('.')[1]) /1000

                        if (index == 0){
                            leyenda.innerHTML += `<li>` + driver + `</li>`

                            plantilla += 
                            `
                                <td style="--start: ` + 0.0 + `; --size: ` + (min + seg + ms) / 180 + `" id="` + driver + numVuelta + `"> <span class="data">` + lapTime + `</span> </td>                   
                            `

                            //console.log(min,seg,ms);
                        } else if (index > 0){                            
                            const XMLtiempoAnt = arreglo[index-1].getElementsByTagName('Timing')[j]
                            const lapTimeAnt = XMLtiempoAnt.getAttribute('time')

                            let minAnt = parseFloat(lapTimeAnt.split(':')[0]) * 60
                            let segAnt = parseFloat(lapTimeAnt.split(':')[1].split('.')[0])
                            let msAnt = parseFloat(lapTimeAnt.split(':')[1].split('.')[1]) /1000

                            plantilla += 
                            `
                                <td style="--start: ` + (minAnt + segAnt + msAnt) / 180 + `; --size: ` + (min + seg + ms) / 180 + `" id="` + driver + numVuelta + `"> <span class="data">` + lapTime + `</span> </td>                   
                            `                            
                        }
                        
                    }
                    plantilla +=
                    `
                    </tr>
                    `                   
                }
                console.log(plantilla);
                cuerpo.innerHTML = plantilla
                



            })
		    .catch(error => console.log('error', error));
    })
}

buscarTiempos()

let filtrarTiempo = function() {

    let etiqueta = document.getElementsByName("linePitstops")[0]

    let sig = document.getElementsByName("siguiente")[0]
    
    let ant = document.getElementsByName("anterior")[0]

    sig.addEventListener('click', () => {

        let year = document.getElementById('anio').value

        ronda += 1

        let url = "http://ergast.com/api/f1/" + year + "/" + ronda + "/laps?limit=1000"

        console.log("ronda a mostrar="+ronda);

        fetch(url, requestOptions)
		    .then(response => response.text())
		    .then(result => {

                const parser = new DOMParser();
                const xml = parser.parseFromString(result, "application/xml");
                //console.log(xml)
                arreglo = xml.getElementsByTagName("Lap")
                let cuerpo = document.getElementsByName("cuerpoTabla")[0]
                let leyenda = document.getElementsByName("legend")[0]
                leyenda.innerHTML = ""
                let plantilla = ``
                for (let index = 0; index < 40; index++) {
                    const vueltas = arreglo[index];
                    const numVuelta = vueltas.getAttribute('number');
                    let tiempos = vueltas.getElementsByTagName('Timing')
                    plantilla += 
                    `
                    <tr>
                        <th scope="row">` + numVuelta + `</th>
                    `
                    for (let j = 0; j < 10; j++) {
                        const XMLtiempo = tiempos[j];
                        const driver = XMLtiempo.getAttribute('driverId');
                        const lapTime = XMLtiempo.getAttribute('time')
                        /*console.log(XMLtiempo);*/
                        //console.log(lapTime);
                        let min = parseFloat(lapTime.split(':')[0]) * 60
                        let seg = parseFloat(lapTime.split(':')[1].split('.')[0])
                        let ms = parseFloat(lapTime.split(':')[1].split('.')[1]) /1000

                        if (index == 0){
                            leyenda.innerHTML += `<li>` + driver + `</li>`

                            plantilla += 
                            `
                                <td style="--start: ` + 0.0 + `; --size: ` + (min + seg + ms) / 180 + `" id="` + driver + numVuelta + `"> <span class="data">` + lapTime + `</span> </td>                   
                            `

                            //console.log(min,seg,ms);
                        } else if (index > 0){                            
                            const XMLtiempoAnt = arreglo[index-1].getElementsByTagName('Timing')[j]
                            const lapTimeAnt = XMLtiempoAnt.getAttribute('time')

                            let minAnt = parseFloat(lapTimeAnt.split(':')[0]) * 60
                            let segAnt = parseFloat(lapTimeAnt.split(':')[1].split('.')[0])
                            let msAnt = parseFloat(lapTimeAnt.split(':')[1].split('.')[1]) /1000

                            plantilla += 
                            `
                                <td style="--start: ` + (minAnt + segAnt + msAnt) / 180 + `; --size: ` + (min + seg + ms) / 180 + `" id="` + driver + numVuelta + `"> <span class="data">` + lapTime + `</span> </td>                   
                            `                            
                        }
                        
                    }
                    plantilla +=
                    `
                    </tr>
                    `                   
                }
                console.log(plantilla);
                cuerpo.innerHTML = plantilla
                



            })
		    .catch(error => console.log('error', error));
    })

    ant.addEventListener('click', () => {

        let year = document.getElementById('anio').value

        if (ronda == 1) {
            ronda = 20
            let url = "http://ergast.com/api/f1/" + year + "/" + 20 + "/laps?limit=1000"
            console.log("ronda a mostrar="+ronda);
        } else {
            ronda -= 1
        }


        let url = "http://ergast.com/api/f1/" + year + "/" + ronda + "/laps?limit=1000"

        console.log("ronda a mostrar="+ronda);

        fetch(url, requestOptions)
		    .then(response => response.text())
		    .then(result => {

                const parser = new DOMParser();
                const xml = parser.parseFromString(result, "application/xml");
                //console.log(xml)
                arreglo = xml.getElementsByTagName("Lap")
                let cuerpo = document.getElementsByName("cuerpoTabla")[0]
                let leyenda = document.getElementsByName("legend")[0]
                leyenda.innerHTML = ""
                let plantilla = ``
                for (let index = 0; index < 40; index++) {
                    const vueltas = arreglo[index];
                    const numVuelta = vueltas.getAttribute('number');
                    let tiempos = vueltas.getElementsByTagName('Timing')
                    plantilla += 
                    `
                    <tr>
                        <th scope="row">` + numVuelta + `</th>
                    `
                    for (let j = 0; j < 10; j++) {
                        const XMLtiempo = tiempos[j];
                        const driver = XMLtiempo.getAttribute('driverId');
                        const lapTime = XMLtiempo.getAttribute('time')
                        /*console.log(XMLtiempo);*/
                        //console.log(lapTime);
                        let min = parseFloat(lapTime.split(':')[0]) * 60
                        let seg = parseFloat(lapTime.split(':')[1].split('.')[0])
                        let ms = parseFloat(lapTime.split(':')[1].split('.')[1]) /1000

                        if (index == 0){
                            leyenda.innerHTML += `<li>` + driver + `</li>`

                            plantilla += 
                            `
                                <td style="--start: ` + 0.0 + `; --size: ` + (min + seg + ms) / 180 + `" id="` + driver + numVuelta + `"> <span class="data">` + lapTime + `</span> </td>                   
                            `

                            //console.log(min,seg,ms);
                        } else if (index > 0){                            
                            const XMLtiempoAnt = arreglo[index-1].getElementsByTagName('Timing')[j]
                            const lapTimeAnt = XMLtiempoAnt.getAttribute('time')

                            let minAnt = parseFloat(lapTimeAnt.split(':')[0]) * 60
                            let segAnt = parseFloat(lapTimeAnt.split(':')[1].split('.')[0])
                            let msAnt = parseFloat(lapTimeAnt.split(':')[1].split('.')[1]) /1000

                            plantilla += 
                            `
                                <td style="--start: ` + (minAnt + segAnt + msAnt) / 180 + `; --size: ` + (min + seg + ms) / 180 + `" id="` + driver + numVuelta + `"> <span class="data">` + lapTime + `</span> </td>                   
                            `                            
                        }
                        
                    }
                    plantilla +=
                    `
                    </tr>
                    `                   
                }
                console.log(plantilla);
                cuerpo.innerHTML = plantilla
                



            })
		    .catch(error => console.log('error', error));
    })
}

filtrarTiempo()