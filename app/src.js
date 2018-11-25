const request = require('request');
const Influx = require('influx');


async function getUrl () {

    const urls = [
        'https://google.com',
        'https://fb.com',
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://randomuser.me/api/',
        'http://uinames.com/api/',
        'https://yesno.wtf/api'
    ]

    const random = Math.floor((Math.random() * urls.length));

    const req = await request(urls[random], () => {});

    return req.uri.hostname
    
}

async function connectInflux () {

    return new Influx.InfluxDB({
        host: 'localhost',
        database: 'tdcpoa2018',
        schema: [
            {
                measurement: 'response_times',
                fields: {
                    latency: Influx.FieldType.INTEGER
                },
                tags: [
                    'url'
                ]
            }
        ]
    })

}

async function saveInflux (json) {

    const influx = await connectInflux()

    console.log(influx)

    return await influx.writePoints([{
        measurement: 'response_times',
        fields: { 'latency': json.latency },
        tags: { 'url': json.url }
    }])


}

module.exports = {
    getUrl,
    saveInflux
}





