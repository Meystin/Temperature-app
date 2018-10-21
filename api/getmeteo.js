/*id weather : aca2124f0d11437c7406f8490e604e42 ou c5a9e2affb50de661993e1b9041a9c45*/

const token = "aca2124f0d11437c7406f8490e604e42"
const ville = "Lille"
const pays = "fr"
const metric = "metric"

export function getData() {
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+ville+","+pays+"fr&APPID="+token+"&units="+metric
    return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
}
