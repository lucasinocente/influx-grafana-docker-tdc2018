const request = require('request');
const Influx = require('influx');

function getUrl () {

    const urls = [
        'https://google.com',
        'https://fb.com',
        'https://randomuser.me/api/',
        'http://uinames.com/api/',
        'https://yesno.wtf/api'
    ]

    const random = Math.floor((Math.random() * urls.length))

    return new Promise((resolve) => {
        request(urls[random], () => {
            resolve(urls[random])
        })
    })

}

async function connectInflux () {

    return new Influx.InfluxDB({
        host: 'localhost',
        database: 'tdcpoa2018',
        schema: [{
            measurement: 'response_times',
            fields: { latency: Influx.FieldType.INTEGER },
            tags: [ 'url' ]}
        ]
    })

}

async function saveInflux (json) {

    const influx = await connectInflux()

    return new Promise((resolve) => {
       
        influx.writePoints([{
            measurement: 'response_times',
            fields: { 'latency': json.latency },
            tags: { 'url': json.url }
        }]).then(() => { resolve() })

    });

}

module.exports = {
    getUrl,
    saveInflux
}





