const express = require('express');
const app = express();
const helper = require('./src')


app.get('/', function(req, res) {
    
    const start = Date.now()

    helper.getUrl().then(url => {

        const latency = Date.now() - start
        const json = { url, latency }
        console.log(`Request: ${JSON.stringify(json)}`)
        
        helper.saveInflux(json).then(() => {
            res.send(json);
        })
        
    })
   
});

app.listen(8400);

console.log(`Go to http://localhost:8400`);