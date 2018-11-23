const express = require('express');
const app = express();
const helper = require('./url')


app.get('/', function(req, res) {
    
    const start = Date.now()

    helper.getUrl().then(url => {
        const latency = Date.now() - start
        const json = { url, latency }
        console.log(json)
        res.send(json);
    })
   
});

app.listen(3000);
console.log('Go to http://localhost:3000');