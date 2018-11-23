var request = require('request');

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

module.exports = {
    getUrl
}